"""added access/refresh token columns to user

Revision ID: c55160104b71
Revises: 633eb65f3205
Create Date: 2023-04-28 13:01:32.258652

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c55160104b71'
down_revision = '633eb65f3205'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.drop_column('start_latlng')
        batch_op.drop_column('end_latlng')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('end_latlng', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('start_latlng', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
