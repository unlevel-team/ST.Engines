"use strict";

/**
 * ActuatorsManager
 * 
 * Generic manager for Actuators
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events').EventEmitter;

/**
 * ActuatorsManager CONSTANTS
 */
var ActuatorsManager_CONSTANTS = {

	"Events": {
		"ActuatorAdded": "Actuator Added"
	}

};

/**
 * Actuators manager
 */

var ActuatorsManager = function () {
	function ActuatorsManager() {
		_classCallCheck(this, ActuatorsManager);

		this.actuatorsList = [];
		this.eventEmitter = new EventEmitter();

		this.CONSTANTS = ActuatorsManager_CONSTANTS;
	}

	/**
  * Adds actuator
  * 
  * @act Actuator object
  */


	_createClass(ActuatorsManager, [{
		key: "addActuator",
		value: function addActuator(act) {

			var amng = this;

			var actSearch = amng.getActuatorByID(act.config.id);

			if (actSearch.STactuator !== null) {
				throw "Actuator ID already exists.";
			}

			amng.actuatorsList.push(act);

			// Emit message ActuatorAdded
			amng.eventEmitter.emit(amng.CONSTANTS.Events.ActuatorAdded, act);
		}

		/**
   * Returns Actuator searched by ID
   */

	}, {
		key: "getActuatorByID",
		value: function getActuatorByID(actuatorID) {

			var amng = this;
			var actuator = null;
			var _i = 0;

			_i = amng.actuatorsList.map(function (x) {
				return x.config.id;
			}).indexOf(actuatorID);
			if (_i !== -1) {
				actuator = amng.actuatorsList[_i];
			}

			return {
				"STactuator": actuator,
				"position": _i
			};
		}

		/**
   * Turn off actuators
   */

	}, {
		key: "turnOffActuators",
		value: function turnOffActuators() {

			var amng = this;
			var actList = amng.actuatorsList;

			actList.forEach(function (act_, _i) {
				if (act_.actuatorEngine !== null) {
					act_.actuatorEngine.stopEngine();
				}
			});

			console.log('<*> ActuatorsManager.turnOffActuators'); // TODO REMOVE DEBUG LOG
		}
	}]);

	return ActuatorsManager;
}();

var _Lib = {
	"ActuatorsManager_CONSTANTS": ActuatorsManager_CONSTANTS,
	"ActuatorsManager": ActuatorsManager
};

module.exports = _Lib;
//# sourceMappingURL=ActuatorsManager.js.map
