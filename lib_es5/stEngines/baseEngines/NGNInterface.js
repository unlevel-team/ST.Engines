"use strict";

/**
 * Engines System
 * 
 * SomeThings Engines System library
 */

/**
 * Engine interface.
 * <pre>
 * Provides a simple interface for define an engine.
 * 
 * Could be used in custom engines
 * 
 * </pre>
 * 
 * 
 * @typedef {Object} EngineInterface
 * @memberof st.ngn.baseEngines
 * @type Object
 * 
 * 
 * @property {string} name - Engine name.
 * @property {string} type - Engine type. Could be 'sensor' or 'actuator'.
 * @property {string} baseNGN - BaseEngine. Could be 'SimpleLoop' or 'CounterLoop.
 * 
 * @property {object} eventEmmiter - Object for receive and emit events.
 * 
 * @property {function} getOptions - Get options function.
 * @property {function} setOptions - Set options function.
 * @property {function} startEngine - startEngine function.
 * @property {function} stopEngine - stopEngine function.
 * 
 * 
 * @property {object} custom_engine - The custom engine.
 * @property {st.ngn.baseEngines.CustomOption[]} [custom_options] - Custom options.
 * 
 * @property {(st.ngn.SensorEngine|st.ngn.ActuatorEngine)} _engine - The ST engine.
 * 
 * 
 * @property {object} _baseEngine - Contains data related to base engine. (is loaded when the interface is used...)
 * 
 */

/** 
 * Custom option
 * <pre>
 * Provides a simple interface for define a custom option.
 * 
 * Could be used in custom engines
 * 
 * </pre>
 * 
 * @typedef {Object} CustomOption
 * @memberof st.ngn.baseEngines
 * @type Object
 * 
 * @property {string} name - Property name.
 * @property {string} type - Property type. Could be 'number', 'boolean', 'string', 'object', 'array'.
 * @property {string} [alias] - An alias for this property.
 * @property {string} [description] - A description for this property.
 * 
 */

/**
 * BaseEngine CONSTANTS
 * 
 * @memberof st.ngn.baseEngines
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EngineInterface_CONSTANTS = {

	'EngineTypes': {
		'Sensor': 'sensor',
		'Actuator': 'actuator'
	}

};

/**
 * Interfaces Tools
 * @memberof st.ngn.baseEngines
 */
var ngnInterfaces_Tools = {

	/**
  * CheckInterface 
  * @function
  * @memberof st.ngn.baseEngines.InterfacesTools
  */
	'checkInterface': function checkInterface(options) {}

};

var _ngnInterfaces_Lib = {

	'_setupNGNfor_BaseEngines': function _setupNGNfor_BaseEngines(options) {

		var _ngnInterface = options.ngnInterface;
		var _engineItf = _ngnInterface.engineInterface;
		var _baseEngine = _engineItf._engine;
		var _customEngine = _engineItf.custom_engine;

		_ngnInterface.eventEmitter.on(_baseEngine.CONSTANTS.Events.MainLoop_Tick, function (_data) {
			_customEngine.eventEmitter.emit(_baseEngine.CONSTANTS.Events.MainLoop_Tick, _data);
		});

		switch (_engineItf.type) {

			case _ngnInterface.CONSTANTS.EngineTypes.Sensor:

				var _SensorNGN_Lib = require('../SensorEngine.js').SensorEngine_Lib;

				_engineItf._baseEngine = {
					'CONSTANTS': _SensorNGN_Lib.CONSTANTS
				};

				break;

			case _ngnInterface.CONSTANTS.EngineTypes.Actuator:

				var _ActuatorNGN_Lib = require('../ActuatorEngine.js').ActuatorEngine_Lib;

				_engineItf._baseEngine = {
					'CONSTANTS': _ActuatorNGN_Lib.CONSTANTS
				};

				break;

			default:
				break;
		}
	}

};

/**
 * NGNInterface
 * 
 * <pre>
 * NGN Interface
 * 
 * This class manages an EngineInterface
 * 
 * SomeThings Engines System library
 * </pre>  
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * 
 * @property {st.ngn.baseEngines.EngineInterface} engineInterface - The engine interface
 * @property {string} name - name of this engine interface
 * @property {string} baseName - Base name, is the 'engineInterface.name' property
 * @property {object} eventEmitter - Object for emit events. Normally is the one used in the 'base engine' of the engine interface...
 * 
 * @property {object} _config - Configuration object, is the 'options.config' parameter
 * @property {object} _bngnOptions - Configuration object, for base engine
 * 
 */

