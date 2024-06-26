from flask import session, request, jsonify, make_response
from flask_restful import Resource
from datetime import datetime
import httpx
import pandas
from flask_apscheduler import APScheduler
from apscheduler.triggers.cron import CronTrigger
from flask_mail import Message as MailMessage

from config import app, mail, api, db
from models import User, Activity, Team, Message, Competition, CompetitionHandler

@app.before_request
def firewall():
    if 'user_id' not in session and request.endpoint not in ['/api/login', '/api/signup', '/api/auth', '/api/healthcheck']:
        return {'error': 'Not logged in.'}, 401

class Auth(Resource):
    def get(self):
        if 'user_id' not in session:
            return {'error': 'Not logged in.'}, 204
        return make_response(jsonify(session), 200)
    def post(self):
        if 'user_id' in session:
            return {'message': 'Already logged in.'}, 200
        req = request.get_json()
        user = User.query.filter(User.id == req['id']).first()
        if user:
            user.strava_connected = True
            user.strava_id = req['id']
            user.strava_access_token = req['accessToken']
            user.strava_refresh_token = req['refreshToken']
            user.strava_token_expiry = datetime.strptime(req['expires_at'], '%Y-%m-%dT%H:%M:%S.%fZ')
            user.last_online = datetime.now()
            db.session.commit()
            session['user_id'] = req['id']
            session['profile'] = user.to_dict()
            return make_response(jsonify(session), 200)
        else:
            try:
                if (User.query.filter(User.strava_id == req['id']).first()):
                    return {'error': 'This Strava account is already associated with a user.'}, 401
                new_user = User(id = req['id'],
                                strava_id = req['id'],
                                email = f"strava@{req['username']}",
                                image = req['profile'],
                                first_name = req['firstname'],
                                last_name = req['lastname'],
                                bio = req['bio'],
                                city = req['city'],
                                state = req['state'],
                                country = req['country'],
                                sex = req['sex'],
                                weight = req['weight'] * 2.20462,
                                strava_connected = True,
                                strava_access_token = req['accessToken'],
                                strava_refresh_token = req['refreshToken'],
                                strava_token_expiry = datetime.strptime(req['expires_at'], '%Y-%m-%dT%H:%M:%S.%fZ')
                                )
                new_user.password_hash = f"1Z{req['profile']}" 
                new_user.last_online = datetime.now()
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                session['profile'] = new_user.to_dict()
                return make_response(jsonify(session), 201)
            except Exception as e:
                return {'error': str(e)}, 401
    def patch(self):
        if 'user_id' not in session:
            return {'error': 'Not logged in.'}, 401
        req = request.get_json()
        if User.query.filter(User.strava_id == req['id']).first():
                return {'error': 'This Strava account is already associated with a user.'}, 401
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            user.strava_id = req['id']
            user.strava_connected = True
            user.strava_access_token = req['accessToken']
            user.strava_refresh_token = req['refreshToken']
            user.strava_token_expiry = datetime.strptime(req['expires_at'], '%Y-%m-%dT%H:%M:%S.%fZ')
            user.last_online = datetime.now()
            db.session.commit()
            session['profile'] = user.to_dict()
            return make_response(jsonify(session), 200)
        else:
            return {'error': 'User not found.'}, 404

class Signup(Resource):
    def post(self):
        if 'user_id' in session:
            return {'error': 'Already logged in'}, 401
        req = request.get_json()
        if User.query.filter(User.email == req['email']).first():
            return {'error': 'Email already exists.'}, 400
        try:
            user = User(email = req['email'],
                        image = req['image'] if 'image' in req else None,
                        first_name = req['first_name'],
                        last_name = req['last_name'],
                        bio = req['bio'],
                        city = req['city'],
                        state = req['state'],
                        country = req['country'],
                        sex = req['sex'],
                        height = req['height'],
                        weight = req['weight'])
            user.password_hash = req['password']
            user.last_online = datetime.now()
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            session['profile'] = user.to_dict()
            return make_response(jsonify(session), 200)
        except Exception as e:
            return {'error': str(e)}, 401

