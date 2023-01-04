import React from 'react';
import { Navbar } from '../components/Navbar';

export const NotFound = () => {
  return (
    <>
    <h1>404: Page not found</h1>
    <a href="/"><button className='btn btn-primary btn-block mt-3'>Return to login</button></a>
    </>
    
  )
}