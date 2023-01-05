import React, {useEffect} from 'react';
import { Navbar } from './Navbar/Navbar';
import { nbaApiCalls } from '../api/nba';


export const Home = () => {
  const [west, setWest] = React.useState([{Team: 'Team Name', ConferenceRank: 0 , Record: '0-0'}]);
  const [east, setEast] = React.useState([{Team: 'Team Name', ConferenceRank: 0 , Record: '0-0'}]);
  const [games, setGames] = React.useState([{HomeTeam: 'HHH', AwayTeam: 'AAA', HomeTeamScore: 0, AwayTeamScore: 0}]);

  useEffect(() => {
    nbaApiCalls.getStandings().then((res) => {
      setWest(res.west);
      setEast(res.east);
    })}, []);

  useEffect(() => {
    nbaApiCalls.getGames().then((res) => {
      setGames(res.games);
    })
  }, []);


  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="text-center p-3">Welcome to your home page! </h1>
      <div className="container w-50 mx-auto border border-secondary rounded my-5">
        <h2 className="text-center p-3">Today's Games</h2>
        
          {games.map((game) => { 
            return (
              <div className='d-flex flex-row my-3 border'>
                <div className='mx-auto p-1 my-2'>
                  <p className='text-primary'>Home: {game.HomeTeam}</p>
                  <p className='text-secondary'>Away : {game.AwayTeam}</p>
                </div>

                <div className='mx-auto p-1 my-2 '>
                  <p>{game.HomeTeamScore}</p>
                  <p>{game.AwayTeamScore}</p>
                </div>
              </div>
          )
          })}
        </div>
      
      <div className='container d-flex justify-content-around'>
      <div className='w-50'>
      <h2>Western Standings</h2>
      <table className="table table-striped">
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Record</th>
        </tr>
      <tbody>
      {west.map((team) => {
        return (
          <tr>
            <td>{team.ConferenceRank}</td>
            <td>{team.Team}</td>
            <td>{team.Record}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
      </div>

      <div className='w-50'>
      <h2>Eastern Standings</h2>
      <table className="table table-striped">
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Record</th>
        </tr>
      <tbody>
      {east.map((team) => {
        return (
          <tr>
            <td>{team.ConferenceRank}</td>
            <td>{team.Team}</td>
            <td>{team.Record}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
      </div>
    </div>
    </div>
    </>
    
  )
}
