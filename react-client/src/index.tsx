import React from 'react';
import ReactDOM from 'react-dom/client';
import { LoginPage } from './components/LoginPage';
import { Profile } from './components/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components';
import 'bootstrap/dist/css/bootstrap.css';
import { Home } from './components/Home';
import { Register } from './components/Register';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.0/js/bootstrap.min.js"></script>
  </React.StrictMode>
);

