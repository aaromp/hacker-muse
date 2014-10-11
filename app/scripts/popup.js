'use strict';

console.log('\'Allo \'Allo! Popup');

var user = document.getElementById('user');

//use chrome.extension.getBackgroundPage() to access namespace of background.js


//this is an example of using getUser and setUser functions
chrome.extension.getBackgroundPage().getUser(function(id){
  console.log('get the user: ', id);
  user.innerText = id;
}, function(){
  chrome.extension.getBackgroundPage().setUser('JDoty', function(){
    console.log('set the user');
  });
}, null);
