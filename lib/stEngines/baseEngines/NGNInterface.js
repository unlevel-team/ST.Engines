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
const EngineInterface_CONSTANTS = {
	
	'EngineTypes': {
		'Sensor': 'sensor',
		'Actuator': 'actuator'
	}
		
};








/**
 * Interfaces Tools
 * @memberof st.ngn.baseEngines
 */
let ngnInterfaces_Tools = {
	
		
	/**
	 * CheckInterface 
	 * @function
	 * @memberof st.ngn.baseEngines.InterfacesTools
	 */
	'checkInterface': function(options) {
		
	}
		
};



let _ngnInterfaces_Lib = {
		
		
		
	'_setupNGNfor_BaseEngines': function(options) {
		
		let _ngnInterface = options.ngnInterface;
		let _engineItf = _ngnInterface.engineInterface;
		let _baseEngine = _engineItf._engine;
		let _customEngine = _engineItf.custom_engine;


		_ngnInterface.eventEmitter.on(_baseEngine.CONSTANTS.Events.MainLoop_Tick, function(_data) {
			_customEngine.eventEmitter.emit(_baseEngine.CONSTANTS.Events.MainLoop_Tick, _data);
		});

		
		
		switch (_engineItf.type) {
			
			case _ngnInterface.CONSTANTS.EngineTypes.Sensor:
				
				let _SensorNGN_Lib = require('../SensorEngine.js').SensorEngine_Lib;
				
				_engineItf._baseEngine = {
					'CONSTANTS': _SensorNGN_Lib.CONSTANTS
				};
				
				break;
				
			case _ngnInterface.CONSTANTS.EngineTypes.Actuator:
				
				let _ActuatorNGN_Lib = require('../ActuatorEngine.js').ActuatorEngine_Lib;
				
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
class NGNInterface {
	
	
	/**
	 * @constructs NGNInterface
	 * 
	 * @param {object} options - Options object.
	 * @param {st.ngn.baseEngines.EngineInterface} options.engineInterface - The engine interface.
	 * @param {object} [options.bngnOptions] - Configuration object, for base engine
	 * 
	 * 
	 */
	constructor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
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
		
		
		let _engineItf = _ngnInterface.engineInterface;
		
		_ngnInterface.baseName = _engineItf.name;
		_ngnInterface.name = _engineItf.name;
		
	}
	
	
	/**
	 * Initializes the engine interface
	 * <pre>
	 * 
	 * </pre>
	 */
	initialize(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		if (options.ngnInterface !== undefined) {
			_ngnInterface = options.ngnInterface;
		}
		
		let _engineItf = _ngnInterface.engineInterface;
		let _config = _ngnInterface._config;
		

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
		let _baseNGN = _engineItf.baseNGN;


		let _BaseEngines_Lib = require('./stBaseNGN.js').BaseEngines_Lib;

		try {
			_engineItf._engine = _BaseEngines_Lib.get_BaseEngine({
				'name': _baseNGN,
				'ngnConfig': _ngnInterface._bngnOptions
			});

			let _baseEngine = _engineItf._engine;
			let _customEngine = _engineItf.custom_engine;

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
	getOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		if (options.ngnInterface !== undefined) {
			_ngnInterface = options.ngnInterface;
		}
		
		let _engineItf = _ngnInterface.engineInterface;
		let _engine = _engineItf._engine;

		
		// console.log('<~i~> st.ngn.baseEngines.NGNInterface.getOptions ...');	// TODO: REMOVE DEBUG LOG
		// console.log(_engineItf);	// TODO: REMOVE DEBUG LOG
		

		let _engineOptions = null;
		
		
		try {
			
			_engineOptions = _engineItf.getOptions({
				'ngnInterface': _engineItf
			});
			
			
			let _baseEngineOptions = _engine.getOptions({
				'engine': _engine
			});

			_engineOptions._bngnOptions = _baseEngineOptions;
			
			
			if (_engineItf.custom_options !== undefined) {
				_engineOptions._customOptions = _engineItf.custom_options;
			}
			
		} catch (_e) {
			// TODO: handle exception
			console.log('<EEE> st.ngn.baseEngines.NGNInterface.getOptions ...');	// TODO: REMOVE DEBUG LOG
			console.log(_e);	// TODO: REMOVE DEBUG LOG

		}
		
		
	    return _engineOptions;
	}
	
	
	/**
	 * Set options
	 * 
	 * 
	 */
	setOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		if (options.ngnInterface !== undefined) {
			_ngnInterface = options.ngnInterface;
		}
		
		let _engineItf = _ngnInterface.engineInterface;
		let _engine = _engineItf._engine;
		
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
			console.log('<EEE> st.ngn.baseEngines.NGNInterface.setOptions...');	// TODO: REMOVE DEBUG LOG
			console.log(_e);	// TODO: REMOVE DEBUG LOG

		}

		
	}

	
	/**
	 * Start engine
	 * 
	 */
	startEngine(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		if (options.ngnInterface !== undefined) {
			_ngnInterface = options.ngnInterface;
		}
		
		let _engineItf = _ngnInterface.engineInterface;
		let _engine = _engineItf._engine;
		
		console.log('<~i~> st.ngn.baseEngines.NGNInterface.startEngine ...');	// TODO: REMOVE DEBUG LOG
		console.log(_engine);	// TODO: REMOVE DEBUG LOG

		
		
		try {
			
			_engine.startEngine({
				'engine': _engine
			});
			
		} catch (_e) {
			// TODO: handle exception
			
			console.log('<EEE> st.ngn.baseEngines.NGNInterface.startEngine ...');	// TODO: REMOVE DEBUG LOG
			console.log(_e);	// TODO: REMOVE DEBUG LOG
		}

		
	}
	
	
	/**
	 * Stop engine
	 * 
	 * @returns Promise
	 */
	stopEngine(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		if (options.ngnInterface !== undefined) {
			_ngnInterface = options.ngnInterface;
		}
		
		let _engineItf = _ngnInterface.engineInterface;
		let _engine = _engineItf._engine;
		
			
		try {
			
			_engine.stopEngine({
				'engine': _engine
			});
			
			
		} catch (_e) {
			// TODO: handle exception
			console.log('<EEE> st.ngn.baseEngines.NGNInterface.stopEngine ...');	// TODO: REMOVE DEBUG LOG
			console.log(_e);	// TODO: REMOVE DEBUG LOG
		}

		
	}
	
	
	
}




class NGNInterfaceManager {
	
	/**
	 * @constructs NGNInterfaceManager
	 */
	constructor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		
	}
}



let _lib = {
	'NGNInterface': NGNInterface
};


module.exports = _lib;

