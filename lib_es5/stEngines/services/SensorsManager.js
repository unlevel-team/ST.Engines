"use strict";

/**
 * SensorsManager
 * 
 * Generic manager for Sensors
 * 
 */

/**
 * Import EventEmitter
 * @ignore
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * SensorsManager CONSTANTS
 * 
 * @memberof st.ngn.services
 * 
 */
var SensorsManager_CONSTANTS = {

	"Events": {
		"SensorAdded": "Sensor added",
		"SensorOptionsUpdated": "Sensor Options Updated"
	}
};

/**
 * The result object.
 * 
 * @typedef {Object} SearchResult
 * @memberof st.ngn.services.SensorsManager
 * 
 * @type Object
 * @property {(st.ngn.Sensor|null)} STsensor - The Sensor object, may be null.
 * @property {number} position - The position in list.
 * 
 */

/**
 * Sensors Manager
 * 
 * @class
 * @memberof st.ngn.services
 * 
 * @property {st.ngn.Sensor[]} sensorsList - List of Sensors.
 * @property {object} eventEmitter - Object for emit events.
 * 
 */

var SensorsManager = function () {

	/**
  * @constructs SensorsManager
  */

	function SensorsManager() {
		_classCallCheck(this, SensorsManager);

		var _smng = this;
		_smng.sensorsList = [];
		_smng.eventEmitter = new EventEmitter();

		_smng.CONSTANTS = SensorsManager_CONSTANTS;
	}

	/**
  * Add sensor
  * 
  * @param {st.ngn.Sensor} sensor - The Sensor object
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
   * 
   * @param {String} sensorID - Sensor ID
   * @returns {st.ngn.services.SensorsManager.SearchResult} result - Result object
   *  
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

			snsList.forEach(function (_sns, _i) {

				if (_sns.sensorEngine !== null) {
					var _snsEngine = _sns.sensorEngine;

					if (_snsEngine.state === _snsEngine.CONSTANTS.States.Working) {
						_snsEngine.stopEngine();
					}
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
