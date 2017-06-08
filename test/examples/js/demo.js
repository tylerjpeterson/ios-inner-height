'use strict';

var vph = require('./../../../');

var rulerInitial = document.getElementById('ruler-initial');
var rulerLabel = document.getElementById('ruler-label');
var windowInitial = document.getElementById('win-initial');
var windowLabel = document.getElementById('win-label');

var measure = function () {
	rulerInitial.textContent = vph() + 'px';
	windowInitial.textContent = window.innerHeight + 'px';
	update();
};

var update = function () {
	rulerLabel.textContent = vph() + 'px';
	windowLabel.textContent = window.innerHeight + 'px';
};

window.addEventListener('orientationchange', measure);
window.addEventListener('scroll', update);
measure();
