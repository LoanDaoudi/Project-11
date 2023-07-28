import React from 'react';
import argentBankLogo from './img/argentBankLogo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../authAction';
import { Link } from 'react-router-dom';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username); // Ajoutez cette ligne pour récupérer le nom d'utilisateur
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const homepageURL = isAuthenticated ? '/' : '/login';

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={homepageURL}>
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <div>
            <span className="username"> {username}  </span>
            <a className="main-nav-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
