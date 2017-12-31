import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, HelpBlock, Button, Col, ListGroup, ListGroupItem } from "react-bootstrap";

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
    this.handleKeyUp = this.handleKeyUp.bind(this);
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
       
    var newItems = items.filter(e => e !== event.target.innerText);
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

  handleKeyUp(event) {
    if (event.key === "Enter") {
      this.handleAddToList(event);
    }
  }

  render() {
    const { items, newItem } = this.state;
    const { id, help, addlabel, placeholder } = this.props;

    return (
      <FormGroup controlId={id}>
        <Col sm={10} xs={10} xsOffset={1}>
          <ListGroup>
            {items.map(e => <ListGroupItem bsStyle="warning" key={e} onClick={this.handleDeleteFromList}>{e}</ListGroupItem>)}
          </ListGroup>
        </Col>
        {help && <HelpBlock>{help}</HelpBlock>}
    
        <Col sm={10} xs={10} xsOffset={1}>
          <FormControl type="text" placeholder={placeholder} value={newItem || ""} onChange={this.handleInputChange} onKeyUp={this.handleKeyUp} />
          <InputGroup>
            <InputGroup.Button><Button onClick={this.handleAddToList} {...this.props}>{addlabel}</Button></InputGroup.Button>
          </InputGroup>
        </Col>
      </FormGroup>
    );
  }
}

export default List;
