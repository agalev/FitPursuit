from models import db, User, Team, Activity, Message, Competition, CompetitionHandler

db.drop_all()
db.create_all()

# Create users
user1 = User(
    email='test@test.com',
    password='Password1',
    # image='https://i.imgur.com/2FZL0fg.png',
    first_name='John',
    last_name='Doe',
    bio='I am a test user',
    city='San Francisco',
    state='CA',
    country='USA',
    sex='M',
    height=72,
    weight=180,
    # team_id=1
)
user2 = User(
    email='test2@test.com',
    password='Password1',
    # image='https://i.imgur.com/2FZL0fg.png',
    first_name='Jane',
    last_name='Doe',
    bio='I am a test user',
    city='San Francisco',
    state='CA',
    country='USA',
    sex='F',
    height=60,
    weight=120,
    # team_id=1
)
user3 = User(
    email='test3@test.com',
    password='Password1',
    # image='https://i.imgur.com/2FZL0fg.png',
    first_name='Johny',
    last_name='Doey',
    bio='I am a test user',
    city='San Francisco',
    state='CA',
    country='USA',
    sex='M',
    height=72,
    weight=180,
    # team_id=1
)

# Create teams
team1 = Team(
    name='Team 1',
    leader_id=1,
    type='running'
)
team2 = Team(
    name='Team 2',
    leader_id=2,
    type='bicycling'
)
team3 = Team(
    name='Team 3',
    leader_id=3,
    type='rollerblading'
)

# Create activities
activity1 = Activity(
    strava_id=1,
    type='running',
    distance=1000,
    moving_time=1000,
    elapsed_time=1000,
    total_elevation_gain=1000,
    start_date_local='2018-01-01 00:00:00',
    timezone='America/Los_Angeles',
    achievement_count=1,
    kudos_count=1,
    comment_count=1,
    start_latlng='37.7749,-122.4194',
    end_latlng='37.7749,-122.4194',
    average_speed=1.23,
    max_speed=1.34,
    average_heartrate=1.45,
    max_heartrate=1.56,
    elev_high=2,
    elev_low=1,
    pr_count=1,
    user_id=1
)
activity2 = Activity(
    strava_id=2,
    type='bicycling',
    distance=1000,
    moving_time=1000,
    elapsed_time=1000,
    total_elevation_gain=1000,
    start_date_local='2018-01-01 00:00:00',
    timezone='America/Los_Angeles',
    achievement_count=1,
    kudos_count=1,
    comment_count=1,
    start_latlng='37.7749,-122.4194',
    end_latlng='37.7749,-122.4194',
    average_speed=1.23,
    max_speed=1.34,
    average_heartrate=1.45,
    max_heartrate=1.56,
    elev_high=2,
    elev_low=1,
    pr_count=1,
    user_id=2
)
activity3 = Activity(
    strava_id=1,
    type='rollerblading',
    distance=1000,
    moving_time=1000,
    elapsed_time=1000,
    total_elevation_gain=1000,
    start_date_local='2018-01-01 00:00:00',
    timezone='America/Los_Angeles',
    achievement_count=1,
    kudos_count=1,
    comment_count=1,
    start_latlng='37.7749,-122.4194',
    end_latlng='37.7749,-122.4194',
    average_speed=1.23,
    max_speed=1.34,
    average_heartrate=1.45,
    max_heartrate=1.56,
    elev_high=2,
    elev_low=1,
    pr_count=1,
    user_id=3
)

# Create messages
message1 = Message(
    sender_id=1,
    receiver_id=2,
    content = 'Hello, world!',
)
message2 = Message(
    sender_id=2,
    receiver_id=1,
    content = 'Hello, world!',
)
message3 = Message(
    sender_id=1,
    receiver_id=3,
    content = 'Hello, world!',
)

# Create competitions
competition1 = Competition(
    organizer_id=1,
    title='Competition 1',
    description='This is a test competition',
    activity_type='running',
    distance=1000,
    average_speed=1.23,
    max_speed=1.34,
    start_date='2018-01-01 00:00:00',
    end_date='2018-01-01 00:00:00'
)
competition2 = Competition(
    organizer_id=2,
    title='Competition 2',
    description='This is a test competition',
    activity_type='bicycling',
    distance=1000,
    average_speed=1.23,
    max_speed=1.34,
    start_date='2018-01-01 00:00:00',
    end_date='2018-01-01 00:00:00'
)
competition3 = Competition(
    organizer_id=3,
    title='Competition 3',
    description='This is a test competition',
    activity_type='rollerblading',
    distance=1000,
    average_speed=1.23,
    max_speed=1.34,
    start_date='2018-01-01 00:00:00',
    end_date='2018-01-01 00:00:00'
)

# Create competition participants
competition_participant1 = CompetitionHandler(
    user_id=1,
    competition_id=1
)
competition_participant2 = CompetitionHandler(
    user_id=2,
    competition_id=2
)
competition_participant3 = CompetitionHandler(
    user_id=3,
    competition_id=3
)

db.session.add_all([
    user1,
    user2,
    user3,
    team1,
    team2,
    team3,
    activity1,
    activity2,
    activity3,
    message1,
    message2,
    message3,
    competition1,
    competition2,
    competition3,
    competition_participant1,
    competition_participant2,
    competition_participant3
])
db.session.commit()
