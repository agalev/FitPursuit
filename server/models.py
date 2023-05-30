from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
import re

from config import bcrypt, db

strava_activities = [
		"Run",
		"Trail Run",
		"Walk",
		"Hike",
		"Virtual Run",
		"Ride",
		"Mountain Bike Ride",
		"Gravel Bike Ride",
		"E-Bike Ride",
		"E-Mountain Bike Ride",
		"Velomobile",
		"Virtual Ride",
		"Canoe",
		"Kayak",
		"Kitesurf Session",
		"Row",
		"Stand Up Paddle",
		"Surf",
		"Swim",
		"Windsurf Session",
		"Ice Skate",
		"Alpine Ski",
		"Backcountry Ski",
		"Nordic Ski",
		"Snowboard",
		"Snowshoe",
		"Golf",
		"Handcycle",
		"Inline Skate",
		"Rock Climb",
		"Roller Ski",
		"Wheelchair",
		"Crossfit",
		"Elliptical",
		"Sailing",
		"Skateboarding",
		"Soccer",
		"Stair Stepper",
		"Weight Training",
		"Yoga",
		"Workout",
		"Tennis",
		"Pickleball",
		"Racquetball",
		"Squash",
		"Badminton",
		"Table Tennis",
		"HIIT",
		"Pilates",
		"Virtual Row"
	]

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',
                       '-strava_access_token',
                       '-strava_refresh_token',
                       '-strava_token_expiry',
                       '-created_at',
                       '-updated_at',
                       '-activities',
                       '-team.users',
                       '-team.leader',
                       '-team.messages',
                       '-team.created_at',
                       '-team.updated_at',
                       '-competitions.organizer',
                       '-competitions.teams',
                       '-competitions.users'
                       )
    
    id = db.Column(db.Integer, primary_key=True)
    strava_id = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    image = db.Column(db.String(200))
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(200))
    city = db.Column(db.String(80))
    state = db.Column(db.String(80))
    country = db.Column(db.String(80))
    sex = db.Column(db.String(1))
    height = db.Column(db.Integer)
    weight = db.Column(db.Float)
    wins = db.Column(db.Integer, default=0)
    FPcoins = db.Column(db.Integer, default=0)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    last_online = db.Column(db.DateTime, default=db.func.now())
    strava_connected = db.Column(db.Boolean, default=False)
    strava_access_token = db.Column(db.String)
    strava_refresh_token = db.Column(db.String)
    strava_token_expiry = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    activities = db.relationship('Activity', back_populates='user', cascade='all, delete-orphan')
    team = db.relationship('Team', back_populates='users', foreign_keys=[team_id], uselist=False)
    competitions = db.relationship('Competition', back_populates='users', secondary='competition_handlers')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search('[A-Z]', password):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search('[a-z]', password):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search('[0-9]', password):
            raise ValueError('Password must contain at least one digit')
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('email')
    def validate_email(self, key, email):
        existing_user = User.query.filter(User.email == email).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('Email address already registered')
        if not email:
            raise ValueError("Please provide an email address")
        if '@' not in email:
            raise ValueError("Please provide an email address")
        return email
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("Please provide a first name")
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise ValueError("Please provide a last name")
        return last_name

    
class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    serialize_rules = ('-user.FPcoins',
                       '-user.bio',
                       '-user.city',
                       '-user.state',
                       '-user.country',
                       '-user.competitions',
                       '-user.email',
                       '-user.height',
                       '-user.weight',
                       '-user.id',
                       '-user.image',
                       '-user.last_online',
                       '-user.sex',
                       '-user.strava_connected',
                       '-user.strava_id',
                       '-user.team',
                       '-user.team_id',
                       '-user.wins',)

    id = db.Column(db.Integer, primary_key=True)
    qualified = db.Column(db.Boolean, default=True)
    strava_id = db.Column(db.Integer)
    name = db.Column(db.String)
    activity_type = db.Column(db.String)
    distance = db.Column(db.Float)
    moving_time = db.Column(db.Integer)
    elapsed_time = db.Column(db.Integer)
    total_elevation_gain = db.Column(db.Float)
    start_date_local = db.Column(db.DateTime)
    timezone = db.Column(db.String)
    achievement_count = db.Column(db.Integer)
    kudos_count = db.Column(db.Integer)
    comment_count = db.Column(db.Integer)
    average_speed = db.Column(db.Float)
    max_speed = db.Column(db.Float)
    average_heartrate = db.Column(db.Float)
    max_heartrate = db.Column(db.Float)
    elev_high = db.Column(db.Float)
    elev_low = db.Column(db.Float)
    pr_count = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='activities')

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    serialize_rules = ('-created_at',
                       '-updated_at',
                       '-users.team',
                       '-users.competitions',
                       '-messages.team',
                       '-leader.team',
                       '-leader.competitions',
                       '-competitions.organizer',
                       '-competitions.users',
                       '-competitions.teams',
                       )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    image = db.Column(db.String(200))
    leader_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    activity_type = db.Column(db.String(20))
    members = db.Column(db.Integer, default=1)
    score = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    total_distance = db.Column(db.Integer, default=0)
    total_moving_time = db.Column(db.Integer, default=0)
    average_speed = db.Column(db.Integer, default=0)
    max_speed = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    leader = db.relationship('User', foreign_keys=[leader_id], uselist=False)
    users = db.relationship('User', back_populates='team', foreign_keys='User.team_id', cascade='all, delete-orphan')
    messages = db.relationship('Message', back_populates='team', cascade='all, delete-orphan')
    competitions = db.relationship('Competition', back_populates='teams', secondary='competition_handlers', overlaps="competitions")


    @validates('members')
    def validate_members(self, key, members):
        if members > 5:
            raise ValueError('Teams may not have more than 5 members.')
        return members
    
    @validates('name')
    def validate_name(self, key, name):
        existing_team = Team.query.filter(Team.name == name).first()
        if existing_team and existing_team.id != self.id:
            raise ValueError('Team name already taken')
        if not name:
            raise ValueError("Please provide a team name")
        return name

    @validates('activity_type')
    def validate_activity_type(self, key, activity_type):
        if not activity_type or activity_type not in strava_activities:
            raise ValueError("Please provide an activity type.")
        return activity_type
    
    
