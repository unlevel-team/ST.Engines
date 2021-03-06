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
	 * @param {object} [options.bngnOptions] - options for load the base engine
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
		
		
		let _bngnOptions = {
			'loopTime': 300
		};
		
		if (options.bngnOptions !== undefined) {
			_bngnOptions = options.bngnOptions;
		}
		
		// console.log('<~i~> st.ngn.baseEngines.initialize_Engine');	/// TODO: REMOVE DEBUG LOG
		// console.log(' <~> options');	// TODO: REMOVE DEBUG LOG
		// console.log(options);	// TODO: REMOVE DEBUG LOG
		// console.log(' <~> options');	// TODO: REMOVE DEBUG LOG
		// console.log(_engineOptions);	// TODO: REMOVE DEBUG LOG

		
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ \/ ~~~
		// Engine URI (stURI format) 
		//
		// Try new methods for load engines
		// 
		if (_engineOptions.engineURI !== undefined && 
				_engineOptions.engineURI !== null) {
			
			let _engineURI = _engineOptions.engineURI;
			
			let net_Services = require("st.network").get_Services();
			let net_NETServices = net_Services.get_NetServices();
			let NETservices_Lib = net_NETServices.NETservices_Lib;
			
			try {
				
				let _stURI_DATA = NETservices_Lib.parse_stURI( _engineURI );

				
				// console.log('<~i~> st.ngn.baseEngines.initialize_Engine');	/// TODO: REMOVE DEBUG LOG
				// console.log(' <~> NETservices_Lib.parse_stURI');	// TODO: REMOVE DEBUG LOG
				// console.log(_stURI_DATA);	// TODO: REMOVE DEBUG LOG
				
				let _stURI = NETservices_Lib.getNew_ST_URI( {
					'stURI_DATA': _stURI_DATA
				} );

				
				
				let _stURIcheck = _stURI.check_ST_URI({
					'context': 'engines',
					'action': 'config'

				});
				

				if (_stURIcheck.checkOK !== true) {
					throw 'Bad sUIRI check. ' + _stURIcheck.errorMSG;
				}
				
				
				// paramater 'type'
				let _paramSearch_type = _stURI.getParameterByName({
					'name': 'type'
				});
				
				if (_paramSearch_type.param === null) {
					throw 'type parameter is required.';
				}
				let _param_type = _paramSearch_type.param;
				

				let _NGNInterface = require('./NGNInterface.js').NGNInterface;
				
				let _engineURL = null;		// used for egine URL
				let _engineModule = null;	// used for egine module
				let _cngnLib = null;		// used for custom engine library
				let _cngnObj = null;		// used for custom engine object
				
				let _ngnInterface = null;	// used for engine interface
				let _ngnItfObject = null;	// used for engine interface object

				let _paramSearch_method = null;
				let _param_method = null;

				
				switch (_param_type.value) {
					
					// For parameter 'type' === 'file'
					case 'file':
						
						// paramater 'method'
						_paramSearch_method = _stURI.getParameterByName({
							'name': 'method'
						});

						if (_paramSearch_method.param === null) {
							throw 'method parameter is required.';
						}
						_param_method = _paramSearch_method.param;
						
						
						switch (_param_method.value) {
						
							case 'ngnInterface':
								
								if (_engineOptions.engineURL === undefined) {
									throw 'option engineURL is required.';
								}
								_engineURL = _engineOptions.engineURL;
								
								
								_cngnLib = require(_engineURL);
								if (_cngnLib.get_NGNInterface === undefined) {
									throw 'get_NGNInterface is required in engine library.';
								}

								try {
									_ngnInterface = _cngnLib.get_NGNInterface({
										'config': {
											'config': _engineOptions,
											'bngnOptions': _bngnOptions
										}
									});

								} catch (_e) {
									throw 'Error at engine interface. ' + _e;
								}
								
								break;
								
	
							default:
								throw 'Bad method parameter';
								// break;
						}
						
						break;
	
						
					// For parameter 'type' === 'module'
					case 'module':
						
						// paramater 'method'
						_paramSearch_method = _stURI.getParameterByName({
							'name': 'method'
						});

						if (_paramSearch_method.param === null) {
							throw 'method parameter is required.';
						}
						_param_method = _paramSearch_method.param;
						

						switch (_param_method.value) {
						
							case 'ngnInterface':
								
								if (_engineOptions.engineModule === undefined) {
									throw 'option engineModule is required.';
								}
								_engineModule = _engineOptions.engineModule;
								
								
								_cngnLib = require(_engineModule);
								
								if (_cngnLib === undefined ||
										_cngnLib === null ) {
									throw 'engineModule: ' + _engineModule + ' not found.';
								}
								
								if (_cngnLib.get_NGNInterface === undefined) {
									throw 'get_NGNInterface is required in engine library.';
								}
	
								try {
									_ngnInterface = _cngnLib.get_NGNInterface({
										'config': {
											'config': _engineOptions,
											'bngnOptions': _bngnOptions
										}
									});
	
								} catch (_e) {
									throw 'Error at engine interface. ' + _e;
								}
								
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
				
				
				// console.log(' < ~ > engineInterface');	// TODO: REMOVE DEBUG LOG
				// console.log(_ngnInterface);	// TODO: REMOVE DEBUG LOG
				
				try {
					_ngnItfObject = new _NGNInterface({
						'engineInterface': _ngnInterface,
						'config': _engineOptions,
						'bngnOptions': _bngnOptions
					});
					
				} catch (_e) {
					throw 'Error at engine interface object. ' + _e;
				}
				
				// console.log(' <~i~> _ngnItfObject');	// TODO: REMOVE DEBUG LOG
				// console.log(_ngnItfObject);	// TODO: REMOVE DEBUG LOG

				
				return _ngnItfObject;
				
			} catch (_e) {
				// TODO: handle exception
				
				console.log('<EEE> st.ngn.baseEngines.initialize_Engine');	// TODO: REMOVE DEBUG LOG
				console.log(' <~> NETservices_Lib.parse_stURI');	// TODO: REMOVE DEBUG LOG

				console.log(_e);	// TODO: REMOVE DEBUG LOG
				console.log(_engineURI);	// TODO: REMOVE DEBUG LOG
				
			}
		}
		// ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ - ~~~ _ ~~~ - ~~~ - ~~~ /\ ~~~
		
	}
		
		
};



let _lib = {
	'BaseEngines_Lib': _baseEngines
};


module.exports = _lib;
