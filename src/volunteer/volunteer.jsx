import React, { Component } from 'react';
import Calendar from 'dayz';
import moment from 'moment';
import { Col, Panel, Button, Modal } from "react-bootstrap";
import VolunteerForm from "./volunteerForm";

import Nav from "../nav";
import AuthContainer from "../authcontainer";

import './volunteer.css';
import 'dayz/dist/dayz.css';

class Volunteer extends Component {  
  constructor() {
    super();

    this.state = {
      request: null,
      events: new Calendar.EventsCollection([]),
      focusedDate: moment()
    }

    this.loadRequests = this.loadRequests.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleVolunteerClick = this.handleVolunteerClick.bind(this);
    this.handleCloseEventClick = this.handleCloseEventClick.bind(this);
  }

  loadRequests() {
    this.props.data.getRequests((requests) => {
      const events = requests.reduce((acc, e) => { 
        const meals = e.meals.map((m, i) => { return { request: e, meal: m, index: i }; });
        for (var idx in meals) {
          acc = acc.concat(meals[idx])
        }
        return acc;
      }, []);
      this.setState({
        events: new Calendar.EventsCollection(events.map(e => { 
          return {
            content: `${e.request.request_for[0].name} (${e.request.reason})`,
            requestId: e.request._id,
            index: e.index, 
            range: moment.range(moment(e.meal.eventDate), moment(e.meal.eventDate).add(1, 'days')),
            colorIndex: e.meal.volunteer ? 3 : 1
          };
        }))
      });
    });
  }  

  handleNextMonth() {
    this.setState({
      focusedDate: this.state.focusedDate.add(1, "month")
    })
  }

  handlePrevMonth() {
    this.setState({
      focusedDate: this.state.focusedDate.add(-1, "month")
    })
  }

  handleEventClick(e, event) {
    const { requestId, index } = event.attributes;
    this.props.data.getRequest(requestId, (data) => {
      this.setState({
        request: data,
        mealIndex: index
      })
    });
  }

  handleVolunteerClick(e, requestId, mealIndex) {
    this.props.data.volunteer(requestId, mealIndex, this.props.auth.userProfile.id, () => {
      this.loadRequests();
      this.setState({
        request: null
      });
    });    
  }

  handleCloseEventClick(e) {
    this.setState({
      request: null
    })
  }

  render() {
    const { focusedDate, request, mealIndex } = this.state;
    return (      
      <div className="volunteer">
        
        <Nav {...this.props} />
        <Col xs={12} md={6} mdOffset={3}>
          <AuthContainer {...this.props} onAuthenticated={this.loadRequests}>
            <Modal show={request && request != null} >
              <VolunteerForm request={request} mealIndex={mealIndex} onClose={this.handleCloseEventClick} onSubmit={this.handleVolunteerClick} />
            </Modal>
            <Panel header="Sign up to make and deliver a meal" >
              <Col xs={2} md={2}><Button className="prevMonth" onClick={this.handlePrevMonth}>{"<<"}</Button></Col>
              <Col xs={8} md={8}><h3 className="month">{focusedDate.format("MMMM YYYY")}</h3></Col>
              <Col xs={2} md={2}><Button className="nextMonth" onClick={this.handleNextMonth}>{">>"}</Button></Col>
              <Calendar display="month" date={focusedDate} events={this.state.events} onEventClick={this.handleEventClick}></Calendar>
            </Panel>
          </AuthContainer>
        </Col>
      </div>
    );
  }
}

export default Volunteer;
