'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//firebase api url
var items = new Firebase('https://hacker-news.firebaseio.com/v0/item');
var users = new Firebase('https://hacker-news.firebaseio.com/v0/user');

var post = items.child('8439408');

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


//work in progress


//userCB will be invoked on every change of user
//if user submits new post, postCB will be invoked
//if there is a change to current most recent post, postCB will be invoked
var monitor = function(user, userCB, postCB, errorCB){
  users.child(user).on('value', function(data){
    //if no data for user then invoke errorCB
    if (data.val() === null){
      errorCB();
    } else {
      //userCB will be invoked on changes to user
      data = data.val();
      userCB(data);

      if( data.submitted.length > 0){
        var curr = 0;
        (function findRecentPost(){
          if ( curr > data.submitted.length) return;
          var post = data.submitted[0]
        });
      }
        if(data.submitted[i].type === 'story'){
          var post = data.submitted[0];
          items.child(post).on('value', function(data){
            postCB(data.val());
          });
          break;
        }
      }
    }
  });
};

mostRecentPost('neonkiwi', function(d){
  console.log('change to user registered');
  console.log('user: ', d);
}, function(d){console.log('change to most recent post registered');
  console.log('post: ', d);
}, 
    function(){console.log('error registered');}
);








