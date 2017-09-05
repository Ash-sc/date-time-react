'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonFn = function () {
  function CommonFn() {
    _classCallCheck(this, CommonFn);
  }

  _createClass(CommonFn, null, [{
    key: 'calendarArray',
    value: function calendarArray(date) {
      _moment2.default.locale('zh-cn');
      var dates = [];
      for (var i = 0; i < 42; i += 1) {
        var startDate = (0, _moment2.default)(date).date(1);
        dates[i] = startDate.weekday(i).format('YYYY-MM-DD');
      }
      return dates;
    }
  }, {
    key: 'ym',
    value: function ym(date) {
      return (0, _moment2.default)(date || undefined).format('YYYY-MM');
    }
  }, {
    key: 'ymd',
    value: function ymd(date) {
      return (0, _moment2.default)(date || undefined).format('YYYY-MM-DD');
    }
  }]);

  return CommonFn;
}();

exports.default = CommonFn;
//# sourceMappingURL=commonFn.js.map