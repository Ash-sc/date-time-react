'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSelect = function (_React$Component) {
  _inherits(TimeSelect, _React$Component);

  function TimeSelect(props) {
    _classCallCheck(this, TimeSelect);

    var _this = _possibleConstructorReturn(this, (TimeSelect.__proto__ || Object.getPrototypeOf(TimeSelect)).call(this, props));

    _this.state = {
      date: props.date
    };
    return _this;
  }

  _createClass(TimeSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        date: nextProps.date
      });
    }
  }, {
    key: 'changeTime',
    value: function changeTime(type, value) {
      var _this2 = this;

      var date = this.state.date;

      var val = parseInt(date.format(type === 'hour' ? 'HH' : 'mm'), 10) + value;
      if (val === 60 && type === 'minute' || val === 24 && type === 'hour') {
        val = '00';
      } else if (val === -1) {
        val = type === 'hour' ? '23' : '59';
      }
      this.setState({
        date: (0, _moment2.default)(date).set(type, val)
      }, function () {
        return _this2.props.selectTime(_this2.state.date);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var date = this.state.date;
      var _props = this.props,
          lang = _props.lang,
          onOk = _props.onOk;

      return _react2.default.createElement(
        'div',
        { className: 'time-section-bg' },
        _react2.default.createElement(
          'div',
          { className: 'hour-section' },
          _react2.default.createElement('span', { className: 'add-hour fa fa-chevron-up', onClick: function onClick() {
              return _this3.changeTime('hour', 1);
            } }),
          date.format('HH'),
          _react2.default.createElement('span', { className: 'reduce-hour fa fa-chevron-down', onClick: function onClick() {
              return _this3.changeTime('hour', -1);
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'column-section' },
          ':'
        ),
        _react2.default.createElement(
          'div',
          { className: 'minute-section' },
          _react2.default.createElement('span', { className: 'add-min fa fa-chevron-up', onClick: function onClick() {
              return _this3.changeTime('minute', 1);
            } }),
          date.format('mm'),
          _react2.default.createElement('span', { className: 'reduce-min fa fa-chevron-down', onClick: function onClick() {
              return _this3.changeTime('minute', -1);
            } })
        ),
        _react2.default.createElement(
          'button',
          { onClick: onOk, className: 'confirm-btn' },
          lang === 'zh-cn' ? '确 定' : 'OK'
        )
      );
    }
  }]);

  return TimeSelect;
}(_react2.default.Component);

exports.default = TimeSelect;
//# sourceMappingURL=timeSelect.js.map