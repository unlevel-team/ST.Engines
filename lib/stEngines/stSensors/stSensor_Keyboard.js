"use strict";

/**
 * import SensorEngine
 * @ignore
 */
let SensorEngine = require('../SensorEngine.js').SensorEngine;

/**
 * import EventEmitter
 * @ignore
 */
let EventEmitter = require('events').EventEmitter;


/**
 * import Cylon
 * @ignore
 */
let Cylon = require('cylon');


/**
 * ST Sensor Keyboard
 * 
 * <pre>
 * Sensor for tests.
 * Uses Cylon library.
 * </pre>
 * 
 * @class
 * @implements SensorEngine
 * 
 */
class STSensor_Keyboard extends SensorEngine {
	
	/**
	 * @constructs STSensor_Keyboard
	 * 
	 * @param {object} config - Configuration object
	 */
	constructor(config) {
		super(config);
		
		this._CylonRobot = null;
		this._CylonRobotState = "stop";
		
	}
	
	/**
	 * Initialize
	 */
	initialize() {
		
		let stSensor = this;
		
		stSensor._CylonRobot = Cylon.robot({
		
			
		  connections: {
		    keyboard: { adaptor: 'keyboard' }
		  },

		  devices: {
		    keyboard: { driver: 'keyboard' }
		  },

		  work: function(my) {
			  
//			  
//		    my.keyboard.on('a', function(key) {
//		      stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"a"});
//		    });
//		    my.keyboard.on('b', function(key) {
//			      stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"b"});
//		    });
		    
			  
		    
		    my.keyboard.on("up", function() {
		    	if (stSensor._CylonRobotState !== "working") {
					  return;
				  }
		        console.log("UP!");
		        stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"up"});
		      });

		      my.keyboard.on("down", function() {
		    	  if (stSensor._CylonRobotState !== "working") {
					  return;
				  }
		        console.log("DOWN!");
		        stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"down"});
		      });

		      my.keyboard.on("left", function() {
		    	  if (stSensor._CylonRobotState !== "working") {
					  return;
				  }
		        console.log("LEFT!");
		        stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"left"});
		      });

		      my.keyboard.on("RIGHT", function() {
		    	  if (stSensor._CylonRobotState !== "working") {
					  return;
				  }
		        console.log("RIGHT!");
		        stSensor.eventEmitter.emit(stSensor.CONSTANTS.Events.SensorData, {"key":"RIGHT"});
		      });
		  }
		  
		});
		
		super.initialize();
		this._CylonRobotState = "ready";

	}
	
	/**
	 * Start engine
	 */
	startEngine() {
		if (this._CylonRobotState === "ready") {
			this._CylonRobot.start();
		}
		
		this._CylonRobotState = "working";
		this.eventEmitter.emit( this.CONSTANTS.Events.SensorEngine_Start );
	}
	
	
	/**
	 * Stop engine
	 */
	stopEngine() {
//		this._CylonRobot.halt();
//		Cylon.halt();
		this._CylonRobotState = "stop";
		this.eventEmitter.emit( this.CONSTANTS.Events.SensorEngine_Stop );

	}
}


module.exports = STSensor_Keyboard;