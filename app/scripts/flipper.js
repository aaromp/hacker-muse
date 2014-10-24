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

  this.element.addEventListener('transitionend', function() {
    if (this.element.className === 'tab flip-down back-up') {
      this.element.className = 'tab';
    }
  }.bind(this), true);
};

Tab.prototype.setFront = function(content) {
  this.front.innerHTML = content;
};

Tab.prototype.setBack = function(content) {
  this.back.innerHTML = content;
};

Tab.prototype.flipUp = function() {
  if (this.element.className === 'tab') {
    this.element.classList.add('flip-down');
  } else if (this.element.className === 'tab flip-down') {
    this.element.classList.add('back-up');
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
    if(e.keyCode === 40) topTab.flipUp();

    if(e.keyCode === 38) topTab.flipDown();
  });
};

Flipper.prototype.valueOf = function() {
  return this.value;
};
