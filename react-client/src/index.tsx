import React, {useContext, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { LoginPage } from './components/LoginPage';
import { Profile } from './components/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components';
import 'bootstrap/dist/css/bootstrap.css';

const isAuthed = createContext(false);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <isAuthed.Provider value={false}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </isAuthed.Provider>
  </React.StrictMode>
);

