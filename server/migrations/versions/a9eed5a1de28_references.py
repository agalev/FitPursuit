"""references

Revision ID: a9eed5a1de28
Revises: a9bc54ffd86f
Create Date: 2023-05-31 12:25:09.374336

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9eed5a1de28'
down_revision = 'a9bc54ffd86f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teams', schema=None) as batch_op:
        batch_op.add_column(sa.Column('leader_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_teams_leader_id_users'), 'users', ['leader_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('team_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_users_team_id_teams'), 'teams', ['team_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_users_team_id_teams'), type_='foreignkey')
        batch_op.drop_column('team_id')

    with op.batch_alter_table('teams', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_teams_leader_id_users'), type_='foreignkey')
        batch_op.drop_column('leader_id')

    # ### end Alembic commands ###
