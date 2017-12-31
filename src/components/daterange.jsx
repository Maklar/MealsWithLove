import React, { Component } from 'react';
import Nav from "../nav";
import AuthContainer from "../authcontainer";
import { FormGroup, ControlLabel, HelpBlock, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";

class DateRange extends Component {
  constructor() {
    super();

    this.state = {
      focusedInput: 'startDate',
      startDate: null,
      endDate: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleInputChange(dates) {
    this.setState(dates, () => { 
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  handleFocusChange(focusedInput) {
    this.setState({
      focusedInput: this.state.focusedInput == "startDate" ? "endDate" : "startDate"
    });
  }

  handleValidate(startDate, endDate) {
    if (!moment.isMoment(startDate) || !moment.isMoment(endDate)) return false;
    if (endDate.diff(startDate, "days") > 5) return false;
    if (endDate.diff(startDate, "days") < 0) return false;
    return true;
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { id, help, label, options, placeholder, events } = this.props;

    let eventList = null;
    if (events) {
      eventList = (
        <Col sm={4}>
          <ListGroup>
            {events.map(e => <ListGroupItem bsStyle="info" key={e.eventDate}>{e.eventDate.format("L")}</ListGroupItem>)}
          </ListGroup>
        </Col>);
    }
    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={4}>
          <DayPickerRangeController startDate={startDate} endDate={endDate} onDatesChange={this.handleInputChange} focusedInput={focusedInput} onFocusChange={this.handleFocusChange} isOutsideRange={this.handleValidate} />
        </Col>
        {eventList}
        {help && <HelpBlock>{help}</HelpBlock>}

      </FormGroup>
    );
  }
}

export default DateRange;
