import React, { Component } from 'react';
import Nav from "../nav";
import List from "../components/list";
import Text from "../components/text";
import DropDown from "../components/dropdown";
import DateRange from "../components/daterange";
import AuthContainer from "../authcontainer";
import { Form, FormGroup, Button, Panel, Col } from "react-bootstrap";

import './request.css';

class Request extends Component {
  constructor() {
    super();

    this.state = {
      request_for: {
        name: null,
        address: null,
        email: null,
        home_phone: null,
        cell_phone: null,
        best_contact_method: "email",
        food_allergies: []
      },
      meals: [],
      reason: "illness",
      reason_other: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event, val) {
    const name = event.target.id;
    const sub = event.target.attributes["sub"] && event.target.attributes["sub"].value;

    if (sub) {
      this.setState({ 
        [sub]: {
          ...this.state[sub], 
          [name]: val 
        }
      });
    }
    else {
      this.setState({
          [name]: val
      })
    }
  }

  handleDateInputChange(event) {
    if (event.startDate && event.endDate) {
      const numDays = event.endDate.diff(event.startDate, 'days')+1;
      console.log(event);
    
      let meals = [{ eventDate: event.startDate.clone() }];
      let currDay = 1;
      while (currDay < numDays) {
        meals = meals.concat({ 
          eventDate: event.startDate.clone().add(currDay, "days")          
        })
        currDay++;
      }

      this.setState({
        meals: meals
      });
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if (document.activeElement.attributes["type"] === "submit") {
      this.props.data.createNewRequest(this.state, () => {
        this.props.history.replace(`/home`);
      });      
    }
  }

  render() {
    const { best_contact_method } = this.state.request_for;
    const { meals } = this.state;

    const contactMethods = 
    [{ text: "Email", value: "email" },
     { text: "Home Phone", value: "home phone" },
     { text: "Cell Phone", value: "cell phone" },
     { text: "Facebook", value: "facebook" }];

    const reasons = 
    [{ text: "Illness", value: "illness" },
     { text: "Death in the family", value: "death"},
     { text: "New Arrival", value: "birth"},
     { text: "Other", value: "other"}]
    
    let contact=null;
    switch (best_contact_method) {
      case "email":
        contact = <Text id="email" label="Email" placeholder="Email (johndoe@bogus.com)" type="email" sub="request_for" onChange={this.handleInputChange} />
        break;
      case "home phone":
        contact = <Text id="home_phone" label="Home Phone" placeholder="Home Phone (111-222-3333)" type="phone" sub="request_for" onChange={this.handleInputChange} />
        break;
      case "cell phone":
        contact = <Text id="cell_phone" label="Cell Phone" placeholder="Cell Phone (111-222-3333)" type="phone" sub="request_for" onChange={this.handleInputChange} />
        break;
      default:
        break;
    }
    return (
      <div className="request">
        <Nav {...this.props} />
        <AuthContainer {...this.props}>
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal onSubmit={this.handleOnSubmit}>
              <Panel header="Request meal(s) for someone who could use a little help">
                
                <Text id="name" label="Request a meal for" placeholder="Name (first and last)" sub="request_for" onChange={this.handleInputChange} />
                <Text id="address" label="Deliver meals to" placeholder="Address" sub="request_for" onChange={this.handleInputChange} />
                <DropDown id="best_contact_method" label="Best Contact Method" placeholder="Select" options={contactMethods} sub="request_for" onChange={this.handleInputChange} />
                {contact}
                <List id="food_allergies" label="Food Allergies" addlabel="Add Food Allergy" placeholder="Allergy" sub="request_for" onChange={this.handleInputChange}/>
                <hr />
                <DropDown id="reason" label="Reason for Request" placeholder="Select" options={reasons} onChange={this.handleInputChange} />
                <DateRange id="meal_dates" label="Dates for meals:" events={meals} onChange={this.handleDateInputChange} />
                
                <Button type="submit">Submit</Button>
              </Panel>
            </Form>
          </Col>
        </AuthContainer>        
      </div>
    );
  }
}

export default Request;
