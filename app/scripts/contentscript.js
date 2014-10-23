'use strict';

// chrome.storage.sync.get(['hackerMuseUser', 'hackerMuseUserData', 'hackerMuseRecentPostData'], function(data){
//   console.log('get hackerMuseUser from Content');
//   console.log(data);
// });

// chrome.runtime.sendMessage({method: 'setHackerMuseUser', user: 'JDoty'}, function(response) {
//   console.log('response from emitted event is: ', response.response);
// });

console.log('\'Allo \'Allo! Content script');

var background;
background = document.createElement('div');
background.classList.add('hn-muse-background');

var thingy = new Flipper(2);

background.appendChild(thingy.element);

var on = false;

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
