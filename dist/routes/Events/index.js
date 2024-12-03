"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Events = _interopRequireDefault(require("../../controllers/Events"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var eventsRouter = (0, _express.Router)();
eventsRouter.get('/timeline', _Events["default"].getAllIrrigationEventsTimeline);
eventsRouter.post('/register', _Events["default"].registerEvent);
var _default = exports["default"] = eventsRouter;