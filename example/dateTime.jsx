import React from 'react';
import DateTimePicker from '../src/js/index';

export default class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOne: '',
      timeTwo: '',
    }
  }

  render() {
    return(
      <div>
        <div className="zh-cn-input">
          <DateTimePicker
            lang="zh-cn"
            placeholder="年-月-日 时:分"
            format="YYYY-MM-DD HH:mm"
            date={this.state.timeOne}
            changeDate={date => this.setState({ timeOne: date })}
            needTime
          />
        </div>
        <div className="en-input">
          <DateTimePicker
            date={this.state.timeTwo}
            changeDate={date => this.setState({ timeTwo: date })}
          />
        </div>
      </div>
    );
  }
}
