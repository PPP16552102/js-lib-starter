(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.app = factory()));
})(this, function() {
"use strict";

//#region lib/defaults/index.js
const defaults = { age: 180 };
var defaults_default = defaults;

//#endregion
//#region lib/core/App.js
var App = class {
	constructor() {
		this.name = "hello world";
	}
};
var App_default = App;

//#endregion
//#region lib/env/data.js
const VERSION = "0.1.0";

//#endregion
//#region lib/app.js
function createInstance(defaultConfig) {
	const context = new App_default(defaultConfig);
	return context;
}
const app = createInstance(defaults_default);
app.VERSION = VERSION;
var app_default = app;

//#endregion
return app_default;
});