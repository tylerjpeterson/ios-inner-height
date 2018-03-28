'use strict';

var vph = require('./../../..');

var rulerInitial = document.getElementById('ruler-initial');
var windowLabel = document.getElementById('win-label');

var update = function () {
	windowLabel.textContent = window.innerHeight + 'px';
};

var measure = function () {
	rulerInitial.textContent = vph() + 'px';
	update();
};

window.addEventListener('orientationchange', measure);
window.addEventListener('scroll', update);
measure();
