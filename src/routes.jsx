import React from 'react';
import { Router, Route } from 'react-router-dom';
import Volunteer from "./volunteer/volunteer";
import Home from "./home/home";
import Request from "./request/request";
import Callback from "./callback/callback";
import Auth from "./services/auth";
import Data from "./services/data";
import history from "./history";

const auth = new Auth();
const data = new Data();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication((token) => { data.setAuthToken(token); });
  }
}

const Routes = () => (
  <Router history={history}>
    
    <div>
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/request" render={(props) => <Request auth={auth} data={data} {...props} />} />
      <Route path="/volunteer" render={(props) => <Volunteer auth={auth} data={data} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }} />
    </div>
  </Router>
)

export default new Routes()