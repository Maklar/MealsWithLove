import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

class Nav extends Component {  
  goTo(route) {
    this.props.history.replace(`/${route}`); 
  }

  login() {
    localStorage.setItem("return_url", window.location.pathname);
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (      
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-4">
        <Button bsStyle="primary" className="btn-margin" onClick={this.goTo.bind(this, 'home')}>Meals with Love</Button>
        { 
          !isAuthenticated() ?
            (<Button bsStyle="primary" className="btn-margin" onClick={this.login.bind(this)}>Log In</Button>) :
            (<Button bsStyle="primary" className="btn-margin" onClick={this.logout.bind(this)}>Log Out</Button>)
        }
      </nav>
    );
  }
}

export default Nav;
