import React from 'react';
import moment from 'moment';

export default class TimeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
    });
  }

  changeTime(type, value) {
    const { date } = this.state;
    let val = parseInt(date.format(type === 'hour' ? 'HH' : 'mm'), 10) + value;
    if ((val === 60 && type === 'minute') || (val === 24 && type === 'hour')) {
      val = '00';
    } else if (val === -1) {
      val = type === 'hour' ? '23' : '59';
    }
    this.setState({
      date: moment(date).set(type, val),
    },() => this.props.selectTime(this.state.date));
  }

  render() {
    const {
      date,
    } = this.state;
    const {
      lang,
      onOk,
    } = this.props;
    return (
      <div className="time-section-bg">
        <div className="hour-section">
          <span className="add-hour fa fa-chevron-up" onClick={() => this.changeTime('hour', 1)} />
          {date.format('HH')}
          <span className="reduce-hour fa fa-chevron-down" onClick={() => this.changeTime('hour', -1)} />
        </div>
        <div className="column-section">:</div>
        <div className="minute-section">
          <span className="add-min fa fa-chevron-up" onClick={() => this.changeTime('minute', 1)} />
          {date.format('mm')}
          <span className="reduce-min fa fa-chevron-down" onClick={() => this.changeTime('minute', -1)} />
        </div>
        <button onClick={onOk} className="confirm-btn">{lang === 'zh-cn' ? '确 定' : 'OK'}</button>
      </div>
    );
  }
}
