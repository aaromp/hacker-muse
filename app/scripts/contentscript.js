'use strict';

console.log('\'Allo \'Allo! Content script', 'updated');
var background, modal, image, state, appendModal, detachModal, toggleModal;
background = document.createElement('div');
background.setAttribute('style',
  'opacity: 0.8;' +
  'background-color: #000;' +
  'position: fixed;' +
  'width: 100%;' +
  'height: 100%;' +
  'top: 0px;' +
  'left: 0px;' +
  'z-index: 1000;'
);

modal = document.createElement('div');
modal.setAttribute('style',
  'margin: auto;' +
  'position: absolute;' +
  'width: 600px;' +
  'height: 200px;' +
  'background: #FFF;' +
  'z-index: 1001;' +
  'top: 0;' +
  'left: 0;' +
  'bottom: 0;' +
  'right: 0;'
);

image = document.createElement('img');
image.src = 'http://www.iab.net/extra/adquickref/spinnerLarge.gif';

appendModal = function() {
  document.body.appendChild(background);
  document.body.appendChild(modal);
  modal.appendChild(image);
  
};

detachModal = function() {
  background = document.body.removeChild(background);
  modal = document.body.removeChild(modal);
};

toggleModal = function(on) {
  if (on) {      
    appendModal();
    state = false;
  } else {
    detachModal();
    state = true;
  }
};

background.addEventListener('click', function() {
  chrome.runtime.sendMessage({modal: state}, function() {
    toggleModal(state);
  });
});

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  toggleModal(message.modal);
  sendResponse({modal: state});
});
