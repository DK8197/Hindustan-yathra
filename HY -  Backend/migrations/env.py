from flask import current_app
from flask_migrate import Migrate
from sqlalchemy import engine_from_config, pool
from logging.config import fileConfig
import logging
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from app import db

config = current_app.extensions['migrate'].migrate_command
