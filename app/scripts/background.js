'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var fb = new Firebase('https://hacker-news.firebaseio.com/v0/item');
var post = fb.child('8420948');

post.on('value', function(data){
  console.log('inside callback to post');
  console.log('data is: ', data.val().score);
  chrome.browserAction.setBadgeText({text: data.val().score.toString(10)});
});