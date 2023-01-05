import requests as req
from dotenv import load_dotenv
import os
from flask import Blueprint, jsonify

load_dotenv()
#work on api routes
nba_api = Blueprint('nba_api', __name__, url_prefix='/api')
api_key = os.getenv('API_KEY')
west = []
east = []

standings_endpoint = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2023"
headers = {'Ocp-Apim-Subscription-Key': f'{api_key}', 'Content-Type': 'application/json'}


def get_standings():
    west = []
    east = []
    standings_dict = {}
    resp = req.get(standings_endpoint, headers=headers)

    for team in resp.json():
        if team['Conference'] == 'Western':
            west.append(team)
        else:
            east.append(team)
    west = sorted(west, key=lambda k: k['ConferenceRank'])
    east = sorted(east, key=lambda k: k['ConferenceRank'])
    standings_dict['west'] = west
    standings_dict['east'] = east
    return standings_dict

@nba_api.route('/standings')
def standings():
    return jsonify(get_standings())





