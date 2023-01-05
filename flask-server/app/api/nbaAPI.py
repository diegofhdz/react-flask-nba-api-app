import requests as req
from dotenv import load_dotenv
import os
from flask import Blueprint, jsonify
import datetime
# from "flask-server/helpers.py" import login_required

load_dotenv()
#work on api routes
nba_api = Blueprint('nba_api', __name__, url_prefix='/api')
api_key = os.getenv('API_KEY')
west = []
east = []

standings_endpoint = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2023"
games_endpoint = "https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/2023-JAN-05"
headers = {'Ocp-Apim-Subscription-Key': f'{api_key}', 'Content-Type': 'application/json'}

def get_games():
    games = []
    all_games = {}
    today = datetime.date.today()
    date_string = today.strftime('%Y-%b-%d').upper()
    games_endpoint = f"https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{date_string}"
    resp = req.get(games_endpoint, headers=headers).json()
    
    for game in resp:

        game_dict = {}

        game_dict['AwayTeam'] = game['AwayTeam']
        game_dict['HomeTeam'] = game['HomeTeam']
        if game['HomeTeamScore'] == None:
            game_dict['HomeTeamScore'] = 0
            game_dict['AwayTeamScore'] = 0
        else:
            game_dict['HomeTeamScore'] = game['HomeTeamScore']
            game_dict['AwayTeamScore'] = game['AwayTeamScore']
        games.append(game_dict)
    all_games['games'] = games
    return all_games
print(get_games())



def get_standings():
    west = []
    east = []
    standings_dict = {}
    resp = req.get(standings_endpoint, headers=headers)
    
    for team in resp.json():
        team_dict = {}
        if team['Conference'] == 'Western':
            team_dict['Team'] = team['City'] + ' ' + team['Name']
            team_dict['ConferenceRank'] = team['ConferenceRank']
            team_dict['Record'] = str(team['Wins']) + '-' + str(team['Losses'])
            west.append(team_dict)
        else:
            team_dict['Team'] = team['City'] + ' ' + team['Name']
            team_dict['ConferenceRank'] = team['ConferenceRank']
            team_dict['Record'] = str(team['Wins']) + '-' + str(team['Losses'])
            east.append(team_dict)
        
    west = sorted(west, key=lambda k: k['ConferenceRank'])
    east = sorted(east, key=lambda k: k['ConferenceRank'])

    standings_dict['west'] = west
    standings_dict['east'] = east
    return standings_dict

# print(get_standings())
@nba_api.route('/standings')
# @login_required
def standings():
    return jsonify(get_standings())

@nba_api.route('/games')
# @login_required
def games():
    return jsonify(get_games())