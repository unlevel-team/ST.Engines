"use strict";

/**
 * Simple Loop engine
 * 
 * 
 */


/**
 * Import BaseEngine
 * @ignore
 */
let BaseEngine = require('./BaseEngine.js').BaseEngine;


/**
 * SimpleLoop configuration object.
 * 
 * @typedef {Object} Config
 * @memberof st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} loopTime - The time in miliseconds for main loop.
 * 
 */


/**
 * SimpleLoop options object.
 * 
 * @typedef {Object} Options
 * @memberof st.ngn.baseEngines.SimpleLoop
 * 
 * @type Object
 * @property {number} loopTime - The time in miliseconds for main loop.
 * 
 */


/**
 * SimpleLoop
 * <pre>
 * A simple loop engine. 
 * 
 * Provides  'loopTime' option
 * </pre>
 * 
 * 
 * @class
 * @memberof st.ngn.baseEngines
 * @implements st.ngn.BaseEngine
 */
class SimpleLoop extends BaseEngine {
	
	/**
	 * 
	 * @constructs SimpleLoop
	 * 
	 * @param {st.ngn.baseEngines.SimpleLoop.Config} config - Configuration object
	 */
	constructor(config) {
		
		super(config);
		
		let _ngn = this;
	}

	
	/**
	 * Get options
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.baseEngines.SimpleLoop} [options.engine] - Engine reference
	 * 
	 * @return {st.ngn.baseEngines.SimpleLoop.Options} options - Options object
	 * 
	 */
	getOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngn = this;
		if (options.engine !== undefined) {
			_ngn = options.engine;
		}

		let _ngnConfig = _ngn.config;
		
		let _ngnOptions = {
			'loopTime': _ngnConfig.loopTime
		};
		
		return _ngnOptions;
	}

	
	/**
	 * Set options
	 * 
	 * @param {object} options - Options object
	 * @param {st.ngn.baseEngines.SimpleLoop} [options.engine] - Engine reference
	 * @param {st.ngn.baseEngines.SimpleLoop.Options} options.ngnOptions - Engine options
	 * 
	 */
	setOptions(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		let _ngn = this;
		if (options.engine !== undefined) {
			_ngn = options.engine;
		}

		let _ngnConfig = _ngn.config;
		
		// Check engine state
		switch (_ngn.state) {
			case _ngn.CONSTANTS.States.Ready:
			case _ngn.CONSTANTS.States.Stop:
				break;
	
			default:
				throw 'Bad engine state';
				break;
		}
		
		
		let _ngnOptions = {};
		if (options.ngnOptions !== undefined) {
			_ngnOptions = options.ngnOptions;
		}
		

		if (_ngnOptions.loopTime !== undefined) {
			_ngnConfig.loopTime = _ngnOptions.loopTime;
		}
		
	}
	
}



let _lib = {
	"SimpleLoop" : SimpleLoop
		
};


module.exports = _lib;

