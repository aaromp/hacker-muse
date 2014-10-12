'use strict';

console.log('\'Allo \'Allo! Content script', 'updated');
var background, modal, image, on, appendModal, detachModal, toggleModal;
background = document.createElement('div');
background.setAttribute('style',
  'opacity: 0.8;' +
  'background-color: #000;' +
  '-webkit-filter: blur(5px) grayscale(50%);' +
  'position: fixed;' +
  'width: 100%;' +
  'height: 100%;' +
  'top: 0px;' +
  'left: 0px;' +
  'transition: all 0.4s ease;' +
  'z-index: 1000;'
);

modal = document.createElement('div');
modal.setAttribute('style',
  
  
  'background: #FF913B;' +
  '-webkit-box-shadow: -1px 3px 3px rgba(0, 0, 0, 0.16);' +
  'z-index: 1001;' +

  // centering
  'margin: auto;' +
  'position: absolute;' +
  'width: 600px;' +
  'height: 200px;' +
  'transform: scale(1.5);' +
  'transition: all 0.4s ease;' +
  'top: 0;' +
  'left: 0;' +
  'bottom: 0;' +
  'right: 0;'
);

appendModal = function() {
  document.body.appendChild(background);
  document.body.appendChild(modal);
};

detachModal = function() {
  background = document.body.removeChild(background);
  modal = document.body.removeChild(modal);
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