class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    serialize_rules = ('-team.messages',
                       '-team.leader',
                       '-team.users',
                       '-team.competitions',
                       '-sender.team',
                       '-sender.competitions',
                       '-receiver.team',
                       '-receiver.competitions'
                       )

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    content = db.Column(db.String(2000), nullable=False)
    read = db.Column(db.Boolean, default=False)
    invitation = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
    team = db.relationship('Team', back_populates='messages')

class Competition(db.Model, SerializerMixin):
    __tablename__ = 'competitions'

    serialize_rules = ('-organizer.team',
                       '-organizer.competitions',
                       '-teams.leader',
                       '-teams.competitions',
                       '-teams.messages',
                       '-teams.users',
                       '-users.competitions',
                       '-users.team',
                       )

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String)
    type = db.Column(db.String, nullable=False)
    activity_type = db.Column(db.String, nullable=False)
    prize_pool = db.Column(db.Integer, nullable=False, default=0)
    distance = db.Column(db.Boolean, nullable=False) # For the time being, competitions will only be based off of distance
    average_speed = db.Column(db.Float)
    max_speed = db.Column(db.Float)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    in_progress = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    organizer = db.relationship('User', foreign_keys=[organizer_id])
    users = db.relationship('User', back_populates='competitions', secondary='competition_handlers', overlaps="competitions")
    teams = db.relationship('Team', back_populates='competitions', secondary='competition_handlers', overlaps="competitions,users")

    @validates('title')
    def validate_name(self, key, title):
        existing_title = Competition.query.filter(Competition.title == title).first()
        if existing_title:
            raise ValueError('Competition with this title already exists.')
        if not title:
            raise ValueError("Please provide a title.")
        return title
    
    @validates('type')
    def validate_type(self, key, type):
        if not type or type not in ['solo', 'team']:
            raise ValueError("Please provide a type.")
        return type

    @validates('activity_type')
    def validate_activity_type(self, key, activity_type):
        if not activity_type or activity_type not in strava_activities:
            raise ValueError("Please provide an activity type.")
        return activity_type
    
    @validates('start_date')
    def validate_start_date(self, key, start_date):
        if not start_date or start_date == '':
            raise ValueError("Please provide a start date.")
        return start_date
    
    @validates('end_date')
    def validate_end_date(self, key, end_date):
        if not end_date or end_date == '':
            raise ValueError("Please provide an end date.")
        return end_date
    
    @validates('prize_pool')
    def validate_prize_pool(self, key, prize_pool):
        if not prize_pool:
            raise ValueError("Please provide a prize pool.")
        return prize_pool
    
    @validates('distance')
    def validate_distance(self, key, distance):
        if not distance:
            raise ValueError("Please provide an objective.")
        return distance

class CompetitionHandler(db.Model, SerializerMixin):
    __tablename__ = 'competition_handlers'

    serialize_rules = ('-user.team',
                       '-user.competitions',
                       '-competition.organizer',
                       '-competition.users',
                       '-competition.teams',
                       '-team.users',
                       '-team.leader',
                       '-team.messages',
                       '-team.competitions'
                       )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))
    activity_type = db.Column(db.String)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    score = db.Column(db.Integer, default=0)
    placement = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', foreign_keys=[user_id], overlaps="competitions,users")
    team = db.relationship('Team', foreign_keys=[team_id], overlaps="competitions,teams")
    competition = db.relationship('Competition', foreign_keys=[competition_id], overlaps="competitions,competitions,teams,users")
