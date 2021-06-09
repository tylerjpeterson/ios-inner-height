'use strict';

// Overwrite the user agent
Object.defineProperty(window.navigator, 'platform', {get: () => 'iPhone'});

// Tape tests: https://github.com/substack/tape
const test = require('tape');
const vph = require('./../..');

test('should return proper user agent', assert => {
	assert.equal('iPhone', window.navigator.platform);
	assert.end();
});

test('should return a function if iOS', assert => {
	assert.equal(typeof vph, 'function');
	assert.end();
});

test('should return proper height', assert => {
	assert.equal(vph(), window.innerHeight);
	assert.end();
});

test('should update orientation on orientation change', assert => {
	Object.defineProperty(window, 'orientation', {get: () => 90});
	assert.equal(90, window.orientation);
	assert.end();
});

test('should reverse dimensions on orientation change', assert => {
	assert.equal(vph(), window.innerWidth);
	assert.end();
});

window.close();
