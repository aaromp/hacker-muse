'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//firebase api url
var items = new Firebase('https://hacker-news.firebaseio.com/v0/item');
var users = new Firebase('https://hacker-news.firebaseio.com/v0/user');

//get user
var getUser = function(success, unset, context){
  chrome.storage.sync.get('hackerMuseUser', function(data){
    var keys = Object.keys(data);
    if (keys.length === 0){
      unset.call(context);
    } else {
      success.call(context || null, data.hackerMuseUser);
    }
  });
};

//set user
var setUser = function(userName, cb, context){
  chrome.storage.sync.set({'hackerMuseUser': userName}, function(){
    cb.call(context || null);
  });
};

//callback is invoked whenever change to user occurs
//failure is invoked if no data found
var listenToUser = function(user, success, failure){
  users.child(user).on('value', function(data){
    if (data.val() === null) failure();
    else success(data.val());
  });
};

var removeUserListener = function(user, cb){
  if ( cb ) {
    users.child(user).off('value', cb);
  }
  else { 
    users.child(user).off('value');
  }
};

//callback is invoked whenever change to user's most recent post occurs
//or if there is a new most recent post
//failure is invoked if no data found
var mostRecentPost = function(user, success, failure){
  users.child(user).on('value', function(data){
    var submissions, curr;
    data = data.val();
    if (data === null) failure();
    else {
      submissions = data.submitted;
      console.log('data.submitted: ', data.submitted);
      curr = 0;
      (function getPost(){
        if (curr >= submissions.length) failure();
        else {
          items.child(submissions[curr]).on('value', function(data){
            data = data.val();
            if (data !== null && data.type === 'story'){
              success(data);
            }
            else {
              curr++;
              getPost();
            }
          });
        }
      })();
    }
  });
};

var removePostListeners = function(user){
  users.child(user).on('value', function(data){
    if ( data !== null ){
      var submissions  = data.submitted;
      for ( var i = 0; i < submissions.length; i++ ){
        items.child(submissions[i]).off('value');
      }
    }
    users.child(user).off('value');
  });
};


//here are example invocations of those functions
listenToUser('neonkiwi', function(data){
  console.log('user data is: ', data);
});

mostRecentPost('neonkiwi', function(data){
  console.log('post data is: ', data);
}, function(){
  console.log('inside failure cb of listenToPost');
});




console.log('\'Allo \'Allo! Event Page for Browser Action');

var on;

on = false;

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.sendMessage(tab.id, {modal: on}, function(response) {
    on = response.modal;
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  on = !message.modal;
  sendResponse({modal: !on});
});
