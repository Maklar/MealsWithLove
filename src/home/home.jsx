import React, { Component } from 'react';
import Nav from "../nav";

import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">      
        <Nav {...this.props} />
        <div className="main">
          <div className="container">
            <div className="row">
              <h3>By this all men will know that you are My disciples, if you love one another.  - John 13:35</h3>
              <h1>Meals With Love</h1>
              <h4>A platform to help us provide for each other.</h4>
              <a className="btn btn-outline-primary" href="/request">Request a meal</a>
              <a className="btn btn-outline-secondary" href="/volunteer">Volunteer</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
