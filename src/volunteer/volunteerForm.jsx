import React, { Component } from 'react';
import { Col, Panel, Button, Modal } from "react-bootstrap";

import './volunteerForm.css';

class VolunteerForm extends Component {  
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(e) {
    const { request, mealIndex } = this.props;
    this.props.onSubmit(e, request._id, mealIndex);
  }

  handleClose(e) {
    this.props.onClose(e);
  }

  render() {
    const { request } = this.props;
    if (!request) {
        return null;
    }
    
    return (
      <div>
          <Panel header="Volunteer to cook a meal for ...">
            {request.request_for[0].name}
          </Panel>
          <Button onClick={this.handleSubmit}>Volunteer</Button>
          <Button onClick={this.handleClose}>Close</Button>
      </div>
    );
  }
}

export default VolunteerForm;