import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Componants/HomePage';
import LoginPage from './Componants/Sign-in';
import UserPage from './Componants/User';


const App = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </Router>
    );
  };
  
  export default App;