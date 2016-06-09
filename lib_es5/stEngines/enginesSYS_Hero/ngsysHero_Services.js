"use strict";

/*
 SomeThings Engines System library

 Services
 
 version Hero
 

*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NGSYS_Hero_Services = function () {
	function NGSYS_Hero_Services(ngSYS) {
		_classCallCheck(this, NGSYS_Hero_Services);

		this.ngSYS = ngSYS;
		this.CONSTANTS = ngSYS.CONSTANTS;
	}

	_createClass(NGSYS_Hero_Services, [{
		key: "initialize",
		value: function initialize() {

			var service = this;
			service._mapControlEvents();
			service._mapControlMessages();
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(ngSYS) {

			var service = this;

			if (ngSYS === undefined) {
				ngSYS = service.ngSYS;
			}
		}

		/**
   * Map control messages
   */

	}, {
		key: "_mapControlMessages",
		value: function _mapControlMessages(socket) {

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (config._mapped !== undefined && config._mapped === true) {
				throw "control messages already mapped.";
			}

			if (socket === undefined) {
				socket = config.controlChannel.socket;
			}

			socket.on("disconnect", function (data) {
				service._unmapControlMessages(socket);
			});

			config._mapped = true;
		}

		/**
   * Unmap control messages
   */

	}, {
		key: "_unmapControlMessages",
		value: function _unmapControlMessages(socket) {

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (config._mapped === undefined || config._mapped !== true) {
				throw "control messages not already mapped.";
			}
		}
	}]);

	return NGSYS_Hero_Services;
}();

var _Lib = {

	"NGSYS_Hero_Services": NGSYS_Hero_Services

};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_Services.js.map
