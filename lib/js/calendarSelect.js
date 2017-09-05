'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _commonFn = require('./commonFn');

var _commonFn2 = _interopRequireDefault(_commonFn);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarSelect = function (_React$Component) {
  _inherits(CalendarSelect, _React$Component);

  function CalendarSelect(props) {
    _classCallCheck(this, CalendarSelect);

    var _this = _possibleConstructorReturn(this, (CalendarSelect.__proto__ || Object.getPrototypeOf(CalendarSelect)).call(this, props));

    _this.state = {
      viewMode: 'day',
      currentYear: parseInt(props.calendarMonth.split('-')[0], 10)
    };
    return _this;
  }

  _createClass(CalendarSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.showCalendar && this.props.showCalendar) {
        this.setState({
          viewMode: 'day'
        });
      }
    }

    // 日期是否可用

  }, {
    key: 'isDateEnable',
    value: function isDateEnable(date) {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      return date >= minDate && date <= maxDate;
    }

    // 选择日期

  }, {
    key: 'selectDate',
    value: function selectDate(date) {
      if (this.isDateEnable(date)) {
        this.props.selectDate(date);
      }
    }

    //左右月份年份icon

  }, {
    key: 'yearMonthChange',
    value: function yearMonthChange(type, unit) {
      var _state = this.state,
          viewMode = _state.viewMode,
          currentYear = _state.currentYear;

      if (viewMode === 'day') {
        this.props.calendarChange(type, unit);
      } else {
        this.setState({
          currentYear: currentYear + (type < 0 ? -12 : 12)
        });
      }
    }

    // 视图修改

  }, {
    key: 'changeView',
    value: function changeView(type) {
      this.state.viewMode !== type && this.setState({
        viewMode: type
      });
    }

    // 选择月份

  }, {
    key: 'changeMonthOrYear',
    value: function changeMonthOrYear(val, unit) {
      var type = unit === 'month' ? val - (0, _moment2.default)(this.props.calendarMonth).month() : this.state.currentYear + val - parseInt(this.props.calendarMonth.split('-')[0], 10);
      this.props.calendarChange(type, unit);
      this.setState({
        viewMode: 'day'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          calendarMonth = _props2.calendarMonth,
          date = _props2.date,
          className = _props2.className,
          lang = _props2.lang;
      var _state2 = this.state,
          viewMode = _state2.viewMode,
          currentYear = _state2.currentYear;

      var weekdays = lang === 'zh-cn' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat'];
      var monthList = lang === 'zh-cn' ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var isCurrentMonth = calendarMonth === _commonFn2.default.ym();
      var yearList = new Array(16).fill(0);
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'header-section' },
          viewMode !== 'month' && _react2.default.createElement('span', { className: 'prev-year fa fa-backward', onClick: function onClick() {
              return _this2.yearMonthChange(-1, 'year');
            } }),
          viewMode === 'day' && _react2.default.createElement('span', { className: 'prev-month fa fa-caret-left', onClick: function onClick() {
              return _this2.yearMonthChange(-1, 'month');
            } }),
          viewMode === 'day' && _react2.default.createElement('span', { className: 'next-month fa fa-caret-right', onClick: function onClick() {
              return _this2.yearMonthChange(1, 'month');
            } }),
          viewMode !== 'month' && _react2.default.createElement('span', { className: 'next-year fa fa-forward', onClick: function onClick() {
              return _this2.yearMonthChange(1, 'year');
            } }),
          _react2.default.createElement(
            'span',
            { className: 'year-selector' },
            _react2.default.createElement(
              'span',
              { className: 'current', onClick: function onClick() {
                  return _this2.changeView('year');
                } },
              calendarMonth.split('-')[0],
              lang === 'zh-cn' && '年'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'month-selector' },
            _react2.default.createElement(
              'span',
              { className: 'current', onClick: function onClick() {
                  return _this2.changeView('month');
                } },
              calendarMonth.split('-')[1],
              lang === 'zh-cn' && '月'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'calender-section' },
          viewMode === 'day' && weekdays.map(function (day, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'date-weekday'
              },
              day
            );
          }),
          viewMode === 'day' && _commonFn2.default.calendarArray(calendarMonth).map(function (item, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'date-item ' + (date && _commonFn2.default.ymd(date) === item ? 'selected' : '') + ' ' + (item.indexOf(calendarMonth) !== 0 ? 'not-current-month' : '') + ' ' + (isCurrentMonth && _commonFn2.default.ymd() === item ? 'current-day' : ''),
                onClick: function onClick() {
                  return _this2.selectDate(item);
                }
              },
              item.split('-')[2]
            );
          }),
          viewMode === 'month' && monthList.map(function (month, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'month-item',
                onClick: function onClick() {
                  return _this2.changeMonthOrYear(key, 'month');
                }
              },
              month
            );
          }),
          viewMode === 'year' && monthList.map(function (month, key) {
            return _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'month-item',
                onClick: function onClick() {
                  return _this2.changeMonthOrYear(key, 'year');
                }
              },
              currentYear + key
            );
          })
        )
      );
    }
  }]);

  return CalendarSelect;
}(_react2.default.Component);

exports.default = CalendarSelect;
//# sourceMappingURL=calendarSelect.js.map