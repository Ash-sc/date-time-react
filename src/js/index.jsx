import React from 'react';
import moment from 'moment';
import CommonFn from './commonFn';
import CalendarSelect from './calendarSelect';
import TimeSelect from './timeSelect';
import 'font-awesome/css/font-awesome.css';
import '../assets/style/main.css';

export default class DateRange extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      format: props.format || 'x', // 日期格式
      date: moment(props.date || undefined),
      minDate: CommonFn.ymd(props.minDate || '1900-01-01'),
      maxDate: CommonFn.ymd(props.maxDate || '2200-01-01'),
      yearMonth: CommonFn.ym(props.date), // 默认开始月份
      showCalendar: false, // 是否显示日历
      placeholder: props.placeholder || `YYYY-MM-DD${props.needTime ? ' HH:mm' : ''}`,
      lang: props.lang === 'zh-cn' ? 'zh-cn' : 'en',
      needTime: props.needTime || false,
    };

    this.dateCallback = this.dateCallback.bind(this);
  }

  // 显示、隐藏日历
  dateSectionDisplay(type) {
    const { showCalendar } = this.state;
    if (showCalendar !== (type === 'show')) {
      this.setState({
        showCalendar: type === 'show',
      });
    }
  }

  // 修改日历显示的年月
  calendarChange(type, unit) {
    this.setState({
      yearMonth: moment(this.state.yearMonth).add(type, unit).format('YYYY-MM'),
    });
  }

  // 点击日历日期，选择日期
  selectDate(val) {
    const { date, needTime } = this.state;
    const yearMonthDayArr = val.split('-');
    this.setState({
      date: moment(date).set({
        year: parseInt(yearMonthDayArr[0], 10),
        month: parseInt(yearMonthDayArr[1], 10) - 1,
        date: parseInt(yearMonthDayArr[2], 10),
      }),
    }, () => {
      !needTime && this.dateCallback();
    });
  }

  // 点击日历时间，选择时间
  selectTime(date) {
    this.setState({
      date,
    });
  }

  // 回调组件外部方法，传出修改
  dateCallback() {
    const { changeDate, format } = this.props;
    const { date } = this.state;
    changeDate && changeDate(moment(date).set('millisecond', 0).format(format));
    this.setState({
      showCalendar: false,
    });
  }

  render() {
    const {
      minDate,
      maxDate,
      date,
      yearMonth,
      showCalendar,
      placeholder,
      lang,
      needTime
    } = this.state;

    const formatDate = this.props.date ? moment(this.props.date).format(needTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD') : '';

    return (
      <div className="date-range-body">
        <div
          className="input-section"
          onClick={() => this.dateSectionDisplay('show')}
        >
          <input type="text" className="time-input" value={formatDate} placeholder={placeholder} />
        </div>

        <div
          className={`date-section ${showCalendar && 'date-section-show'}`}
        >
          <CalendarSelect
            className="date-select-section"
            calendarMonth={yearMonth}
            date={date.format('YYYY-MM-DD')}
            minDate={minDate}
            maxDate={maxDate}
            lang={lang}
            showCalendar={showCalendar}
            selectDate={item => this.selectDate(item)}
            calendarChange={(type, unit) => this.calendarChange(type, unit, 'start')}
          />
        </div>
        <div
          className={`time-section ${showCalendar && needTime ? ' time-section-show' : ''}`}
        >
          <TimeSelect
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            selectTime={item => this.selectTime(item)}
            lang={lang}
            onOk={() => this.dateCallback()}
          />
        </div>
        {showCalendar &&
        <div className="bg-for-close" onClick={() => this.dateSectionDisplay('hide')} />
        }
      </div>
    );
  }
}
