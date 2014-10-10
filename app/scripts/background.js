'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//firebase api url
var fb = new Firebase('https://hacker-news.firebaseio.com/v0/item');

var post = fb.child('8439408');

post.on('value', function(data){
  console.log('inside callback to post');
  console.log('data is: ', data.val().score);
  chrome.browserAction.setBadgeText({text: data.val().score.toString(10)});
});

//get user
var getUser = function(success, unset, context){
  chrome.storage.sync.get('hackerMuseUser', function(data){
    var keys = Object.keys(data);
    if (keys.length === 0){
      unset.call(context);
    } else {
      success.call(context, data.hackerMuseUser);
    }
  });
};

//set user
var setUser = function(userName, cb, context){
  chrome.storage.sync.set({'hackerMuseUser': userName}, function(){
    cb.call(context);
  });
};


var setListeners = function(){
  

};

