"use strict";

/**
 * Engines system services
 * for Node role
 * 
 * SomeThings Engines System library
 * version Hero
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NGSYS_Hero_Services = require('./ngsysHero_Services.js');

/**
 * NGSYS_Hero_NodeServices
 */

var NGSYS_Hero_NodeServices = function (_NGSYS_Hero_Services) {
	_inherits(NGSYS_Hero_NodeServices, _NGSYS_Hero_Services);

	function NGSYS_Hero_NodeServices(ngSYS) {
		_classCallCheck(this, NGSYS_Hero_NodeServices);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NGSYS_Hero_NodeServices).call(this, ngSYS));
	}

	_createClass(NGSYS_Hero_NodeServices, [{
		key: "initialize",
		value: function initialize() {

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "initialize", this).call(this);
		}

		/**
   * Map control events
   */

	}, {
		key: "_mapControlEvents",
		value: function _mapControlEvents(ngSYS) {

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "_mapControlEvents", this).call(this, ngSYS);

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

			_get(Object.getPrototypeOf(NGSYS_Hero_NodeServices.prototype), "_mapControlMessages", this).call(this, socket);

			var service = this;

			var comSYS = service.comSYS;
			var config = comSYS.config;

			if (socket === undefined) {
				socket = config.controlChannel.socket;
			}
		}
	}]);

	return NGSYS_Hero_NodeServices;
}(NGSYS_Hero_Services);

var _Lib = {
	"NGSYS_Hero_NodeServices": NGSYS_Hero_NodeServices
};

module.exports = _Lib;
//# sourceMappingURL=ngsysHero_NodeServices.js.map
