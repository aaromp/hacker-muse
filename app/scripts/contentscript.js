'use strict';

console.log('\'Allo \'Allo! Content script', 'updated');
var wrapper, div, image, state, detachModal;
wrapper = document.createElement('div');
wrapper.setAttribute('style','position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;');
div = document.createElement('div');
div.setAttribute('style','position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;');
image = document.createElement('img');
image.src = 'http://www.iab.net/extra/adquickref/spinnerLarge.gif';


detachModal = function() {
  wrapper = document.body.removeChild(wrapper);
  div = document.body.removeChild(div);
};

var handleMessage = function(message) {
  console.log('handling message', message);
  if (message === 'on') {      
    document.body.appendChild(wrapper);
    document.body.appendChild(div);
    div.appendChild(image);
    state = 'off';
  }

  if (message === 'off') {
    detachModal();
    state = 'on';
  }
};

wrapper.addEventListener('click', function() {
  chrome.runtime.sendMessage({action: state}, function() {
    handleMessage(state);
  });
});

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  handleMessage(message.action);
  sendResponse({action: state});
});
