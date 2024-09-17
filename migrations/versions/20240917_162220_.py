"""empty message

Revision ID: d4f2abff615a
Revises: 0c80efa34a7f
Create Date: 2024-09-17 16:22:20.290950

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4f2abff615a'
down_revision = '0c80efa34a7f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.alter_column('profile_image_url',
               existing_type=sa.VARCHAR(length=500),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('profile_image_url',
               existing_type=sa.VARCHAR(length=500),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    # ### end Alembic commands ###
