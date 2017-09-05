import React from 'react';
import CommonFn from './commonFn';
import moment from 'moment';

export default class CalendarSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'day',
      currentYear: parseInt(props.calendarMonth.split('-')[0], 10),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.showCalendar && this.props.showCalendar) {
      this.setState({
        viewMode: 'day',
      })
    }
  }

  // 日期是否可用
  isDateEnable(date) {
    const { minDate, maxDate } = this.props;
    return date >= minDate && date <= maxDate;
  }

  // 选择日期
  selectDate(date) {
    if (this.isDateEnable(date)) {
      this.props.selectDate(date);
    }
  }

  //左右月份年份icon
  yearMonthChange(type, unit) {
    let { viewMode, currentYear } = this.state;
    if (viewMode === 'day') {
      this.props.calendarChange(type, unit);
    } else {
      this.setState({
        currentYear: currentYear + (type < 0 ? -12 : 12),
      });
    }
  }

  // 视图修改
  changeView(type) {
    this.state.viewMode !== type && this.setState({
      viewMode: type,
    });
  }

  // 选择月份
  changeMonthOrYear(val, unit) {
    const type = unit === 'month' ?
      val - moment(this.props.calendarMonth).month()
      : this.state.currentYear + val - parseInt(this.props.calendarMonth.split('-')[0], 10);
    this.props.calendarChange(type, unit);
    this.setState({
      viewMode: 'day',
    });
  }

  render() {
    const {
      calendarMonth,
      date,
      className,
      lang,
    } = this.props;
    const {
      viewMode,
      currentYear,
    } = this.state;
    const weekdays = lang === 'zh-cn' ?
      ['日', '一', '二', '三', '四', '五', '六']
      : ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat'];
    const monthList = lang === 'zh-cn' ?
      ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const isCurrentMonth = calendarMonth === CommonFn.ym();
    const yearList = new Array(16).fill(0);
    return (
      <div className={className}>
        <div className="header-section">
          {viewMode !== 'month' &&
            <span className="prev-year fa fa-backward" onClick={() => this.yearMonthChange(-1, 'year')} />
          }
          {viewMode === 'day' &&
            <span className="prev-month fa fa-caret-left" onClick={() => this.yearMonthChange(-1, 'month')} />
          }
          {viewMode === 'day' &&
            <span className="next-month fa fa-caret-right" onClick={() => this.yearMonthChange(1, 'month')} />
          }
          {viewMode !== 'month' &&
            <span className="next-year fa fa-forward" onClick={() => this.yearMonthChange(1, 'year')} />
          }
          <span className="year-selector">
            <span className="current" onClick={() => this.changeView('year')}>
              {calendarMonth.split('-')[0]}{lang === 'zh-cn' && '年'}
            </span>
          </span>
          <span className="month-selector">
            <span className="current" onClick={() => this.changeView('month')}>
              {calendarMonth.split('-')[1]}{lang === 'zh-cn' && '月'}
            </span>
          </span>
        </div>
        <div className="calender-section">
          {viewMode === 'day' && weekdays.map((day, key) =>
            <div
              key={key}
              className="date-weekday"
            >{day}</div>
          )}
          {viewMode === 'day' && CommonFn.calendarArray(calendarMonth).map((item, key) =>
            <div
              key={key}
              className={`date-item ${date && CommonFn.ymd(date) === item ? 'selected' : ''} ${item.indexOf(calendarMonth) !== 0 ? 'not-current-month' : ''} ${isCurrentMonth && CommonFn.ymd() === item ? 'current-day' : '' }`}
              onClick={() => this.selectDate(item)}
            >{item.split('-')[2]}</div>
          )}
          {viewMode === 'month' && monthList.map((month, key) =>
            <div
              key={key}
              className="month-item"
              onClick={() => this.changeMonthOrYear(key, 'month')}
            >
              {month}
            </div>
          )}
          {viewMode === 'year' && monthList.map((month, key) =>
            <div
              key={key}
              className="month-item"
              onClick={() => this.changeMonthOrYear(key, 'year')}
            >
              {currentYear + key}
            </div>
          )}
        </div>
      </div>
    );
  }
}
