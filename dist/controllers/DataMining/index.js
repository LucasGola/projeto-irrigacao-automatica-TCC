"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _irrigationProjection = _interopRequireDefault(require("./irrigationProjection"));
var _waterConsumptionProjection = _interopRequireDefault(require("./waterConsumptionProjection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  irrigationProjection: _irrigationProjection["default"],
  waterConsumptionProjection: _waterConsumptionProjection["default"]
};