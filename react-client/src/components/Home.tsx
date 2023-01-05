import React, {useEffect} from 'react';
import { Navbar } from './Navbar/Navbar';
import { nbaApiCalls } from '../api/nba';


export const Home = () => {
  const [west, setWest] = React.useState([{Team: 'Team Name', ConferenceRank: 0 , Record: '0-0'}]);
  const [east, setEast] = React.useState([{Team: 'Team Name', ConferenceRank: 0 , Record: '0-0'}]);
  const [games, setGames] = React.useState([{HomeTeam: 'HHH', AwayTeam: 'AAA', HomeScore: 0, AwayScore: 0}]);

  useEffect(() => {
    nbaApiCalls.getStandings().then((res) => {
      setWest(res.west);
      setEast(res.east);
    })}, []);

  //add games and were done

  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="text-center">Welcome to your home page! </h1>
      <div className="container w-50 mx-auto border border-secondary rounded">
        <h2 className="text-center">Today's Games</h2>
        <div className='d-flex flex-row my-3 '>
          <div className='mx-auto p-1 my-2'>
            <p>Home Team</p>
            <p>Away Team</p>
          </div>

          <div className='mx-auto p-1 my-2 '>
            <p>0</p>
            <p>0</p>
          </div>

        </div>
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
        console.log(team);
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
        console.log(team);
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
