"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _DataMining = _interopRequireDefault(require("../../controllers/DataMining"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var projectionsRouter = (0, _express.Router)();
projectionsRouter.get('/irrigation', _DataMining["default"].irrigationProjection);
projectionsRouter.get('/water-consumption', _DataMining["default"].waterConsumptionProjection);
var _default = exports["default"] = projectionsRouter;