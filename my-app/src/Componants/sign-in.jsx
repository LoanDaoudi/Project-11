import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../authAction';
import { yourReduxAction } from '../authAction';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: ''
  });

  useEffect(() => {
    dispatch(yourReduxAction(userData));
  }, [userData, dispatch]);
  
  

  const handleSignIn = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/v1/user/login', {
        email: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.body.token;
          console.log(response);
          setUsername('');
          setPassword('');
          setError('');

          localStorage.setItem('token', token);

          dispatch(signIn(token));

          axios
          .post('http://localhost:3001/api/v1/user/signup', {
            email: username,
            password: password,
            firstName: '',
            lastName: '',
            userName: ''
          })
          .then(response => {
            console.log(response.data);
            setUserData(response.data);


            dispatch(yourReduxAction(userData));
          })
          .catch(error => {
            setError('Error: User not found!');
          });

        navigate('/profile');
      } else {
       
      }
    })
    .catch(error => {
      setError('Error: User not found!');
    });
};

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Argent Bank - Home Page</title>
        <link rel="stylesheet" href="./css/main.css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <Header />
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
              <div className="input-wrapper">
              <label htmlFor="email">Email</label>           
              <input
                type="text"
                id="email"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default SignInPage;
