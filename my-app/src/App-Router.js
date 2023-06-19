import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Componants/index';
import SignInPage from './Componants/sign-in';
import UserPage from './Componants/user';

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
