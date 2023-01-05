import React from 'react'

export const nbaApiCalls = {
  getStandings: async () => {
  const response =  await fetch('/api/standings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  return await response.json()
},
  getGames: async () => {
    const response = await fetch('/api/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    return await response.json();
  }
}
