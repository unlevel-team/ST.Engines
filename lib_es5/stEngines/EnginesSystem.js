"use strict";

/**
 * SomeThings Engines System library 
 *  
 * Provides a system with server and node roles...
 * 
 */

/**
 * Engines system constants
 * 
 * @memberof st.ngn
 * 
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnginesSystem_CONSTANTS = {

	"Config": {

		"Role_Server": "Server",
		"Role_Node": "Node"

	}

};

/**
 * EnginesSystem
 * 
 * @class
 * @memberof st.ngn
 * 
 * @property {object} config - Configuration.
 * 
 */

var EnginesSystem = function () {

	/**
  * @constructs EnginesSystem
  * 
  * @param {object} config Configuration object
  */

	function EnginesSystem(config) {
		_classCallCheck(this, EnginesSystem);

		//		let ngSYS = this;

		this.CONSTANTS = EnginesSystem_CONSTANTS;
		this.config = config;
	}

	/**
  * Initialize
  */


	_createClass(EnginesSystem, [{
		key: "initialize",
		value: function initialize() {

			var ngSYS = this;

			if (ngSYS.config === undefined) {
				throw "Configuration is required.";
			}
		}
	}]);

	return EnginesSystem;
}();

/**
 * Get EnginesSystem
 * 
 * @memberof st.ngn
 * 
 * @returns {st.ngn.EnginesSystem}
 */


function getEnginesSystem(config) {

	var enginesSYS_Hero = require('./enginesSYS_Hero/enginesSYS_Hero.js');
	//	let _getEnginesSystem = enginesSYS_Hero.getEnginesSystem;
	var ngSYS = enginesSYS_Hero.getEnginesSystem(config);

	return ngSYS;
}

var ngsystem_Lib = {
	"EnginesSystem_CONSTANTS": EnginesSystem_CONSTANTS,
	"EnginesSystem": EnginesSystem,

	"getEnginesSystem": getEnginesSystem
};

module.exports = ngsystem_Lib;
//# sourceMappingURL=EnginesSystem.js.map
