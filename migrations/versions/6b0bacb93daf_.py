"""empty message

Revision ID: 6b0bacb93daf
Revises: 14a4b81873cf
Create Date: 2020-05-24 20:11:00.473298

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b0bacb93daf'
down_revision = '14a4b81873cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('photo', sa.String(length=120), nullable=True),
    sa.Column('caption', sa.String(length=120), nullable=True),
    sa.Column('created_on', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    # ### end Alembic commands ###
