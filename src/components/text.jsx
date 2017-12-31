import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, Col } from "react-bootstrap";

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
    const { id, help, placeholder } = this.props;

    return (
      <FormGroup controlId={id}>
        <Col sm={10} xs={10} xsOffset={1} smOffset={1}>
          <FormControl value={value} {...this.props} placeholder={placeholder} onChange={this.handleInputChange} />
        </Col>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default Text;
