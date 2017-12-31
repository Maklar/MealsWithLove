import React, { Component } from 'react';
import Nav from "../nav";
import AuthContainer from "../authcontainer";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Col, ListGroup, ListGroupItem } from "react-bootstrap";

class List extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      newItem: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleDeleteFromList = this.handleDeleteFromList.bind(this);
  }

  getValue() {
      return this.state.items;
  }

  handleInputChange(event) {    
    this.setState({
      newItem: event.target.value
    })
  }

  handleDeleteFromList(event) {
    const { items } = this.state;
       
    var newItems = this.state.items.filter(e => e !== event.target.innerText);
    this.setState({
        items: newItems
    });
    
    if (this.props.onChange) {
        this.props.onChange(event, newItems);
    }
  }

  handleAddToList(event) {
    const { items, newItem } = this.state;
    if (newItem) {
      const newItems = items.concat(newItem);
      this.setState({
        items : newItems,
        newItem: null
      })

      if (this.props.onChange) {
        this.props.onChange(event, newItems);
      }
    }
  }

  render() {
    const { items, newItem } = this.state;
    const { id, help, label, addlabel, placeholder } = this.props;

    return (
      <FormGroup controlId={id}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={8}>
          <ListGroup>
            {items.map(e => <ListGroupItem bsStyle="warning" key={e} onClick={this.handleDeleteFromList}>{e}</ListGroupItem>)}
          </ListGroup>
        </Col>
        {help && <HelpBlock>{help}</HelpBlock>}
    
        <Col sm={6} smOffset={2}>
          <FormControl type="text" placeholder={placeholder} value={newItem || ""} onChange={this.handleInputChange} />
        </Col>
        <Col sm={2}>
          <Button onClick={this.handleAddToList} {...this.props}>{addlabel}</Button>
        </Col>
      </FormGroup>
    );
  }
}

export default List;
