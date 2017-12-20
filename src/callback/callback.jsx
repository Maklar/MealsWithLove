import React, { Component } from 'react';
import loading from '../images/loading.svg';

import "./callback.css";

class Callback extends Component {
  render() {
    return (
      <div className="callback">
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;