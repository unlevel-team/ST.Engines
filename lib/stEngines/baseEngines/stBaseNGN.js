"use strict";


/**
 * SomeThings BaseEngines library
 * <pre>
 * This namespace contains the 'BaseEngines'
 * </pre>
 * 
 * @namespace st.ngn.baseEngines
 * @memberof  st.ngn
 * 
 */

let _baseEngines = {
	
		
	/**
	 * Get a new BaseEngine
	 * 
	 * @function
	 * @memberof st.ngn.baseEngines
	 * 
	 * @param {object} options - Options object
	 * @param {string} options.name - Name of the BaseEngine
	 * @param {object} options.ngnConfig - Configuration object for the BaseEngine
	 * 
	 * @returns {st.ngn.baseEngines.BaseEngine}
	 * 
	 * @throws {Exception}
	 * 
	 */
	'get_BaseEngine': function(options) {
	
		if (options === undefined) {
			options = {};
		}
		
		let _name = 'SimpleLoop';
		if (options.name !== undefined) {
			_name = options.name;
		}
		
		
		let _baseEngine = null;
		
		switch (_name) {
		
			case 'SimpleLoop':
				
				try {
					let _SimpleLoop = require('./SimpleLoop.js').SimpleLoop;
					
					let _ngnConfig = {};
					if (options.ngnConfig !== undefined) {
						_ngnConfig = options.ngnConfig;
					}
					
					_baseEngine = new _SimpleLoop(_ngnConfig);

				} catch (_e) {
					// TODO: handle exception
					throw 'Problems at SimpleLoop... ' + _e;
				}
				break;
	
			default:
				throw 'Bad baseEngine name.';
				// break;
		}
		
		return _baseEngine;
	},
		
	
	/**
	 * Initialize engine
	 * 
	 * @function
	 * @memberof st.ngn.baseEngines
	 * 
	 * @param {object} options - Options object
	 * @param {object} options.engineOptions - options for load the engine
	 * 
	 * @returns {st.ngn.baseEngines.NGNInterface}
	 * 
	 * @throws {Exception}
	 * 
	 */
	'initialize_Engine': function(options) {
		
		if (options === undefined) {
			options = {};
		}
		
		if (options.engineOptions === undefined) {
			throw 'engineOptions is required.';
		}
		let _engineOptions = options.engineOptions;
		
		console.log('<~i~> st.ngn.baseEngines.initialize_Engine');	/// TODO: REMOVE DEBUG LOG
		console.log(' <~> options');	// TODO: REMOVE DEBUG LOG
		console.log(options);	// TODO: REMOVE DEBUG LOG

		
		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Engine IRI (stIRI format) 
		//
		// Try new methods for load engines
		// 
		if (_engineOptions.engineIRI !== undefined && 
				_engineOptions.engineIRI !== null) {
			
			let _engineIRI = _engineOptions.engineIRI;
			
			let net_Services = require("st.network").get_Services();
			let net_NETServices = net_Services.get_NetServices();
			let NETservices_Lib = net_NETServices.NETservices_Lib;
			
			try {
				
				let _stIRI_DATA = NETservices_Lib.parse_stIRI( _engineIRI );

				
				console.log('<~i~> st.ngn.baseEngines.initialize_Engine');	/// TODO: REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stIRI');	// TODO: REMOVE DEBUG LOG
				console.log(_stIRI_DATA);	// TODO: REMOVE DEBUG LOG
				
				let _stIRI = NETservices_Lib.getNew_ST_IRI( {
					'stIRI_DATA': _stIRI_DATA
				} );

				console.log(_stIRI);	// TODO: REMOVE DEBUG LOG
				
				
				let _stIRIcheck = _stIRI.check_ST_IRI({
					'context': 'engines',
					'action': 'config'

				});
				
				
				console.log(_stIRIcheck);	// TODO: REMOVE DEBUG LOG

				if (_stIRIcheck.checkOK !== true) {
					throw 'Bad stIRI check. ' + _stIRIcheck.errorMSG;
				}
				
				
				// paramater 'type'
				let _paramSearch_type = _stIRI.getParameterByName({
					'name': 'type'
				});
				
				if (_paramSearch_type.param === null) {
					throw 'type parameter is required.';
				}
				let _param_type = _paramSearch_type.param;
				
				console.log(_param_type);	// TODO: REMOVE DEBUG LOG


				let _NGNInterface = require('./NGNInterface.js').NGNInterface;
				
				let _engineURL = null;		// used for egine URL
				let _cngnLib = null;		// used for custom engine library
				let _cngnObj = null;		// used for custom engine object
				
				let _ngnInterface = null;	// used for engine interface
				let _ngnItfObject = null;	// used for engine interface object

				
				switch (_param_type.value) {
					
					// For parameter 'type' === 'file'
					case 'file':
						
						// paramater 'method'
						let _paramSearch_method = _stIRI.getParameterByName({
							'name': 'method'
						});

						if (_paramSearch_method.param === null) {
							throw 'method parameter is required.';
						}
						let _param_method = _paramSearch_method.param;
						
						console.log(' < ~ > param method');	// TODO: REMOVE DEBUG LOG
						console.log(_param_method);	// TODO: REMOVE DEBUG LOG
						
						
						switch (_param_method.value) {
						
							case 'ngnInterface':
								
								if (_engineOptions.engineURL === undefined) {
									throw 'option engineURL is required.';
								}
								_engineURL = _engineOptions.engineURL;
								
								console.log(' < ~ > engineURL');	// TODO: REMOVE DEBUG LOG
								console.log(_engineURL);	// TODO: REMOVE DEBUG LOG

								
								_cngnLib = require(_engineURL);
								if (_cngnLib.get_NGNInterface === undefined) {
									throw 'get_NGNInterface is required in engine library.';
								}

								
								try {
									_ngnInterface = _cngnLib.get_NGNInterface({
										'config': {
											'config': _engineOptions
										}
									});

								} catch (_e) {
									throw 'Error at engine interface. ' + _e;
								}
								
								break;
								
								
							case 'ngnInterfaceAlien':
								
								if (_engineOptions.engineURL === undefined) {
									throw 'option engineURL is required.';
								}
								_engineURL = _engineOptions.engineURL;
								
								console.log(' < ~ > engineURL');	// TODO: REMOVE DEBUG LOG
								console.log(_engineURL);	// TODO: REMOVE DEBUG LOG

								
								_cngnLib = require(_engineURL);
								
								let _cngnObj = null;
								try {
									_cngnObj = new _cngnLib(_engineOptions);
									_cngnObj.initialize();
								} catch (_e) {
									throw 'Error at engine. ' + _e;
								}
								
								
								_ngnInterface = {
									'name': 'engineAlien',
									'type': 'sensor',
									'baseNGN': 'SimpleLoop',
									'eventEmmiter': _cngnObj.eventEmitter,
									
									'custom_engine': _cngnObj,
									'getOptions': _cngnObj.getOptions,
									'setOptions': _cngnObj.setOptions
								
								};
								
								
								break;
								
	
							default:
								throw 'Bad method parameter';
								// break;
						}
						
						
						break;
	
					default:
						throw 'Bad type parameter';
						// break;
				}
				
				
				console.log(' < ~ > engineInterface');	// TODO: REMOVE DEBUG LOG
				console.log(_ngnInterface);	// TODO: REMOVE DEBUG LOG

				
				try {
					_ngnItfObject = new _NGNInterface({
						'engineInterface': _ngnInterface,
						'config': _engineOptions
					});
					
				} catch (_e) {
					throw 'Error at engine interface object. ' + _e;
				}
				
				console.log(' <~i~> _ngnItfObject');	// TODO: REMOVE DEBUG LOG
				console.log(_ngnItfObject);	// TODO: REMOVE DEBUG LOG

				
				return _ngnItfObject;

				
			} catch (_e) {
				// TODO: handle exception
				
				console.log('<EEE> st.ngn.baseEngines.initialize_Engine');	// TODO: REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stIRI');	// TODO: REMOVE DEBUG LOG

				console.log(_e);	// TODO: REMOVE DEBUG LOG
				console.log(_engineIRI);	// TODO: REMOVE DEBUG LOG
				
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
		
		
	}
	
		
		
};







let _lib = {
	'BaseEngines_Lib': _baseEngines
};


module.exports = _lib;
