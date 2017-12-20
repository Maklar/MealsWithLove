import React, { Component } from 'react';
import Nav from "../nav";

import './request.css';

class Request extends Component {  
  render() {
    return (
      <div className="request">
        <Nav {...this.props} />       
      </div>
    );
  }
}

export default Request;