var NGNInterface = function () {

	/**
  * @constructs NGNInterface
  * 
  * @param {object} options - Options object.
  * @param {st.ngn.baseEngines.EngineInterface} options.engineInterface - The engine interface.
  * @param {object} [options.bngnOptions] - Configuration object, for base engine
  * 
  * 
  */

	function NGNInterface(options) {
		_classCallCheck(this, NGNInterface);

		if (options === undefined) {
			options = {};
		}

		var _ngnInterface = this;
		_ngnInterface.engineInterface = null;
		_ngnInterface.name = null;
		_ngnInterface.baseName = null;
		_ngnInterface.eventEmitter = null;
		_ngnInterface._config = null;
		_ngnInterface.CONSTANTS = EngineInterface_CONSTANTS;

		_ngnInterface._config = options.config;
		_ngnInterface._bngnOptions = options.bngnOptions;

		if (options.engineInterface === undefined) {
			throw 'engineInterface is required.';
		}
		_ngnInterface.engineInterface = options.engineInterface;

		_ngnInterface._bngnOptions = {
			'loopTime': 500
		};

		if (options.bngnOptions !== undefined) {
			_ngnInterface._bngnOptions = options.bngnOptions;
		}

		var _engineItf = _ngnInterface.engineInterface;

		_ngnInterface.baseName = _engineItf.name;
		_ngnInterface.name = _engineItf.name;
	}

	/**
  * Initializes the engine interface
  * <pre>
  * 
  * </pre>
  */


	_createClass(NGNInterface, [{
		key: 'initialize',
		value: function initialize(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngnInterface = this;
			if (options.ngnInterface !== undefined) {
				_ngnInterface = options.ngnInterface;
			}

			var _engineItf = _ngnInterface.engineInterface;
			var _config = _ngnInterface._config;

			// console.log('<~i~> st.ngn.baseEngines.NGNInterface.initialize ...');	// TODO: REMOVE DEBUG LOG
			// console.log(options);	// TODO: REMOVE DEBUG LOG
			// console.log(_config);	// TODO: REMOVE DEBUG LOG

			// Check 'type' (really doesn't care...)
			switch (_engineItf.type) {

				case 'sensor':
					// let SensorEngine = require('../SensorEngine.js');
					// _engineItf._engine = new SensorEngine(_config);
					break;

				case 'actuator':
					// let ActuatorEngine = require('../ActuatorEngine.js');
					// _engineItf._engine = new ActuatorEngine(_config);
					break;

				default:
					throw 'Bad engine type';
				// break;
			}

			// Set BaseEngine
			if (_engineItf.baseNGN === undefined) {
				throw 'baseNGN is required.';
			}
			var _baseNGN = _engineItf.baseNGN;

			var _BaseEngines_Lib = require('./stBaseNGN.js').BaseEngines_Lib;

			try {
				_engineItf._engine = _BaseEngines_Lib.get_BaseEngine({
					'name': _baseNGN,
					'ngnConfig': _ngnInterface._bngnOptions
				});

				var _baseEngine = _engineItf._engine;
				var _customEngine = _engineItf.custom_engine;

				try {
					_baseEngine.initialize({
						'engine': _baseEngine
					});

					_ngnInterface.eventEmitter = _baseEngine.eventEmitter;

					_ngnInterfaces_Lib._setupNGNfor_BaseEngines({
						'ngnInterface': _ngnInterface
					});
				} catch (_e) {
					throw 'Cannot initialize base engine. ' + _e;
				}

				_ngnInterface.CONSTANTS = _engineItf._engine.CONSTANTS;
			} catch (_e) {
				throw 'Error in BaseEngine. ' + _e;
			}
		}

		/**
   * Get options
   * 
   * @returns {object} - Object with the engine options
   */

	}, {
		key: 'getOptions',
		value: function getOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngnInterface = this;
			if (options.ngnInterface !== undefined) {
				_ngnInterface = options.ngnInterface;
			}

			var _engineItf = _ngnInterface.engineInterface;
			var _engine = _engineItf._engine;

			// console.log('<~i~> st.ngn.baseEngines.NGNInterface.getOptions ...');	// TODO: REMOVE DEBUG LOG
			// console.log(_engineItf);	// TODO: REMOVE DEBUG LOG

			var _engineOptions = null;

			try {

				_engineOptions = _engineItf.getOptions({
					'ngnInterface': _engineItf
				});

				var _baseEngineOptions = _engine.getOptions({
					'engine': _engine
				});

				_engineOptions._bngnOptions = _baseEngineOptions;

				if (_engineItf.custom_options !== undefined) {
					_engineOptions._customOptions = _engineItf.custom_options;
				}
			} catch (_e) {
				// TODO: handle exception
				console.log('<EEE> st.ngn.baseEngines.NGNInterface.getOptions ...'); // TODO: REMOVE DEBUG LOG
				console.log(_e); // TODO: REMOVE DEBUG LOG
			}

			return _engineOptions;
		}

		/**
   * Set options
   * 
   * 
   */

	}, {
		key: 'setOptions',
		value: function setOptions(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngnInterface = this;
			if (options.ngnInterface !== undefined) {
				_ngnInterface = options.ngnInterface;
			}

			var _engineItf = _ngnInterface.engineInterface;
			var _engine = _engineItf._engine;

			// console.log('<~i~> st.ngn.baseEngines.NGNInterface.setOptions...');	// TODO: REMOVE DEBUG LOG
			// console.log(options);	// TODO: REMOVE DEBUG LOG

			try {

				_engineItf.setOptions({
					'ngnInterface': _engineItf,
					'ngnOptions': options.ngnOptions
				});

				_engine.setOptions({
					'engine': _engine,
					'ngnOptions': options.bngnOptions
				});
			} catch (_e) {
				// TODO: handle exception
				console.log('<EEE> st.ngn.baseEngines.NGNInterface.setOptions...'); // TODO: REMOVE DEBUG LOG
				console.log(_e); // TODO: REMOVE DEBUG LOG
			}
		}

		/**
   * Start engine
   * 
   */

	}, {
		key: 'startEngine',
		value: function startEngine(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngnInterface = this;
			if (options.ngnInterface !== undefined) {
				_ngnInterface = options.ngnInterface;
			}

			var _engineItf = _ngnInterface.engineInterface;
			var _engine = _engineItf._engine;

			console.log('<~i~> st.ngn.baseEngines.NGNInterface.startEngine ...'); // TODO: REMOVE DEBUG LOG
			console.log(_engine); // TODO: REMOVE DEBUG LOG

			try {

				_engine.startEngine({
					'engine': _engine
				});
			} catch (_e) {
				// TODO: handle exception

				console.log('<EEE> st.ngn.baseEngines.NGNInterface.startEngine ...'); // TODO: REMOVE DEBUG LOG
				console.log(_e); // TODO: REMOVE DEBUG LOG
			}
		}

		/**
   * Stop engine
   * 
   * @returns Promise
   */

	}, {
		key: 'stopEngine',
		value: function stopEngine(options) {

			if (options === undefined) {
				options = {};
			}

			var _ngnInterface = this;
			if (options.ngnInterface !== undefined) {
				_ngnInterface = options.ngnInterface;
			}

			var _engineItf = _ngnInterface.engineInterface;
			var _engine = _engineItf._engine;

			try {

				_engine.stopEngine({
					'engine': _engine
				});
			} catch (_e) {
				// TODO: handle exception
				console.log('<EEE> st.ngn.baseEngines.NGNInterface.stopEngine ...'); // TODO: REMOVE DEBUG LOG
				console.log(_e); // TODO: REMOVE DEBUG LOG
			}
		}
	}]);

	return NGNInterface;
}();

var NGNInterfaceManager =

/**
 * @constructs NGNInterfaceManager
 */
function NGNInterfaceManager(options) {
	_classCallCheck(this, NGNInterfaceManager);

	if (options === undefined) {
		options = {};
	}
};

var _lib = {
	'NGNInterface': NGNInterface
};

module.exports = _lib;
//# sourceMappingURL=NGNInterface.js.map
