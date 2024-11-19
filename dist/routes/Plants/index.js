"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Plants = _interopRequireDefault(require("../../controllers/Plants"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var plantsRouter = (0, _express.Router)();
plantsRouter.get('/active-plant-info', _Plants["default"].getPlantInfo);
plantsRouter.get('/info/all', _Plants["default"].getAllPlantInfo);
plantsRouter.get('/water-and-tempreature-info', _Plants["default"].getPlantWaterAndTemperatureInfo);
plantsRouter.post('/register', _Plants["default"].registerPlant);
plantsRouter.put('/update-info', _Plants["default"].updatePlantInfo);
plantsRouter["delete"]('/delete', _Plants["default"].deletePlant);
var _default = exports["default"] = plantsRouter;