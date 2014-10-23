'use strict';

var Flipper, Tab;

Tab = function() {
  var front, back, frontOverlay, backOverlay;

  this.element = document.createElement('div');
  this.element.classList.add('tab');

  front = document.createElement('div');
  front.innerHTML = 'front';
  front.classList.add('front');

  back = document.createElement('div');
  back.innerHTML = 'back';
  back.classList.add('back');

  frontOverlay = document.createElement('div');
  frontOverlay.classList.add('front-overlay');

  backOverlay = document.createElement('div');
  backOverlay.classList.add('back-overlay');

  this.element.appendChild(frontOverlay);
  this.element.appendChild(backOverlay);
  frontOverlay.appendChild(front);
  backOverlay.appendChild(back);
};

Flipper = function(value) {
  var topTab, bottomTab, nextTab;

  this.value = value;
  this.element = document.createElement('div');
  this.element.classList.add('flipper');


  /* create tab */
  topTab = new Tab();

  this.element.appendChild(topTab.element);


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



  setTimeout(function() {
    // window.getComputedStyle(top).transition; // make sure transform is loaded
    // top.classList.add('flipped');
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