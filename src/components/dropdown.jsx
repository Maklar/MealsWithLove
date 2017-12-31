import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from "react-bootstrap";

class DropDown extends Component {
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
    const { id, help, label, options, placeholder } = this.props;

    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={1} xs={1}>
          {label}
        </Col>
        <Col sm={10} xs={10}>
          <FormControl id={id} componentClass="select" placeholder={placeholder} {...this.props} onChange={this.handleInputChange}>
            {options.map((e) => <option value={e.value} key={e.value}>{e.text}</option>)}          
          </FormControl>
        </Col>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default DropDown;
