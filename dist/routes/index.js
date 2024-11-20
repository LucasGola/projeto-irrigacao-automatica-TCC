"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Plants = _interopRequireDefault(require("./Plants"));
var _Sensors = _interopRequireDefault(require("./Sensors"));
var _Events = _interopRequireDefault(require("./Events"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.use('/plants', _Plants["default"]);
router.use('/sensors', _Sensors["default"]);
router.use('/events', _Events["default"]);
var _default = exports["default"] = router;