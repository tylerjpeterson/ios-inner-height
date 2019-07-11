(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.iosInnerHeight = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * @module ios-inner-height
 *
 * @description Get proper window.innerHeight from iOS devices,
 * excluding URL control and menu bar.
 *
 * @return {function} Callable function to retrieve the
 * cached `window.innerHeight` measurement, specific to the
 * device's current orientation.
 */
module.exports = (function () {
	// Avoid errors when globals are undefined (CI, etc)
	// https://github.com/tylerjpeterson/ios-inner-height/pull/7
	if (typeof window === 'undefined' || typeof navigator === 'undefined') {
		return function () {
			return 0;
		};
	}

	// Non-iOS browsers return window.innerHeight per usual.
	// No caching here since browsers can be resized, and setting
	// up resize-triggered cache invalidation is not in scope.
	/* istanbul ignore if  */
	if (!navigator.userAgent.match(/iphone|ipod|ipad/i)) {
		/**
		 * Avoids conditional logic in the implementation
		 * @return {number} - window's innerHeight measurement in pixels
		 */
		return function () {
			return window.innerHeight;
		};
	}

	// Store initial orientation
	var axis = Math.abs(window.orientation);
	// And hoist cached dimensions
	var dims = {w: 0, h: 0};

	/**
	 * Creates an element with a height of 100vh since iOS accurately
	 * reports vp height (but not window.innerHeight). Then destroy it.
	 */
	var createRuler = function () {
		var ruler = document.createElement('div');

		ruler.style.position = 'fixed';
		ruler.style.height = '100vh';
		ruler.style.width = 0;
		ruler.style.top = 0;

		document.documentElement.appendChild(ruler);

		// Set cache conscientious of device orientation
		dims.w = axis === 90 ? ruler.offsetHeight : window.innerWidth;
		dims.h = axis === 90 ? window.innerWidth : ruler.offsetHeight;

		// Clean up after ourselves
		document.documentElement.removeChild(ruler);
		ruler = null;
	};

	// Measure once
	createRuler();

	/**
	 * Returns window's cached innerHeight measurement
	 * based on viewport height and device orientation
	 * @return {number} - window's innerHeight measurement in pixels
	 */
	return function () {
		if (Math.abs(window.orientation) !== 90) {
			return dims.h;
		}

		return dims.w;
	};
})();

},{}]},{},[1])(1)
});
