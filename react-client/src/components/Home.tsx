import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';

export const Home = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      <h1 className="text-center">Welcome, here are todays games</h1>
    </div>
    </>
    
  )
}
