"use strict";

/*
 SomeThings Actuators services library

 
*/

/**
 * ActuatorsServices CONSTANTS
 * 
 * @memberof st.ngn.services
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActuatorsServices_CONSTANTS = {

	"Messages": {

		"getActuatorsList": "Get Actuators List",
		"ActuatorsList": "Actuators List",
		"getActuatorInfo": "Get Actuator Info",
		"ActuatorInfo": "Actuator Info",
		"getActuatorOptions": "Get Actuator Options",
		"setActuatorOptions": "Set Actuator Options",
		"ActuatorOptions": "Actuator Options",
		"ActuatorOptionsUpdated": "Actuator Options Updated",

		"StartActuator": "StartActuator",
		"ActuatorStarted": "ActuatorStarted",
		"StopActuator": "StopActuator",
		"ActuatorStopped": "ActuatorStopped",

		"TurnOffActuators": "TurnOffActuators"
	}

};

/**
 * Actuators Services
 * 
 * manages the control messages related to actuators
 * 
 * @class
 * @memberof st.ngn.services
 * 
 * @property {st.ngn.services.ActuatorsManager} actuatorsManager - Actuators manager.
 * @property {object} controlChannel - Object for control channel.
 * 
 */

var ActuatorsServices = function () {

	/**
  * 
  * 
  * @constructs ActuatorsServices
  * 
  * @param {ActuatorsManager} actuatorsManager - Actuators manager
  * @param {object} controlChannel - Control channel object
  */

	function ActuatorsServices(actuatorsManager, controlChannel) {
		_classCallCheck(this, ActuatorsServices);

		var ssrv = this;

		ssrv.CONSTANTS = ActuatorsServices_CONSTANTS;
		ssrv.actuatorsManager = actuatorsManager;
		ssrv.controlChannel = controlChannel;
	}

	/**
  * Initialize
  */


	_createClass(ActuatorsServices, [{
		key: "initialize",
		value: function initialize() {

			var service = this;

			if (service.actuatorsManager === undefined || service.actuatorsManager === null) {
				throw "Actuators manager is required";
			}

			if (service.controlChannel === undefined || service.controlChannel === null) {
				throw "Control channel is required";
			}

			service._mapControlEvents(service.actuatorsManager);
			service._mapControlMessages(service.controlChannel.socket, {
				"service": service
			});
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(actuatorsManager) {}

		/**
   * Map control messages
   * 
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.services.ActuatorsServices} [options.service] - Actuators Service object
   * 
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped !== undefined && service._mapped === true) {
				throw "control messages already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}

			socket.on("connect", function (data) {
				if (service._mapped !== true) {
					service._mapControlMessages(socket, {
						"service": service
					});
				}
			});

			socket.on("disconnect", function (data) {
				service._unmapControlMessages(socket, {
					"service": service
				});
			});

			service._mapped = true;
		}

		/**
   * Unmap control messages
   * 
   * @param {object} socket - Socket object
   * @param {object} options - Options object
   * @param {st.ngn.services.ActuatorsServices} [options.service] - Actuators Service object
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket, options) {

			var service = this;

			if (options === undefined) {
				options = {};
			}

			if (options.service !== undefined) {
				service = options.service;
			}

			if (service._mapped === undefined || service._mapped !== true) {
				throw "control messages not already mapped.";
			}

			if (socket === undefined) {
				socket = service.controlChannel.socket;
			}
		}
	}]);

	return ActuatorsServices;
}();

var _lib = {

	"ActuatorsServices_CONSTANTS": ActuatorsServices_CONSTANTS,
	"ActuatorsServices": ActuatorsServices
};

module.exports = _lib;
//# sourceMappingURL=ActuatorsServices.js.map
