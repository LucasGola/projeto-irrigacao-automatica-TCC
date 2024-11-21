"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Sensors = _interopRequireDefault(require("../../controllers/Sensors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var sensorsRouter = (0, _express.Router)();
sensorsRouter.get('/measurements', _Sensors["default"].getSensorsTimeline);
sensorsRouter.get('/residential-water-consumption', _Sensors["default"].residentialWaterConsumption);
sensorsRouter.post('/register-measurement', _Sensors["default"].registerMeasurement);
var _default = exports["default"] = sensorsRouter;