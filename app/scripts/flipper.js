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
    if (this.element.className === 'inverted back-up' ||
        this.element.className === 'inverted back-down') {
      this.element.className = 'tab';
    } else if (this.element.className === 'tab flip-up' || 
               this.element.className === 'tab flip-down') {
      this.element.className = 'inverted';
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
  } else if (this.element.className === 'inverted') {
    this.element.classList.add('back-up');
  }

  this.flipped = !this.flipped;
};

Tab.prototype.flipDown = function() {
  if (this.element.className === 'tab') {
    this.element.classList.add('flip-up');
  } else if (this.element.className === 'inverted') {
    this.element.classList.add('back-down');
  }

  this.flipped = !this.flipped;
};

Flipper = function(value) {
  this.value = value;
  this.element = document.createElement('div');
  this.element.classList.add('flipper');

  /* create tab */
  this.topTab = new Tab();
  this.topTab.setFront(this.value);
  this.topTab.setBack('');
  this.bottomTab = new Tab();
  this.bottomTab.setBack(this.value);
  this.nextTab = new Tab();
  this.nextTab.setFront('');

  this.bottomTab.flipUp();

  this.element.appendChild(this.nextTab.element);
  this.element.appendChild(this.bottomTab.element);
  this.element.appendChild(this.topTab.element);

  window.addEventListener('keydown', function(e) {
    // e.preventDefault();

    // if(e.keyCode === 40) this.flipUp(++this.value);

    if(e.keyCode === 38) this.flipDown(--this.value);
  }.bind(this));
};

Flipper.prototype.flipDown = function(value) {
  var top;

  this.value = value;

  if (this.nextTab.flipped) this.nextTab.flipUp();

  this.topTab.setBack(this.value);
  this.bottomTab.setFront('');
  this.nextTab.setBack('');
  this.nextTab.setFront(this.value);

  this.topTab.flipUp();

  top = this.topTab;
  this.topTab = this.bottomTab;
  this.bottomTab = this.nextTab;
  this.nextTab = top;
};

// Flipper.prototype.flipUp = function(value) {
//   var bottom;

//   this.value = value;

//   if (!this.nextTab.flipped) this.nextTab.flipDown();

//   // this.topTab.setFront('front');
//   this.topTab.setBack(this.value);
//   // this.bottomTab.setBack('front');
//   this.bottomTab.setFront('blank');
//   this.nextTab.setBack('blank');
//   this.nextTab.setFront(this.value);

//   this.topTab.flipDown();

//   top = this.topTab;
//   this.topTab = this.bottomTab;
//   this.bottomTab = this.nextTab;
//   this.nextTab = top;
// };

Flipper.prototype.valueOf = function() {
  return this.value;
};
