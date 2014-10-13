'use strict';

console.log('\'Allo \'Allo! Content script');
var background, modal, on, appendModal, detachModal, toggleModal;
var userview, textfield, button, label, flipper, flipped, image;

background = document.createElement('div');
background.classList.add('hn-muse-background');

modal = document.createElement('div');
modal.classList.add('hn-muse-modal');

/* user view */

userview = document.createElement('div');
userview.classList.add('hn-muse-userview');

textfield = document.createElement('input');
textfield.setAttribute('type', 'text');
textfield.classList.add('hn-muse-textfield');

button = document.createElement('button');
button.classList.add('hn-muse-button');

label = document.createElement('h1');
label.innerHTML = 'Which user do you want to track?';
label.classList.add('hn-muse-label');

modal.appendChild(userview);
userview.appendChild(textfield);
userview.appendChild(button);
userview.appendChild(label);

flipper = document.createElement('div');
flipper.classList.add('hn-muse-flipper');

flipped = document.createElement('div');
flipped.classList.add('hn-muse-flipped');

image = document.createElement('img');
image.src = chrome.extension.getURL('/images/Y.svg');
image.classList.add('hn-muse-image');

modal.appendChild(flipper);
flipper.appendChild(image);
flipper.appendChild(flipped);

appendModal = function() {
  // blur everything in the background
  Array.prototype.forEach.call(document.body.children, function(child) {
    child.classList.add('hn-muse-blur');
  });

  // add background overlay
  document.body.appendChild(background);

  // append modal
  document.body.appendChild(modal);
  window.getComputedStyle(modal).transform; // make sure transform is loaded
  modal.classList.add('hn-muse-on');
};

detachModal = function() {
  // remove blur from everything in the background
  Array.prototype.forEach.call(document.body.children, function(child) {
    child.classList.remove('hn-muse-blur');
  });

  // remove background overlay
  background = document.body.removeChild(background);

  // remove modal
  modal = document.body.removeChild(modal);
  modal.classList.remove('hn-muse-on');
};

toggleModal = function(message) {
  if (!message.modal) appendModal();
  else detachModal();
  on = !message.modal;
};

on = false;

// add listener for escape key
document.addEventListener('keyup', function(e) {
  if(e.keyCode === 27) {
    if (on) chrome.runtime.sendMessage({modal: on}, toggleModal);
  }
});

// add modal click listener
background.addEventListener('click', function() {
  chrome.runtime.sendMessage({modal: on}, toggleModal);
});

// add background script listener
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  toggleModal(message);
  sendResponse({modal: on});
});
