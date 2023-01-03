import React from 'react';
import ReactDOM from 'react-dom/client';
import { LoginPage } from './components/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

