import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Register from "./register/register";

class AuthContainer extends Component {  
  login() {
    localStorage.setItem("return_url", window.location.pathname);
    this.props.auth.login();
  }

  componentWillMount() {
    this.setState({ 
      authenticated: false,
      profile: null,
      user: null 
    });

    const { isAuthenticated, userProfile, getProfile } = this.props.auth;
    const { getUserByOAuthId } = this.props.data;
    const authenticated = isAuthenticated();
    this.setState({...this.state, authenticated: authenticated, profile: userProfile});
    
    if (authenticated) {
      if (!userProfile) {
        getProfile(this.props.auth.getAccessToken(), (profile) => {
          getUserByOAuthId(profile.id, (user) => {
            this.setState({...this.state, user: user});
          });
        });
      }
      else {
        getUserByOAuthId(userProfile.id, (user) => {
          this.setState({...this.state, user: user});
        });
      }
    }
  }

  render() {
    const { authenticated, profile, user } = this.state;
    
    if (authenticated) {
      if (user) {
        return this.props.children;
      }
      else {
        return <Register {...this.props} profile={profile} />;
      }
    }
    else {
      return <div className="accessDenied">
        <h2>Please login</h2>
        <h4>To continue we need to know who you are.  Please login to continue using the site.</h4>
        <Button bsStyle="primary" className="btn-margin" onClick={this.login.bind(this)}>Log In</Button>
      </div>
    }
  }
}

export default AuthContainer;
