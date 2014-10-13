'use strict';

console.log('\'Allo \'Allo! Content script');
var background, modal, on, appendModal, detachModal, toggleModal;
var userview, textfield, button;

background = document.createElement('div');
background.classList.add('hn-muse-background');

modal = document.createElement('div');
modal.classList.add('hn-muse-modal');

userview = document.createElement('div');
userview.classList.add('hn-muse-userview');

textfield = document.createElement('input');
textfield.setAttribute('type', 'text');
textfield.setAttribute('value', 'default');
button = document.createElement('button');

modal.appendChild(userview);
userview.appendChild(textfield);
userview.appendChild(button);


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
