import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import Volunteer from "./volunteer/volunteer";
import Home from "./home/home";
import Request from "./request/request";
import Callback from "./callback/callback";
import Auth from "./services/auth";
import App from "./App";
import history from "./history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = () => (
  <Router history={history}>
    
    <div>
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/request" render={(props) => <Request auth={auth} {...props} />} />
      <Route path="/volunteer" render={(props) => <Volunteer auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }} />
    </div>
  </Router>
)

export default new Routes()