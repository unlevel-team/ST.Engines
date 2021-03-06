"use strict";

/**
 * SomeThings Engines services library
 * 
 * @namespace st.ngn.services
 * @memberof st.ngn 
 * 
 *
 */

/**
 * Import ActuatorsManager
 * @ignore
 */

var ActuatorsManager = require('./ActuatorsManager.js');

/**
 * Import SensorsManager
 * @ignore
 */
var SensorsManager = require('./SensorsManager.js');

var stNGNservices_Lib = {

  "ActuatorsManager": ActuatorsManager,
  "SensorsManager": SensorsManager

};

module.exports = stNGNservices_Lib;
//# sourceMappingURL=stNGNServices_lib.js.map
