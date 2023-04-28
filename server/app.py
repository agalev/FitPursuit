from flask import session, request
from flask_restful import Resource
from datetime import datetime
import httpx

from config import app, api, db
from models import User, Activity, Team, Message, Competition, CompetitionHandler

# @app.before_request
# def firewall():
#     if 'user_id' not in session and request.endpoint not in ['/api/login', '/api/signup']:
#         return {'error': 'Not logged in'}, 401

class Auth(Resource):
    def get(self):
        return User.query.filter(User.id == session['user_id']).first().to_dict(), 200

class Signup(Resource):
    def post(self):
        if 'user_id' in session:
            return {'error': 'Already logged in'}, 401
        req = request.get_json()
        if User.query.filter(User.email == req['email']).first():
            return {'error': 'Email already exists'}, 400
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
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user.to_dict(), 201

class Login(Resource):
    def post(self):
        if 'user_id' in session:
            return {'error': 'Already logged in'}, 401
        req = request.get_json()
        user = User.query.filter(User.email == req['email']).first()
        if not user:
            return {'error': 'Invalid email'}, 400
        if not user.authenticate(req['password']):
            return {'error': 'Invalid password'}, 400
        session['user_id'] = user.id
        return user.to_dict(), 200

class Logout(Resource):
    def post(self):
        session.pop('user_id')
        return {'message': 'Logged out'}, 200

