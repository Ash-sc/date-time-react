'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _commonFn = require('./commonFn');

var _commonFn2 = _interopRequireDefault(_commonFn);

var _calendarSelect = require('./calendarSelect');

var _calendarSelect2 = _interopRequireDefault(_calendarSelect);

var _timeSelect = require('./timeSelect');

var _timeSelect2 = _interopRequireDefault(_timeSelect);

require('font-awesome/css/font-awesome.css');

require('../assets/style/main.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange(props) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props));

    _this.state = {
      format: props.format || 'x', // 日期格式
      date: (0, _moment2.default)(props.date || undefined),
      minDate: _commonFn2.default.ymd(props.minDate || '1900-01-01'),
      maxDate: _commonFn2.default.ymd(props.maxDate || '2200-01-01'),
      yearMonth: _commonFn2.default.ym(props.date), // 默认开始月份
      showCalendar: false, // 是否显示日历
      placeholder: props.placeholder || 'YYYY-MM-DD' + (props.needTime ? ' HH:mm' : ''),
      lang: props.lang === 'zh-cn' ? 'zh-cn' : 'en',
      needTime: props.needTime || false
    };

    _this.dateCallback = _this.dateCallback.bind(_this);
    return _this;
  }

  // 显示、隐藏日历


  _createClass(DateRange, [{
    key: 'dateSectionDisplay',
    value: function dateSectionDisplay(type) {
      var showCalendar = this.state.showCalendar;

      if (showCalendar !== (type === 'show')) {
        this.setState({
          showCalendar: type === 'show'
        });
      }
    }

    // 修改日历显示的年月

  }, {
    key: 'calendarChange',
    value: function calendarChange(type, unit) {
      this.setState({
        yearMonth: (0, _moment2.default)(this.state.yearMonth).add(type, unit).format('YYYY-MM')
      });
    }

    // 点击日历日期，选择日期

  }, {
    key: 'selectDate',
    value: function selectDate(val) {
      var _this2 = this;

      var _state = this.state,
          date = _state.date,
          needTime = _state.needTime;

      var yearMonthDayArr = val.split('-');
      this.setState({
        date: (0, _moment2.default)(date).set({
          year: parseInt(yearMonthDayArr[0], 10),
          month: parseInt(yearMonthDayArr[1], 10) - 1,
          date: parseInt(yearMonthDayArr[2], 10)
        })
      }, function () {
        !needTime && _this2.dateCallback();
      });
    }

    // 点击日历时间，选择时间

  }, {
    key: 'selectTime',
    value: function selectTime(date) {
      this.setState({
        date: date
      });
    }

    // 回调组件外部方法，传出修改

  }, {
    key: 'dateCallback',
    value: function dateCallback() {
      var _props = this.props,
          changeDate = _props.changeDate,
          format = _props.format;
      var date = this.state.date;

      changeDate && changeDate((0, _moment2.default)(date).set('millisecond', 0).format(format));
      this.setState({
        showCalendar: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          minDate = _state2.minDate,
          maxDate = _state2.maxDate,
          date = _state2.date,
          yearMonth = _state2.yearMonth,
          showCalendar = _state2.showCalendar,
          placeholder = _state2.placeholder,
          lang = _state2.lang,
          needTime = _state2.needTime;


      var formatDate = this.props.date ? (0, _moment2.default)(this.props.date).format(needTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD') : '';

      return _react2.default.createElement(
        'div',
        { className: 'date-range-body' },
        _react2.default.createElement(
          'div',
          {
            className: 'input-section',
            onClick: function onClick() {
              return _this3.dateSectionDisplay('show');
            }
          },
          _react2.default.createElement('input', { type: 'text', className: 'time-input', value: formatDate, placeholder: placeholder })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'date-section ' + (showCalendar && 'date-section-show')
          },
          _react2.default.createElement(_calendarSelect2.default, {
            className: 'date-select-section',
            calendarMonth: yearMonth,
            date: date.format('YYYY-MM-DD'),
            minDate: minDate,
            maxDate: maxDate,
            lang: lang,
            showCalendar: showCalendar,
            selectDate: function selectDate(item) {
              return _this3.selectDate(item);
            },
            calendarChange: function calendarChange(type, unit) {
              return _this3.calendarChange(type, unit, 'start');
            }
          })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'time-section ' + (showCalendar && needTime ? ' time-section-show' : '')
          },
          _react2.default.createElement(_timeSelect2.default, {
            date: date,
            minDate: minDate,
            maxDate: maxDate,
            selectTime: function selectTime(item) {
              return _this3.selectTime(item);
            },
            lang: lang,
            onOk: function onOk() {
              return _this3.dateCallback();
            }
          })
        ),
        showCalendar && _react2.default.createElement('div', { className: 'bg-for-close', onClick: function onClick() {
            return _this3.dateSectionDisplay('hide');
          } })
      );
    }
  }]);

  return DateRange;
}(_react2.default.Component);

exports.default = DateRange;
//# sourceMappingURL=index.js.map