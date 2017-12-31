import React, { Component } from 'react';
import Nav from "../nav";
import AuthContainer from "../authcontainer";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from "react-bootstrap";

class Text extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {    
    this.setState({
      value: event.target.value
    })
    if (this.props.onChange) {
        this.props.onChange(event, event.target.value);
    }
  }

  render() {
    const { value } = this.state;
    const { id, help, label, placeholder } = this.props;

    return (
      <FormGroup controlId={id}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={8}>
          <FormControl value={value} {...this.props} placeholder={placeholder} onChange={this.handleInputChange} />
        </Col>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default Text;
