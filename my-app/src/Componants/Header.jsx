import React from 'react';
import argentBankLogo from './img/argentBankLogo.png';
import { useDispatch } from 'react-redux';
import { signOut } from '../authAction';

function Header({ isAuthenticated, isUserPage }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href={isUserPage ? './' : './login'}>
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isAuthenticated ? (
          <a className="main-nav-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        ) : (
          <a className="main-nav-item" href="./login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

export default Header;
