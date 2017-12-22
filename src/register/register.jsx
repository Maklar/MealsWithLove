import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from "react-bootstrap";

import './register.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Register extends Component {
  constructor() {
    super();

    this.state = {
        first_name: null,
        last_name: null,
        email: null,
        home_phone: null,
        cell_phone: null,
        best_contact_method: "email"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.id;

    this.setState({
        [name]: event.target.value
    })
  }

  handleOnSubmit(event) {
      console.log(this.state);
      this.props.data.createUserWithOAuthId({...this.state, oauth_id: this.props.profile.id});
      event.preventDefault();
  }

  render() {
    return (
      <div className="register">
        <h2>Please tell us a little more about yourself</h2>
        <form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <FieldGroup id="first_name" label="First Name" placeholder="John" onChange={this.handleInputChange} />
            <FieldGroup id="last_name" label="Last Name" placeholder="Doe" onChange={this.handleInputChange} />
            <FieldGroup id="email" label="Email" placeholder="john_doe@email.com" onChange={this.handleInputChange} />
            <FieldGroup id="home_phone" label="Phone" placeholder="111-222-3333" onChange={this.handleInputChange} />
            <FieldGroup id="cell_phone" label="Cell Phone" placeholder="111-222-3334" onChange={this.handleInputChange} />
            <FormGroup id="best_contact_method">
              <ControlLabel>Best Contact Method</ControlLabel>
              <FormControl id="best_contact_method" componentClass="select" placeholder="select" onChange={this.handleInputChange}>
                <option value="email">Email</option>
                <option value="home phone">Home Phone</option>
                <option value="cell phone">Cell Phone</option>
                <option value="facebook">Facebook</option>
              </FormControl>
              <Button type="submit">Submit</Button>
            </FormGroup>
          </FormGroup>
        </form>        
      </div>
    );
  }
}

export default Register;
