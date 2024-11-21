"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _deletePlant = _interopRequireDefault(require("./deletePlant"));
var _registerPlant = _interopRequireDefault(require("./registerPlant"));
var _getPlantInfo = _interopRequireDefault(require("./getPlantInfo"));
var _getPlantWaterAndTemperatureInfo = _interopRequireDefault(require("./getPlantWaterAndTemperatureInfo"));
var _updatePlant = _interopRequireDefault(require("./updatePlant"));
var _getAllPlantInfo = _interopRequireDefault(require("./getAllPlantInfo"));
var _getAllPlantsNameAndID = _interopRequireDefault(require("./getAllPlantsNameAndID"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  deletePlant: _deletePlant["default"],
  registerPlant: _registerPlant["default"],
  getPlantInfo: _getPlantInfo["default"],
  getAllPlantInfo: _getAllPlantInfo["default"],
  getPlantWaterAndTemperatureInfo: _getPlantWaterAndTemperatureInfo["default"],
  updatePlantInfo: _updatePlant["default"],
  getPlantsNameAndID: _getAllPlantsNameAndID["default"]
};