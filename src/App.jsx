import React, { Component } from 'react';
import Nav from "./nav";

import './App.css';

class App extends Component {
  render() {
    return (      
      <Nav {...this.props} />
    );
  }
}

export default App;
