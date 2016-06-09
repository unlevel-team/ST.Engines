"use strict";

/**
 * SensorsManager
 * 
 * Generic manager for Sensors
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * SensorsManager CONSTANTS
 */
var SensorsManager_CONSTANTS = {

	"Events": {
		"SensorAdded": "Sensor added",
		"SensorOptionsUpdated": "Sensor Options Updated"
	}
};

/**
 * Sensors Manager
 */

var SensorsManager = function () {
	function SensorsManager() {
		_classCallCheck(this, SensorsManager);

		this.sensorsList = [];
		this.eventEmitter = new EventEmitter();

		this.CONSTANTS = SensorsManager_CONSTANTS;
	}

	/**
  * Add sensor
  * 
  * @sensor Sensor object
  */


	_createClass(SensorsManager, [{
		key: "addSensor",
		value: function addSensor(sensor) {

			var smng = this;

			var sensorSearch = smng.getSensorByID(sensor.config.id);

			if (sensorSearch.STsensor !== null) {
				throw "Sensor ID already exists.";
			}

			smng.sensorsList.push(sensor);

			// Emit message SensorAdded
			smng.eventEmitter.emit(smng.CONSTANTS.Events.SensorAdded, sensor);
		}

		/**
   * Returns Sensor searched by ID
   */

	}, {
		key: "getSensorByID",
		value: function getSensorByID(sensorID) {

			var smng = this;

			var sensor = null;
			var _i = 0;

			_i = smng.sensorsList.map(function (x) {
				return x.config.id;
			}).indexOf(sensorID);
			if (_i !== -1) {
				sensor = smng.sensorsList[_i];
			}

			return {
				"STsensor": sensor,
				"position": _i
			};
		}

		/**
   * Turn off sensors
   */

	}, {
		key: "turnOffSensors",
		value: function turnOffSensors() {

			var smng = this;
			var snsList = smng.sensorsList;

			snsList.forEach(function (sns_, _i) {
				if (sns_.sensorEngine !== null) {
					sns_.sensorEngine.stopEngine();
				}
			});

			console.log('<*> SensorsManager.turnOffSensors'); // TODO REMOVE DEBUG LOG
		}
	}]);

	return SensorsManager;
}();

var SensorsManager_Lib = {
	"SensorsManager": SensorsManager,
	"CONSTANTS": SensorsManager_CONSTANTS

};

module.exports = SensorsManager_Lib;
//# sourceMappingURL=SensorsManager.js.map
