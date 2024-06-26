"""create tables

Revision ID: c411e7d7b6a1
Revises: 
Create Date: 2024-05-14 11:59:30.931482

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c411e7d7b6a1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=True),
    sa.Column('leader_id', sa.Integer(), nullable=True),
    sa.Column('activity_type', sa.String(length=20), nullable=True),
    sa.Column('members', sa.Integer(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('wins', sa.Integer(), nullable=True),
    sa.Column('total_distance', sa.Integer(), nullable=True),
    sa.Column('total_moving_time', sa.Integer(), nullable=True),
    sa.Column('average_speed', sa.Integer(), nullable=True),
    sa.Column('max_speed', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['leader_id'], ['users.id'], name=op.f('fk_teams_leader_id_users'), use_alter=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_teams')),
    sa.UniqueConstraint('name', name=op.f('uq_teams_name'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('strava_id', sa.Integer(), nullable=True),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('image', sa.String(length=200), nullable=True),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('bio', sa.String(length=200), nullable=True),
    sa.Column('city', sa.String(length=80), nullable=True),
    sa.Column('state', sa.String(length=80), nullable=True),
    sa.Column('country', sa.String(length=80), nullable=True),
    sa.Column('sex', sa.String(length=1), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('wins', sa.Integer(), nullable=True),
    sa.Column('FPcoins', sa.Integer(), nullable=True),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('last_online', sa.DateTime(), nullable=True),
    sa.Column('strava_connected', sa.Boolean(), nullable=True),
    sa.Column('strava_access_token', sa.String(), nullable=True),
    sa.Column('strava_refresh_token', sa.String(), nullable=True),
    sa.Column('strava_token_expiry', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], name=op.f('fk_users_team_id_teams')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('email', name=op.f('uq_users_email')),
    sa.UniqueConstraint('strava_id', name=op.f('uq_users_strava_id'))
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('qualified', sa.Boolean(), nullable=True),
    sa.Column('strava_id', sa.BigInteger(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('activity_type', sa.String(), nullable=True),
    sa.Column('distance', sa.Float(), nullable=True),
    sa.Column('moving_time', sa.Integer(), nullable=True),
    sa.Column('elapsed_time', sa.Integer(), nullable=True),
    sa.Column('total_elevation_gain', sa.Float(), nullable=True),
    sa.Column('start_date_local', sa.DateTime(), nullable=True),
    sa.Column('timezone', sa.String(), nullable=True),
    sa.Column('achievement_count', sa.Integer(), nullable=True),
    sa.Column('kudos_count', sa.Integer(), nullable=True),
    sa.Column('comment_count', sa.Integer(), nullable=True),
    sa.Column('average_speed', sa.Float(), nullable=True),
    sa.Column('max_speed', sa.Float(), nullable=True),
    sa.Column('average_heartrate', sa.Float(), nullable=True),
    sa.Column('max_heartrate', sa.Float(), nullable=True),
    sa.Column('elev_high', sa.Float(), nullable=True),
    sa.Column('elev_low', sa.Float(), nullable=True),
    sa.Column('pr_count', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_activities_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_activities'))
    )
    op.create_table('competitions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organizer_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('activity_type', sa.String(), nullable=False),
    sa.Column('prize_pool', sa.Integer(), nullable=False),
    sa.Column('distance', sa.Boolean(), nullable=False),
    sa.Column('average_speed', sa.Float(), nullable=True),
    sa.Column('max_speed', sa.Float(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('in_progress', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['organizer_id'], ['users.id'], name=op.f('fk_competitions_organizer_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_competitions')),
    sa.UniqueConstraint('title', name=op.f('uq_competitions_title'))
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=2000), nullable=False),
    sa.Column('read', sa.Boolean(), nullable=True),
    sa.Column('invitation', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], name=op.f('fk_messages_receiver_id_users')),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], name=op.f('fk_messages_sender_id_users')),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], name=op.f('fk_messages_team_id_teams')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_messages'))
    )
    op.create_table('competition_handlers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('competition_id', sa.Integer(), nullable=True),
    sa.Column('activity_type', sa.String(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('placement', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['competition_id'], ['competitions.id'], name=op.f('fk_competition_handlers_competition_id_competitions')),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], name=op.f('fk_competition_handlers_team_id_teams')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_competition_handlers_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_competition_handlers'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('competition_handlers')
    op.drop_table('messages')
    op.drop_table('competitions')
    op.drop_table('activities')
    op.drop_table('users')
    op.drop_table('teams')
    # ### end Alembic commands ###
