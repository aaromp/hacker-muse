'use strict';

var Flipper;

Flipper = function(value) {
  var top, topFront, topBack, bottom, bottomFront, bottomBack, next, nextFront, nextBack;

  this.value = value;
  this.element = document.createElement('div');
  this.element.classList.add('flipper');


  top = document.createElement('div');
  topFront = document.createElement('div');
  topBack = document.createElement('div');

  bottom = document.createElement('div');
  bottomFront = document.createElement('div');
  bottomBack = document.createElement('div');

  next = document.createElement('div');
  nextFront = document.createElement('div');
  nextBack = document.createElement('div');


  this.element.appendChild(top);
  top.appendChild(topFront);
  top.appendChild(topBack);

  this.element.appendChild(bottom);
  bottom.appendChild(bottomFront);
  bottom.appendChild(bottomBack);

  this.element.appendChild(next);
  next.appendChild(nextFront);
  next.appendChild(nextBack);
};

Flipper.prototype.valueOf = function() {
  return this.value;
};