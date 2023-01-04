import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { authCalls } from '../../api/auth/auth';
import { useNavigate } from 'react-router-dom';



export const Navbar = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const logOut = () => {
    authCalls.logout();
    setLoginStatus(false)
    navigate('/');
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 bg-dark">
      <Link className="navbar-brand ms-4" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={logOut} to='/'>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
