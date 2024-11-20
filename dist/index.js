"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
require("express-async-errors");
var _moment = _interopRequireDefault(require("moment"));
var _index = _interopRequireDefault(require("./routes/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
require('log-timestamp')(function () {
  return "[".concat((0, _moment["default"])().utcOffset('-03:00').format('DD-MM-YYYY HH:mm:ss'), "]");
});
var express = require('express');
var app = express();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])({
  credentials: true,
  methods: 'POST, GET, PUT, DELETE, PATCH, HEAD, OPTIONS',
  origin: true
}));
app.use(_index["default"]);
app.listen(process.env.PORT, function () {
  console.log("App listening on port ".concat(process.env.PORT));
});