class Login(Resource):
    def post(self):
        if 'user_id' in session:
            return {'error': 'Already logged in.'}, 401
        req = request.get_json()
        user = User.query.filter(User.email == req['email']).first()
        if not user:
            return {'error': 'Invalid email.'}, 400
        if not user.authenticate(req['password']):
            return {'error': 'Invalid password.'}, 400
        user.last_online = datetime.now()
        db.session.commit()
        session['user_id'] = user.id
        session['profile'] = user.to_dict()
        return make_response(jsonify(session), 200)

class Logout(Resource):
    def post(self):
        session.clear()
        return {'message': 'Logged out.'}, 200

class GetUsers(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200      

class UserController(Resource):
    def get(self, id):
        try:
            return User.query.filter(User.id == id).first().to_dict(), 200
        except:
            return {'error': 'User not found.'}, 404
    def patch(self, id):
        if session['user_id'] != id:
            return {'error': 'Unauthorized.'}, 401
        try:
            req = request.get_json()
            user = User.query.filter(User.id == id).first()
            for attr in req:
                setattr(user, attr, req[attr])
            db.session.commit()
            session['profile'] = user.to_dict()
            return user.to_dict(), 200
        except:
            return {'error': 'Unable to edit user.'}, 401
    def delete(self, id):
        if session['user_id'] != id:
            return {'error': 'Unauthorized'}, 401
        try:
            user = User.query.filter(User.id == id).first()
            db.session.delete(user)
            db.session.commit()
            session.pop('user_id')
            return {'message': 'User deleted.'}, 200
        except:
            return {'error': 'Unable to delete user.'}, 401

class MessagesController(Resource):
    def get(self):
        try:
            query = Message.query.filter(Message.sender_id == session['user_id']).all()
            query += Message.query.filter(Message.receiver_id == session['user_id']).all()
            return [message.to_dict() for message in query], 200
        except Exception as e:
            return {'error': str(e)}, 400
    def post(self):
        try:
            req = request.get_json()
            message = Message(sender_id = session['user_id'],
                              receiver_id = req['receiver_id'] if 'receiver_id' in req else None,
                              team_id = req['team_id'] if 'team_id' in req else None,
                              content = req['content'])
            db.session.add(message)
            db.session.commit()
            return message.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400
    def patch(self):
        try:
            req = request.get_json()
            message = Message.query.filter(Message.id == req['id']).first()
            if message.sender_id != session['user_id']:
                return {'error': 'Unauthorized.'}, 401
            message.content = req['content']
            db.session.commit()
            return message.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400
    def delete(self):
        try:
            req = request.get_json()
            message = Message.query.filter(Message.id == req['id']).first()
            if message.sender_id != session['user_id']:
                return {'error': 'Unauthorized.'}, 401
            db.session.delete(message)
            db.session.commit()
            return {'message': 'Message deleted.'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class TeamMessagesController(Resource):
    def get(self):
        try:
            user = User.query.filter(User.id == session['user_id']).first()
            query = Message.query.filter(Message.team_id == user.team_id).all()
            return [message.to_dict() for message in query], 200
        except Exception as e:
            return {'error': str(e)}, 400
    def post(self):
        try:
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            message = Message(sender_id = session['user_id'],
                              team_id = user.team_id,
                              content = req['content'])
            db.session.add(message)
            db.session.commit()
            return message.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400
        
class UnreadMessages(Resource):
    def get(self):
        try:
            user_names = []
            for user in User.query.all():
                user_names.append({"id": user.id, "first_name": user.first_name, "last_name": user.last_name, "image": user.image})
            return {'users': user_names, 'unread_count': len(Message.query.filter(Message.receiver_id == session['user_id']).filter(Message.read == False).all())}, 200
        except Exception as e:
            return {'error': str(e)}, 400
    def patch(self):
        try:
            req = request.get_json()
            messages = Message.query.filter(Message.sender_id == req).filter(Message.receiver_id == session['user_id']).filter(Message.read == False).all()
            for message in messages:
                message.read = True
            db.session.commit()
            return {'message': 'Messages marked as read.'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class ActivitiesController(Resource):
    def get(self, param):
        if param == 'self':
            return [activity.to_dict() for activity in Activity.query.filter(Activity.user_id == session['user_id'])], 200
        elif param == 'all':
            return [activity.to_dict() for activity in Activity.query.all()], 200
    def post(self, param):
        if param == 'self':
            user = User.query.filter(User.id == session['user_id']).first()
        competitions = CompetitionHandler.query.filter(CompetitionHandler.user_id == user.id, CompetitionHandler.start_date < datetime.now(), CompetitionHandler.end_date > datetime.now()).all()
        if user.team_id:
            competitions += CompetitionHandler.query.filter(CompetitionHandler.team_id == user.team_id, CompetitionHandler.start_date < datetime.now(), CompetitionHandler.end_date > datetime.now()).all()
        if user.strava_token_expiry < datetime.now():
            return {'error': 'Strava token expired'}, 400
        page_count = 1
        new_activity_count = 0
        res = httpx.get('https://www.strava.com/api/v3/athlete/activities',
                        headers = {'Authorization': f'Bearer {user.strava_access_token}'},
                        params={'per_page': 200, 'page': page_count})
        if res.status_code != 200:
            return res.json(), 400
        activities = res.json()
        while len(activities) == 200:
            page_count += 1
            res = httpx.get('https://www.strava.com/api/v3/athlete/activities',
                            headers = {'Authorization': f'Bearer {user.strava_access_token}'},
                            params={'per_page': 200, 'page': page_count})
            if res.status_code != 200:
                return {'error': 'Unable to retrieve activities.'}, 400
            activities += res.json()
        for activity in activities:
            if Activity.query.filter(Activity.strava_id == int(activity['id'])).first():
                continue
            for competition in competitions:
                competition_activity_type = competition.activity_type.replace(' ', '')
                if activity['type'] == competition_activity_type and competition.start_date < datetime.strptime(activity['start_date_local'], '%Y-%m-%dT%H:%M:%SZ') < competition.end_date:
                    competition.score += int(activity['distance'] * 0.000621371192)
            new_activity = Activity(strava_id = activity['id'],
                                    name = activity['name'],
                                    activity_type = activity['type'],
                                    distance = round(activity['distance'] * 0.000621371192, 2), # convert meters to miles
                                    moving_time = activity['moving_time'],
                                    elapsed_time = activity['elapsed_time'],
                                    total_elevation_gain = activity['total_elevation_gain'] * 3.2808399, # convert meters to feet
                                    start_date_local = datetime.strptime(activity['start_date_local'], '%Y-%m-%dT%H:%M:%SZ'),
                                    timezone = activity['timezone'],
                                    achievement_count = activity['achievement_count'],
                                    kudos_count = activity['kudos_count'],
                                    comment_count = activity['comment_count'],
                                    average_speed = activity['average_speed'] * 2.23694, # convert meters per second to miles per hour
                                    max_speed = activity['max_speed'] * 2.23694, # convert meters per second to miles per hour
                                    average_heartrate = activity['average_heartrate'] if 'average_heartrate' in activity else 0,
                                    max_heartrate = activity['max_heartrate'] if 'max_heartrate' in activity else 0,
                                    elev_high = activity['elev_high'] * 3.2808399, # convert meters to feet,
                                    elev_low = activity['elev_low'] * 3.2808399, # convert meters to feet,
                                    pr_count = activity['pr_count'],
                                    user_id = session['user_id'])
            new_activity_count += 1
            db.session.add(new_activity)
        user.FPcoins += new_activity_count * 10
        db.session.commit()
        session['profile'] = user.to_dict()
        if new_activity_count == 0:
            return {'message': 'Your Strava is synced'}, 200
        return {'message': f"You just added {new_activity_count} new {'activity' if new_activity_count == 1 else 'activities'}! You earned {new_activity_count * 10} FP coins!", 'profile': user.to_dict()}, 200

class Stats(Resource):
    def get(self):
        activities = [activity.to_dict() for activity in Activity.query.filter(Activity.user_id == session['user_id'])]
        if not activities:
            return 204
        df = pandas.DataFrame(activities)
        # Group by activity type and calculate the mean and sum of distance, moving time, and elevation gain
        grouped = df.groupby('activity_type').agg({
                                            'distance': 'sum',
                                            'moving_time': 'sum',
                                            'total_elevation_gain': 'sum',
                                            'average_speed': 'mean',
                                            'max_speed': 'max',
                                            'average_heartrate': 'mean',
                                            'max_heartrate': 'max'
                                            })
        return grouped.to_json()

class TeamsController(Resource):
    def get(self):
        try:
            teams = Team.query.all()
            for team in teams:
                stats = []
                for user in team.users:
                    activities = [activity.to_dict() for activity in Activity.query.filter(Activity.user_id == user.id)]
                    stats += activities
                if not stats:
                    continue
                df = pandas.DataFrame(stats)
                aggregate = df.agg({
                                'distance': 'sum',
                                'moving_time': 'sum',
                                'average_speed': 'mean',
                                'max_speed': 'max'
                                })
                team.total_distance = aggregate.distance
                team.total_moving_time = aggregate.moving_time
                team.average_speed = aggregate.average_speed
                team.max_speed = aggregate.max_speed
                db.session.commit()
            return [team.to_dict() for team in teams], 200
        except Exception as e:
            return {'error': str(e)}, 400
    def post(self):
        try:
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            if user.team_id:
                return {'error': 'You already belong to a team.'}, 400
            team = Team(name = req['name'],
                        leader_id = session['user_id'],
                        activity_type = req['activity_type'],
                        image = req['image'] if 'image' in req else None)
            db.session.add(team)
            db.session.commit()
            user.team_id = team.id
            db.session.commit()
            session['profile'] = user.to_dict()
            return user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400
    def patch(self):
        try:
            req = request.get_json()
            team = Team.query.filter(Team.id == req['id']).first()
            if team.leader_id != session['user_id']:
                return {'error': 'Unauthorized'}, 401
            if 'name' in req:
                team.name = req['name']
            if 'activity_type' in req:
                team.activity_type = req['activity_type']
            if 'image' in req:
                team.image = req['image']
            db.session.commit()
            return team.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400
    def delete(self):
        try:
            req = request.get_json()
            self = User.query.filter(User.id == session['user_id']).first()
            team = Team.query.filter(Team.id == req['id']).first()
            users = User.query.filter(User.team_id == team.id).all()
            if team.leader_id != session['user_id']:
                return {'error': 'Unauthorized.'}, 401
            for user in users:
                user.team_id = None
                db.session.commit()
            db.session.delete(team)
            db.session.commit()
            session['profile'] = self.to_dict()
            return self.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400

class GetTeam(Resource):
    def get(self, id):
        try:
            team = Team.query.filter(Team.id == id).first()
            stats = []
            for user in team.users:
                activities = [activity.to_dict() for activity in Activity.query.filter(Activity.user_id == user.id)]
                stats += activities
                if not stats:
                    continue
                df = pandas.DataFrame(stats)
                aggregate = df.agg({
                                'distance': 'sum',
                                'moving_time': 'sum',
                                'average_speed': 'mean',
                                'max_speed': 'max'
                                })
                team.total_distance = aggregate.distance
                team.total_moving_time = aggregate.moving_time
                team.average_speed = aggregate.average_speed
                team.max_speed = aggregate.max_speed
                db.session.commit()
            return team.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400

class TeamLeaderController(Resource):
    # invite user to team
    def post(self):
        try:
            req = request.get_json()
            team = Team.query.filter(Team.leader_id == session['user_id']).first()
            user = User.query.filter(User.id == req['receiver_id']).first()
            if user.team_id:
                return {'error': 'User already belongs to a team.'}, 400
            if team.members >= 5:
                return {'error': 'Team is full.'}, 400
            invitation = Message(
                sender_id = session['user_id'],
                receiver_id = user.id,
                team_id = team.id,
                content = f'{user.first_name} {user.last_name} has been invited to join {team.name}.',
                invitation = True)
            db.session.add(invitation)
            db.session.commit()
            return invitation.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400
    # remove user from team
    def delete(self):
        try:
            req = request.get_json()
            team = Team.query.filter(Team.leader_id == session['user_id']).first()
            user = User.query.filter(User.id == req).first()
            if team.leader_id != session['user_id']:
                return {'error': 'Unauthorized'}, 401
            if user.team_id != team.id:
                return {'error': 'User does not belong to this team.'}, 400
            user.team_id = None
            team.members -= 1
            group_msg = Message(
                sender_id = session['user_id'],
                receiver_id = user.id,
                team_id = team.id,
                content = f'{user.first_name} {user.last_name} has been removed from {team.name}.')
            db.session.add(group_msg)
            db.session.commit()
            return team.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400

class JoinTeam(Resource):
    def post(self):
        try:
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            team = Team.query.filter(Team.id == req['team_id']).first()
            if user.team_id is not None:
                return {'error': 'User already belongs to a team.'}, 400
            if team.members > 5:
                return {'error': 'Team is full.'}, 400
            message = Message(
                sender_id = session['user_id'],
                team_id = team.id,
                content = f'{user.first_name} {user.last_name} has joined {team.name}.'
            )
            db.session.add(message)
            user.team_id = team.id
            team.members += 1
            db.session.commit()
            session['profile'] = user.to_dict()
            return user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400

class LeaveTeam(Resource):
    def delete(self):
        try:
            user = User.query.filter(User.id == session['user_id']).first()
            team = Team.query.filter(Team.id == user.team_id).first()
            if team.leader_id == session['user_id']:
                return {'error': 'Team leader cannot leave team.'}, 400
            message = Message(
                sender_id = session['user_id'],
                team_id = team.id,
                content = f'{user.first_name} {user.last_name} has left {team.name}.'
            )
            db.session.add(message)
            user.team_id = None
            team.members -= 1
            db.session.commit()
            session['profile'] = user.to_dict()
            return user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 400
        
class CompetitionsHandler(Resource):
    def get(self):
        return [competition.to_dict() for competition in Competition.query.all()], 200
    def post(self):
        try:
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            if req['start_date'] == '' or req['end_date'] == '':
                return {'error': 'Invalid dates.'}, 400
            if user.FPcoins < int(req['prize_pool']):
                return {'error': 'Not enough FPcoins.'}, 400
            competition = Competition(
                organizer_id = user.id,
                title = req['title'],
                description = 'description',
                type = req['type'],
                activity_type = req['activity_type'],
                prize_pool = int(req['prize_pool']),
                distance = req['distance'],
                start_date = datetime.fromisoformat(req['start_date']),
                end_date = datetime.strptime(req['end_date'], "%a, %d %b %Y %H:%M:%S %Z")
                
            )
            user.FPcoins -= int(req['prize_pool'])
            db.session.add(competition)
            db.session.commit()
            session['profile'] = user.to_dict()
            return {'competition': competition.to_dict(), 'user': user.to_dict()}, 201
        except Exception as e:
            return {'error': str(e)}, 400
    
class GetCompetition(Resource):
    def get(self, id):
        try:
            return [competition_handler.to_dict() for competition_handler in CompetitionHandler.query.filter(CompetitionHandler.competition_id == id).all()], 200
            # return {'competition': Competition.query.filter(Competition.id == id).first().to_dict(), 'competition_handlers': [competition_handler.to_dict() for competition_handler in CompetitionHandler.query.filter(CompetitionHandler.competition_id == id).all()]}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class JoinCompetition(Resource):
    def post(self, param):
        if param == 'solo':
            try:
                req = request.get_json()
                user = User.query.filter(User.id == session['user_id']).first()
                competition = Competition.query.filter(Competition.id == req['competition_id']).first()
                for participant in competition.users:
                    if participant.id == session['user_id']:
                        return {'error': 'You have already joined this competition.'}, 400
                if competition.start_date < datetime.now():
                    return {'error': 'Competition has already started.'}, 400
                if competition.end_date < datetime.now():
                    return {'error': 'Competition has already ended.'}, 400
                if competition.type != 'solo':
                    return {'error': 'Competition is not solo.'}, 400
                new_entry = CompetitionHandler(
                    competition_id = competition.id,
                    user_id = user.id,
                    activity_type = competition.activity_type,
                    start_date = competition.start_date,
                    end_date = competition.end_date
                )
                db.session.add(new_entry)
                db.session.commit()
                session['profile'] = user.to_dict()
                return user.to_dict(), 201
            except Exception as e:
                return {'error': str(e)}, 400
        elif param == 'team':
            try:
                req = request.get_json()
                user = User.query.filter(User.id == session['user_id']).first()
                team = Team.query.filter(Team.leader_id == session['user_id']).first()
                competition = Competition.query.filter(Competition.id == req['competition_id']).first()
                if team is None:
                    return {'error': 'You are not a team leader.'}, 400
                for participant in competition.teams:
                    if participant.id == team.id:
                        return {'error': 'Your team has already joined this competition.'}, 400
                if competition.start_date < datetime.now():
                    return {'error': 'Competition has already started.'}, 400
                if competition.end_date < datetime.now():
                    return {'error': 'Competition has already ended.'}, 400
                if competition.type != 'team':
                    return {'error': 'Competition is not team.'}, 400
                new_entry = CompetitionHandler(
                    competition_id = competition.id,
                    team_id = team.id,
                    activity_type = competition.activity_type,
                    start_date = competition.start_date,
                    end_date = competition.end_date
                )
                group_msg = Message(
                sender_id = session['user_id'],
                team_id = team.id,
                content = f'Our team {team.name} has joined the "{competition.title}" competition. Competition starts on {competition.start_date}. To contribute to the team effort, use your Strava to log&upload "{competition.activity_type}" activities between {competition.start_date} and {competition.end_date}. The goal is to accumulate the highest distance. Every mile matters. Good luck!'
                )
                
                db.session.add_all([new_entry, group_msg])
                db.session.commit()
                session['profile'] = user.to_dict()
                return user.to_dict(), 201
            except Exception as e:
                return {'error': str(e)}, 400
            
class Feedback(Resource):
    def post(self):
        try:
            user = User.query.filter(User.id == session['user_id']).first()
            req = request.get_json()
            msg = MailMessage(f"FitPursuit: {req['subject']}",
                            recipients=["fit.pursuit.app@gmail.com"])
            msg.body = f"""
            Name: {user.first_name} {user.last_name}, FitPursuit_id: {user.id}
            
            Email: {req['email']}

            {req['message']}
            """
            mail.send(msg)
            return {'message': 'Form received.'}, 200
        except Exception as e:
            print(str(e))
            return {'error': str(e)}, 400
        
# Healthcheck
class HealthCheck(Resource):
    def get(self):
        return {'message': 'Healthy'}, 200

# Cron job running every Sunday at 6:00am to start/end competitions and disburse awards.
# Successfully allocating award monies to users and teams. In case of a team competition, the award is split evenly among team members.
class Config:
    SCHEDULER_API_ENABLED = True

app.config.from_object(Config())
scheduler = APScheduler()

def competition_check():
    with scheduler.app.app_context():
        print('running cron job at 6am on Sunday', datetime.now())
        competitions = Competition.query.all()
        for competition in competitions:
            if competition.start_date < datetime.now() and competition.end_date > datetime.now() and competition.in_progress == False:
                competition.in_progress = True
                db.session.commit()
                print(f"{competition.title} has started! - {competition.in_progress}")
            elif competition.end_date < datetime.now() and competition.in_progress == True:
                for i, entry in enumerate(CompetitionHandler.query.filter(CompetitionHandler.competition_id == competition.id).order_by(CompetitionHandler.score.desc()).all()):
                    if i == 0:
                        entry.placement = i + 1
                        award = competition.prize_pool * 0.5
                        if competition.type == 'solo':
                            entry.user.FPcoins += int(award)
                            entry.user.wins += 1
                        elif competition.type == 'team':
                            team = Team.query.filter(Team.id == entry.team_id).first()
                            team.wins += 1
                            for user in team.users:
                                user.FPcoins += int(award / len(team.users))
                        
                    if i == 1:
                        entry.placement = i + 1
                        award = competition.prize_pool * 0.3
                        if competition.type == 'solo':
                            entry.user.FPcoins += int(award)
                        elif competition.type == 'team':
                            team = Team.query.filter(Team.id == entry.team_id).first()
                            for user in team.users:
                                user.FPcoins += int(award / len(team.users))
                    if i == 2:
                        entry.placement = i + 1
                        award = competition.prize_pool * 0.2
                        if competition.type == 'solo':
                            entry.user.FPcoins += int(award)
                        elif competition.type == 'team':
                            team = Team.query.filter(Team.id == entry.team_id).first()
                            for user in team.users:
                                user.FPcoins += int(award / len(team.users))
                    entry.placement = i + 1
                competition.in_progress = False
                db.session.commit()
                print(f"{competition.title} has ended! - {competition.in_progress}")

scheduler.add_job(
    func=competition_check,
    id='run_job',
    trigger=CronTrigger(day_of_week='sun', hour='6', minute='0', second='0')
)
scheduler.init_app(app)
scheduler.start()

api.add_resource(Auth, '/api/auth', endpoint='/api/auth')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')
api.add_resource(GetUsers, '/api/users', endpoint='/api/users')
api.add_resource(UserController, '/api/users/<int:id>', endpoint='/api/users/<int:id>')
api.add_resource(ActivitiesController, '/api/activities/<string:param>', endpoint='/api/activities/<string:param>')
api.add_resource(MessagesController, '/api/messages', endpoint='/api/messages')
api.add_resource(TeamMessagesController, '/api/messages/team', endpoint='/api/messages/team')
api.add_resource(UnreadMessages, '/api/messages/unread', endpoint='/api/messages/unread')
api.add_resource(Stats, '/api/stats', endpoint='/api/stats')
api.add_resource(TeamsController, '/api/teams', endpoint='/api/teams')
api.add_resource(GetTeam, '/api/teams/<int:id>', endpoint='/api/teams/<int:id>')
api.add_resource(TeamLeaderController, '/api/teams/leader', endpoint='/api/teams/leader')
api.add_resource(JoinTeam, '/api/teams/join', endpoint='/api/teams/join')
api.add_resource(LeaveTeam, '/api/teams/leave', endpoint='/api/teams/leave')
api.add_resource(CompetitionsHandler, '/api/competitions', endpoint='/api/competitions')
api.add_resource(GetCompetition, '/api/competitions/<int:id>', endpoint='/api/competitions/<int:id>')
api.add_resource(JoinCompetition, '/api/competitions/<string:param>', endpoint='/api/competitions/<string:param>')
api.add_resource(Feedback, '/api/feedback', endpoint='/api/feedback')
api.add_resource(HealthCheck, '/api/healthcheck', endpoint='/api/healthcheck')

if __name__ == '__main__':
    app.run(port=5555, debug=True)