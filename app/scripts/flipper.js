'use strict';

var Flipper;

Flipper = function(value) {
  var top, topFront, topBack, topFrontOverlay, topBackOverlay;
  // var bottomFront, bottomBack, next, nextFront, nextBack;

  this.value = value;
  this.element = document.createElement('div');
  this.element.classList.add('flipper');


  /* create top tab */
  top = document.createElement('div');
  top.classList.add('tab');
  topFront = document.createElement('div');
  topFront.classList.add('top-front');
  topBack = document.createElement('div');
  topBack.classList.add('top-back');
  topFrontOverlay = document.createElement('div');
  topFrontOverlay.classList.add('top-front-overlay');
  topBackOverlay = document.createElement('div');
  topBackOverlay.classList.add('top-back-overlay');

  // bottom = document.createElement('div');
  // bottom.classList.add('tab');
  // bottomFront = document.createElement('div');
  // bottomFront.classList.add('bottom-front');
  // bottomFront.classList.add('flipper-tab-back');
  // bottomBack = document.createElement('div');
  // bottomBack.classList.add('bottom-back');
  // bottomBack.classList.add('flipper-tab-front');

  // next = document.createElement('div');
  // next.classList.add('tab');
  // nextFront = document.createElement('div');
  // nextFront.classList.add('next-front');
  // nextFront.classList.add('flipper-tab-back');
  // nextBack = document.createElement('div');
  // nextBack.classList.add('next-back');
  // nextBack.classList.add('flipper-tab-front');


  this.element.appendChild(top);
  top.appendChild(topFrontOverlay);
  top.appendChild(topBackOverlay);
  topFrontOverlay.appendChild(topFront);
  topBackOverlay.appendChild(topBack);
  setTimeout(function() {
    console.log('flipped?');
    window.getComputedStyle(top).transition; // make sure transform is loaded
    top.classList.add('flipped');
  }, 7500);
  

  // this.element.appendChild(bottom);
  // bottom.appendChild(bottomFront);
  // bottom.appendChild(bottomBack);

  // this.element.appendChild(next);
  // next.appendChild(nextFront);
  // next.appendChild(nextBack);
};

Flipper.prototype.valueOf = function() {
  return this.value;
};