class GetUsers(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200      

class UserController(Resource):
    def get(self, id):
        try:
            return User.query.filter(User.id == id).first().to_dict(), 200
        except:
            return {'error': 'User not found'}, 404
    def patch(self, id):
        if session['user_id'] != id:
            return {'error': 'Unauthorized'}, 401
        try:
            req = request.get_json()
            user = User.query.filter(User.id == id).first()
            for attr in req:
                setattr(user, attr, req[attr])
            db.session.commit()
            return user.to_dict(), 200
        except:
            return {'error': 'Unable to edit user'}, 401
    def delete(self, id):
        if session['user_id'] != id:
            return {'error': 'Unauthorized'}, 401
        try:
            user = User.query.filter(User.id == id).first()
            db.session.delete(user)
            db.session.commit()
            session.pop('user_id')
            return {'message': 'User deleted'}, 200
        except:
            return {'error': 'Unable to delete user'}, 401

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
                return {'error': 'Unauthorized'}, 401
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
                return {'error': 'Unauthorized'}, 401
            db.session.delete(message)
            db.session.commit()
            return {'message': 'Message deleted'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class ActivitiesController(Resource):
    def get(self):
        return [activity.to_dict() for activity in Activity.query.all()], 200
    def post(self):
        # try:
            user = User.query.filter(User.id == 3).first()
            if user.strava_token_expiry < datetime.now():
                return {'error': 'Strava token expired'}, 400
            page_count = 1
            res = httpx.get('https://www.strava.com/api/v3/athlete/activities',
                            headers = {'Authorization': f'Bearer {user.strava_access_token}'},
                            params={'per_page': 200, 'page': page_count})
            if res.status_code != 200:
                return {'error': 'Unable to retrieve activities'}, 400
            activities = res.json()
            while len(activities) == 200:
                page_count += 1
                res = httpx.get('https://www.strava.com/api/v3/athlete/activities',
                                headers = {'Authorization': f'Bearer {user.strava_access_token}'},
                                params={'per_page': 200, 'page': page_count})
                if res.status_code != 200:
                    return {'error': 'Unable to retrieve activities'}, 400
                activities += res.json()
            return activities, 200

            # return activities[81], 200
            for activity in activities:
                if Activity.query.filter(Activity.strava_id == activity['id']).first():
                    continue
                new_activity = Activity(strava_id = activity['id'],
                                        name = activity['name'],
                                        type = activity['type'],
                                        distance = activity['distance'],
                                        moving_time = activity['moving_time'],
                                        elapsed_time = activity['elapsed_time'],
                                        total_elevation_gain = activity['total_elevation_gain'],
                                        start_date_local = datetime.strptime(activity['start_date_local'], '%Y-%m-%dT%H:%M:%SZ'),
                                        timezone = activity['timezone'],
                                        achievement_count = activity['achievement_count'],
                                        kudos_count = activity['kudos_count'],
                                        comment_count = activity['comment_count'],
                                        average_speed = activity['average_speed'],
                                        max_speed = activity['max_speed'],
                                        average_heartrate = activity['average_heartrate'] if 'average_heartrate' in activity else None,
                                        max_heartrate = activity['max_heartrate'] if 'max_heartrate' in activity else None,
                                        elev_high = activity['elev_high'],
                                        elev_low = activity['elev_low'],
                                        pr_count = activity['pr_count'],
                                        user_id = 3)
                db.session.add(new_activity)
                db.session.commit()
                                        
                # print(activity)
class TeamsController(Resource):
    def get(self):
        return [team.to_dict() for team in Team.query.all()], 200
    def post(self):
        try:
            if Team.query.filter(Team.leader_id == session['user_id']).first():
                return {'error': 'User already has a team'}, 400
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            team = Team(name = req['name'],
                        leader_id = session['user_id'],
                        type = req['type'],
                        image = req['image'] if 'image' in req else None)
            db.session.add(team)
            db.session.commit()
            user.team_id = team.id
            db.session.commit()
            return team.to_dict(), 201
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
            if 'type' in req:
                team.type = req['type']
            if 'image' in req:
                team.image = req['image']
            db.session.commit()
            return team.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400
    def delete(self):
        try:
            req = request.get_json()
            user = User.query.filter(User.id == session['user_id']).first()
            team = Team.query.filter(Team.id == req['id']).first()
            if team.leader_id != session['user_id']:
                return {'error': 'Unauthorized'}, 401
            user.team_id = None
            db.session.delete(team)
            db.session.commit()
            return {'message': 'Team deleted'}, 200
        except Exception as e:
            return {'error': str(e)}, 400

class TeamLeaderController(Resource):
    def get(self):
        try:
            team = Team.query.filter(Team.leader_id == session['user_id']).first()
            return team.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 400
    # invite user to team
    def post(self):
        try:
            req = request.get_json()
            team = Team.query.filter(Team.leader_id == session['user_id']).first()
            user = User.query.filter(User.email == req['email']).first()
            if user.team_id:
                return {'error': 'User already has a team'}, 400
            if team.members > 5:
                return {'error': 'Team is full'}, 400
            invitation = Message(
                sender_id = session['user_id'],
                receiver_id = user.id,
                team_id = team.id,
                content = f'You have been invited to join {team.name}!',
                invitation = True)
            db.session.add(invitation)
            db.session.commit()
            return {'message': 'User invited to team'}, 200
        except Exception as e:
            return {'error': str(e)}, 400
        
class GetCompetitions(Resource):
    def get(self):
        return [competition.to_dict() for competition in Competition.query.all()], 200
    
## Will continue backend later

class StravaAuth(Resource):
    def post(self):
        req = request.get_json()
        user = User.query.filter(User.id == 3).first()
        user.strava_access_token = req['access_token']
        user.strava_refresh_token = req['refresh_token']
        user.strava_token_expiry = datetime.fromtimestamp(int(req['expires_at']))
        db.session.commit()
            
api.add_resource(Auth, '/api/auth', endpoint='/api/auth')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')
api.add_resource(GetUsers, '/api/users', endpoint='/api/users')
api.add_resource(UserController, '/api/users/<int:id>', endpoint='/api/users/<int:id>')
api.add_resource(MessagesController, '/api/messages', endpoint='/api/messages')
api.add_resource(ActivitiesController, '/api/activities', endpoint='/api/activities')
api.add_resource(TeamsController, '/api/teams', endpoint='/api/teams')
api.add_resource(GetCompetitions, '/api/competitions', endpoint='/api/competitions')
api.add_resource(StravaAuth, '/api/strava_auth', endpoint='/api/strava_auth')

if __name__ == '__main__':
    app.run(port=5555, debug=True)