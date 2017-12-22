import React, { Component } from 'react';
import Nav from "../nav";
import AuthContainer from "../authcontainer";

import './request.css';

class Request extends Component {
  render() {
    const authenticated = this.props.auth.isAuthenticated();

    return (
      <div className="request">
        <Nav {...this.props} />
        <AuthContainer {...this.props}>
          <div>Request Form!</div>
        </AuthContainer>        
      </div>
    );
  }
}

export default Request;
