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
 * @property {(st.ngn.SensorEngine|st.ngn.ActuatorEngine)} _engine - The ST engine.
 * 
 * 
 * @property {number} position - The position in list.
 * 
 */


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
 * @property {string} baseName - Base name, is the 'engineInterface.name' property
 * 
 */
class NGNInterface {
	
	
	/**
	 * @constructs NGNInterface
	 * 
	 * @param {object} options - Options object.
	 * @param {st.ngn.baseEngines.EngineInterface} options.engineInterface - The engine interface.
	 * 
	 */
	constructor(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngnInterface = this;
		_ngnInterface.engineInterface = null;
		_ngnInterface.baseName = null;

		
		if (options.engineInterface === undefine) {
			throw 'engineInterface is required.';
		}
		_ngnInterface.engineInterface = options.engineInterface;
		let _engineItf = _ngnInterface.engineInterface;
		
		_ngnInterface.baseName = _engineItf.name;
		
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
		
		let _config = {};
		if (options.config !== undefined) {
			_config = options.config;
		}
		
		

		switch (_engineItf.type) {

			case 'sensor':
				
				let SensorEngine = require('../SensorEngine.js');
				_engineItf._engine = new SensorEngine(_config);
				
				break;
				
			case 'actuator':
				
				let ActuatorEngine = require('../ActuatorEngine.js');
				_engineItf._engine = new ActuatorEngine(_config);
				
				break;

	
			default:
				throw 'Bad engine type';
				break;
		}
		
		
	}
	
	
	/**
	 * Get options
	 * 
	 * @returns Promise - Promise with the engine options
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

		return new Promise(function(resolve, reject) {
			
			try {
				
				let _engineOptions = _engine.getOptions({
					
				});
				
				let _ngnItfOptions = _engineItf.getOptions({
							'engineInterface': _engineItf
						});
				
				_engineOptions.options = _ngnItfOptions;
				
				
				resolve(_engineOptions);
				
			} catch (e) {
				// TODO: handle exception
				
				reject(e);
			}

		});
		
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
		
		return new Promise(function(resolve, reject) {
			
			try {
				
				let _ngnOptions = _engineItf.getOptions({
							'engineInterface': _engineItf,
							'ngnOptions': options.ngnOptions
						});
				
				resolve(_ngnOptions);
				
			} catch (e) {
				// TODO: handle exception
				
				reject(e);
			}

		});
		
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

