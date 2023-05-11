from models import User, Team, Activity, Message, Competition, CompetitionHandler
from config import app, db
from datetime import datetime

with app.app_context():
    print('Deleting all tables...')

    # db.drop_all()
    # db.create_all()

    User.query.delete()
    Team.query.delete()
    Activity.query.delete()
    Message.query.delete()
    Competition.query.delete()
    CompetitionHandler.query.delete()

    # Create users
    print('Creating users...')
    user1 = User(
        email='test@test.com',
        image='/seed_avatars/1.svg',
        first_name='John',
        last_name='Doe',
        bio='I am a test user',
        city='San Francisco',
        state='California',
        country='United States',
        sex='M',
        height=82,
        weight=220,
        wins=3,
        FPcoins=2000,
        team_id=1
    )
    user1.password_hash = 'Password1'
    
    user2 = User(
        email='test2@test.com',
        image='/seed_avatars/2.svg',
        first_name='Jane',
        last_name='Doe',
        bio='I am a test user',
        city='Santa Barbara',
        state='California',
        country='United States',
        sex='F',
        height=60,
        weight=120,
        wins=2,
        FPcoins=3000,
        team_id=1
    )
    user2.password_hash = 'Password1'

    user3 = User(
        email='test3@test.com',
        image='/seed_avatars/3.svg',
        first_name='Johny',
        last_name='Doey',
        bio='I am a test user',
        city='San Diego',
        state='California',
        country='United States',
        sex='M',
        height=72,
        weight=180,
        wins=2,
        FPcoins=3000,
        team_id=1
    )
    user3.password_hash = 'Password1'

    user4 = User(
        email='test4@test.com',
        image='/seed_avatars/4.svg',
        first_name='Janice',
        last_name='Danice',
        bio='I am a test user',
        city='Los Angeles',
        state='California',
        country='United States',
        sex='F',
        height=71,
        weight=177,
        wins=1,
        FPcoins=1000,
        team_id=3
    )
    user4.password_hash = 'Password1'

    user5 = User(
        email='test5@test.com',
        image='/seed_avatars/5.svg',
        first_name='Janet',
        last_name='Doe',
        bio='I am a test user',
        city='Denver',
        state='Colorado',
        country='United States',
        sex='F',
        height=73,
        weight=178,
        wins=4,
        FPcoins=1000,
        team_id=1
    )
    user5.password_hash = 'Password1'

    user6 = User(
        email='test6@test.com',
        image='/seed_avatars/6.svg',
        first_name='Joe',
        last_name='Dan',
        bio='I am a test user',
        city='Boulder',
        state='Colorado',
        country='United States',
        sex='M',
        height=83,
        weight=180,
        wins=5,
        FPcoins=4000,
        team_id=2
    )
    user6.password_hash = 'Password1'

    user7 = User(
        email='test7@test.com',
        image='/seed_avatars/7.svg',
        first_name='Jack',
        last_name='Daniels',
        bio='I am a test user',
        city='Boston',
        state='Massachusetts',
        country='United States',
        sex='M',
        height=84,
        weight=220,
        wins=2,
        FPcoins=2000,
        team_id=3
    )
    user7.password_hash = 'Password1'

    user8 = User(
        email='test8@test.com',
        image='/seed_avatars/8.svg',
        first_name='Jill',
        last_name='Daniels',
        bio='I am a test user',
        city='Miami',
        state='Florida',
        country='United States',
        sex='F',
        height=80,
        weight=170,
        wins=1,
        FPcoins=4000,
        team_id=2
    )
    user8.password_hash = 'Password1'

    user9 = User(
        email='test9@test.com',
        image='/seed_avatars/9.svg',
        first_name='Jackson',
        last_name='Johnson',
        bio='I am a test user',
        city='Jacksonville',
        state='Florida',
        country='United States',
        sex='M',
        height=79,
        weight=179,
        wins=3,
        FPcoins=3000,
        team_id=3
    )
    user9.password_hash = 'Password1'

    user10 = User(
        email='test10@test.com',
        image='/seed_avatars/10.svg',
        first_name='Joan',
        last_name='Johnson',
        bio='I am a test user',
        city='Boulder',
        state='Colorado',
        country='United States',
        sex='M',
        height=79,
        weight=166,
        wins=1,
        FPcoins=1000,
        team_id=1
    )
    user10.password_hash = 'Password1'


    # Create teams
    print('Creating teams...')
    team1 = Team(
        name='Runner Ups',
        leader_id=1,
        wins=13,
        activity_type='running'
    )
    team2 = Team(
        name='Cyclus',
        leader_id=2,
        wins=11,
        activity_type='bicycling'
    )
    team3 = Team(
        name='Rollerbladers',
        leader_id=3,
        wins=7,
        activity_type='rollerblading'
    )

    team4 = Team(
        name='Ski Bums',
        leader_id=4,
        wins=12,
        activity_type='skiing'
    )

    team5 = Team(
        name='Snow Bunniez',
        leader_id=5,
        wins=5,
        activity_type='snowboarding'
    )

    team6 = Team(
        name='Mountain Goats',
        leader_id=6,
        wins=9,
        activity_type='climbing'
    )

    team7 = Team(
        name='Swimmers',
        leader_id=7,
        wins=8,
        activity_type='swimming'
    )

    # Create activities
    print('Creating activities...')
    activity1 = Activity(
        strava_id=1,
        name='Activity 1',
        activity_type='running',
        distance=6,
        moving_time=1000,
        elapsed_time=1000,
        total_elevation_gain=1000,
        start_date_local=datetime(2012, 3, 3, 10, 10, 10),
        timezone='America/Los_Angeles',
        achievement_count=1,
        kudos_count=1,
        comment_count=1,
        average_speed=11,
        max_speed=14,
        average_heartrate=90,
        max_heartrate=184,
        elev_high=2,
        elev_low=1,
        pr_count=1,
        user_id=1
    )
    activity2 = Activity(
        strava_id=2,
        name='Activity 2',
        activity_type='bicycling',
        distance=8,
        moving_time=1000,
        elapsed_time=1000,
        total_elevation_gain=1000,
        start_date_local=datetime(2012, 3, 3, 10, 10, 10),
        timezone='America/Los_Angeles',
        achievement_count=1,
        kudos_count=1,
        comment_count=1,
        average_speed=13,
        max_speed=14,
        average_heartrate=115,
        max_heartrate=186,
        elev_high=2,
        elev_low=1,
        pr_count=1,
        user_id=2
    )
    activity3 = Activity(
        strava_id=3,
        name='Activity 3',
        activity_type='rollerblading',
        distance=10,
        moving_time=1000,
        elapsed_time=1000,
        total_elevation_gain=1000,
        start_date_local=datetime(2012, 3, 3, 10, 10, 10),
        timezone='America/Los_Angeles',
        achievement_count=1,
        kudos_count=1,
        comment_count=1,
        average_speed=12.3,
        max_speed=13.4,
        average_heartrate=145,
        max_heartrate=156,
        elev_high=2,
        elev_low=1,
        pr_count=1,
        user_id=3
    )

    # Create messages
    print('Creating messages...')
    message1 = Message(
        sender_id=1,
        team_id=1,
        receiver_id=2,
        invitation=True,
        content='Hello, Jane!'
    )
    message2 = Message(
        sender_id=2,
        receiver_id=1,
        content='Hello, John!'
    )
    message3 = Message(
        sender_id=1,
        receiver_id=2,
        team_id=1,
        content='How do you like the team?'
    )
    message4 = Message(
        sender_id=2,
        receiver_id=1,
        content='It is great!'
    )
    message5 = Message(
        sender_id=1,
        receiver_id=2,
        content='I am glad you like it!'
    )
    message6 = Message(
        sender_id=2,
        receiver_id=1,
        content='Me too!'
    )
    message7 = Message(
        sender_id=2,
        receiver_id=1,
        content='FP is awesome!'
    )
    message8 = Message(
        sender_id=1,
        receiver_id=2,
        content='I know, right?'
    )
    message9 = Message(
        sender_id=2,
        receiver_id=1,
        content='I am so glad I joined!'
    )
    message10 = Message(
        sender_id=1,
        receiver_id=2,
        content='Me too!'
    )
    message11 = Message(
        sender_id=3,
        receiver_id=1,
        content='I am so glad I joined!'
    )
    message12 = Message(
        sender_id=4,
        receiver_id=1,
        content='Hello John'
    )
    message13 = Message(
        sender_id=5,
        receiver_id=1,
        content='Hello John'
    )
    message14 = Message(
        sender_id=6,
        receiver_id=1,
        content='Hello John'
    )
    message15 = Message(
        sender_id=7,
        receiver_id=1,
        content='Hello John'
    )
    message16 = Message(
        sender_id=8,
        receiver_id=1,
        content='Hello John'
    )
    message17 = Message(
        sender_id=9,
        receiver_id=1,
        content='Hello John'
    )
    message18 = Message(
        sender_id=10,
        receiver_id=1,
        content='Hello John'
    )

    # Create competitions
    print('Creating competitions...')
    competition1 = Competition(
        organizer_id=1,
        title='Competition 1',
        description='This is a test competition',
        type='team',
        activity_type='running',
        distance=1000,
        average_speed=1.23,
        max_speed=1.34,
        start_date=datetime(2012, 3, 3, 10, 10, 10),
        end_date=datetime(2012, 3, 3, 10, 10, 10)
    )
    competition2 = Competition(
        organizer_id=2,
        title='Competition 2',
        description='This is a test competition',
        type='solo',
        activity_type='bicycling',
        distance=1000,
        average_speed=1.23,
        max_speed=1.34,
        start_date=datetime(2012, 3, 3, 10, 10, 10),
        end_date=datetime(2012, 3, 3, 10, 10, 10)
    )
    competition3 = Competition(
        organizer_id=3,
        title='Competition 3',
        description='This is a test competition',
        type='solo',
        activity_type='rollerblading',
        distance=1000,
        average_speed=1.23,
        max_speed=1.34,
        start_date=datetime(2012, 3, 3, 10, 10, 10),
        end_date=datetime(2012, 3, 3, 10, 10, 10)
    )

    # Create competition participants
    print('Creating competition participants...')
    competition_participant1 = CompetitionHandler(
        user_id=1,
        team_id=1,
        competition_id=1
    )
    competition_participant2 = CompetitionHandler(
        user_id=2,
        team_id=1,
        competition_id=2
    )
    competition_participant3 = CompetitionHandler(
        user_id=3,
        team_id=3,
        competition_id=3
    )

    db.session.add_all([
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9,
        user10,
        team1,
        team2,
        team3,
        team4,
        team5,
        team6,
        team7,
        activity1,
        activity2,
        activity3,
        message1,
        message2,
        message3,
        message4,
        message5,
        message6,
        message7,
        message8,
        message9,
        message10,
        message11,
        message12,
        message13,
        message14,
        message15,
        message16,
        message17,
        message18,
        competition1,
        competition2,
        competition3,
        competition_participant1,
        competition_participant2,
        competition_participant3
    ])
    db.session.commit()
