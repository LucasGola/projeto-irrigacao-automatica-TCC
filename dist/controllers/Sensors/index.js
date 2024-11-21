"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getSensorsMeasurement = _interopRequireDefault(require("./getSensorsMeasurement"));
var _registerMeasurement = _interopRequireDefault(require("./registerMeasurement"));
var _residentialWaterConsumption = _interopRequireDefault(require("./residentialWaterConsumption"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  getSensorsTimeline: _getSensorsMeasurement["default"],
  registerMeasurement: _registerMeasurement["default"],
  residentialWaterConsumption: _residentialWaterConsumption["default"]
};