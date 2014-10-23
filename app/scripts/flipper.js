'use strict';

var Flipper, Tab;

Tab = function() {
  var frontOverlay, backOverlay;

  this.flipped = false;

  this.element = document.createElement('div');
  this.element.classList.add('tab');

  this.front = document.createElement('div');
  this.front.classList.add('front');

  this.back = document.createElement('div');
  this.back.classList.add('back');

  frontOverlay = document.createElement('div');
  frontOverlay.classList.add('front-overlay');

  backOverlay = document.createElement('div');
  backOverlay.classList.add('back-overlay');

  this.element.appendChild(frontOverlay);
  this.element.appendChild(backOverlay);
  frontOverlay.appendChild(this.front);
  backOverlay.appendChild(this.back);
};

Tab.prototype.setFront = function(content) {
  this.front.innerHTML = content;
};

Tab.prototype.setBack = function(content) {
  this.back.innerHTML = content;
};

Tab.prototype.toggleDirection = function() {
  this.flipped = !this.flipped;
};

Tab.prototype.flip = function() {
  // if flipped, flip up otherwise, flip down
  if (this.flipped) {
    
  } else {
    window.getComputedStyle(this.element).transition; // make sure transform is loaded
    this.element.classList.add('flipped');
    console.log(this.element.classlist);
  }
};

Flipper = function(value) {
  var topTab, bottomTab, nextTab;

  this.value = value;
  this.element = document.createElement('div');
  this.element.classList.add('flipper');

  /* create tab */
  topTab = new Tab();
  topTab.setFront('front');
  topTab.setBack('back');
  bottomTab = new Tab();
  nextTab = new Tab();

  this.element.appendChild(topTab.element);
  // this.element.appendChild(bottomTab.element);
  // this.element.appendChild(nextTab.element);

  window.addEventListener('keyup', function(e) {
    if(e.keyCode === 40) {
      console.log('flipper!');
      topTab.flip();
    }
  });
};

Flipper.prototype.valueOf = function() {
  return this.value;
};
