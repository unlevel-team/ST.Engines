"use strict";

/*
 SomeThings Sensors services library

*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SensorsServices_CONSTANTS = {

	"Messages": {

		"getSensorsList": "Get Sensors List",
		"SensorsList": "Sensors List",
		"getSensorInfo": "Get Sensor Info",
		"SensorInfo": "Sensor Info",
		"getSensorOptions": "Get Sensor Options",
		"SensorOptions": "Sensor Options",
		"setSensorOptions": "Set Sensor Options",
		"SensorOptionsUpdated": "Sensor Options Updated",

		"StartSensor": "StartSensor",
		"SensorStarted": "SensorStarted",
		"StopSensor": "StopSensor",
		"SensorStopped": "SensorStopped",

		"TurnOffSensors": "TurnOffSensors"

	}

};

/**
 * Sensors Services
 * 
 * manages the control messages related to sensors
 * 
 */

var SensorsServices = function () {
	function SensorsServices(sensorsManager, controlChannel) {
		_classCallCheck(this, SensorsServices);

		var ssrv = this;

		ssrv.CONSTANTS = SensorsServices_CONSTANTS;
		ssrv.sensorsManager = sensorsManager;
		ssrv.controlChannel = controlChannel;
	}

	_createClass(SensorsServices, [{
		key: "initialize",
		value: function initialize() {

			var service = this;

			if (service.sensorsManager === undefined || service.sensorsManager === null) {
				throw "Sensors manager is required";
			}

			if (service.controlChannel === undefined || service.controlChannel === null) {
				throw "Control channel is required";
			}

			try {
				service._mapControlEvents(service.sensorsManager);
			} catch (e) {
				// TODO: handle exception
				throw "Error mapping control events. " + e;
			}

			try {
				service._mapControlMessages(service.controlChannel.socket, {
					"service": service
				});
			} catch (e) {
				// TODO: handle exception
				throw "Error mapping control messages. " + e;
			}
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(sensorsManager) {

			var service = this;

			if (sensorsManager === undefined) {
				sensorsManager = service.sensorsManager;
			}
		}

		/**
   * Map control messages
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

	return SensorsServices;
}();

var _lib = {

	"SensorsServices_CONSTANTS": SensorsServices_CONSTANTS,
	"SensorsServices": SensorsServices

};

module.exports = _lib;
//# sourceMappingURL=SensorsServices.js.map