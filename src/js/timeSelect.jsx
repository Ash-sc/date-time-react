import React from 'react';
import moment from 'moment';

export default class TimeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(props.date),
    };
  }

  render() {
    const {
      date,
    } = this.state;
    return (
      <div className="time-section-bg">
        <div className="hour-section">
          <span className="add-hour fa fa-chevron-up" />
          {date.format('HH')}
          <span className="reduce-hour fa fa-chevron-down" />
        </div>
        <div className="column-section">:</div>
        <div className="minute-section">
          <span className="add-min fa fa-chevron-up" />
          {date.format('mm')}
          <span className="reduce-min fa fa-chevron-down" />
        </div>
      </div>
    );
  }
}
