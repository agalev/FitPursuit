from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
import re

# from config import bcrypt, db
from app import bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-password_hash', '-messages', '-activities', '-competitions')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)
    sex = db.Column(db.String)
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    team_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # rooms = db.relationship('RoomUser', backref='user', cascade='all, delete, delete-orphan')
    activities = db.relationship('Activity', backref='user', cascade='all, delete, delete-orphan')
    messages = db.relationship('Message', backref='user', cascade='all, delete, delete-orphan')
    competitions = db.relationship('Competition', backref='user', cascade='all, delete, delete-orphan')

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
        return email
    
class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    strava_id = db.Column(db.Integer)
    type = db.Column(db.String)
    distance = db.Column(db.Integer)
    moving_time = db.Column(db.Integer)
    elapsed_time = db.Column(db.Integer)
    total_elevation_gain = db.Column(db.Integer)
    start_date_local = db.Column(db.DateTime)
    timezone = db.Column(db.String)
    achievement_count = db.Column(db.Integer)
    kudos_count = db.Column(db.Integer)
    comment_count = db.Column(db.Integer)
    start_latlng = db.Column(db.String)
    end_latlng = db.Column(db.String)
    average_speed = db.Column(db.Float)
    max_speed = db.Column(db.Float)
    average_heartrate = db.Column(db.Float)
    max_heartrate = db.Column(db.Float)
    elev_high = db.Column(db.Integer)
    elev_low = db.Column(db.Integer)
    pr_count = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    leader_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    members = db.Column(db.Integer, default=0)
    score = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    type = db.Column(db.String)
    total_distance = db.Column(db.Integer, default=0)
    total_moving_time = db.Column(db.Integer, default=0)
    average_speed = db.Column(db.Integer, default=0)
    max_speed = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    leader = db.relationship('User', backref='team', foreign_keys=[leader_id])
    messages = db.relationship('Message', backref='team', cascade='all, delete, delete-orphan')
    competitions = db.relationship('Competition', backref='team', cascade='all, delete, delete-orphan')

    @validates('topic')
    def validate_topic(self, key, topic):
        if len(topic) < 3 or len(topic) > 20:
            raise ValueError('Topic must be between 3 and 20 characters long.')
        return topic
    
class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))
    content = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean, default=False)
    invitation = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


class Competition(db.Model, SerializerMixin):
    __tablename__ = 'competitions'

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    activity_type = db.Column(db.String, nullable=False)
    distance = db.Column(db.Integer, nullable=False)
    average_speed = db.Column(db.Float, nullable=False)
    max_speed = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class CompetitionHandler(db.Model, SerializerMixin):
    __tablename__ = 'competition_handlers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))
    score = db.Column(db.Integer, default=0)
    placement = db.Column(db.Integer, default=0)

    # user = db.relationship('User', backref='competition_handler', foreign_keys=[user_id])
    # team = db.relationship('Team', backref='competition_handler', foreign_keys=[team_id])
    # competition = db.relationship('Competition', backref='competition_handler', foreign_keys=[competition_id])