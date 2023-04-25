from flask import session, request
from flask_restful import Resource

from config import app, api, db
from models import User, Activity, Team, Message, Competition, CompetitionHandler
