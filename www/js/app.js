// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'firebase', 'ngCordova'])


app.run(function($ionicPlatform, $rootScope, $ionicPopup, $cordovaDialogs, $cordovaPushV5, $cordovaDevice, $state, $timeout, $http) {



  var user = {};
  var config = {
    apiKey: "AIzaSyB9iverOh8z6ZeRX5kj1C4faPLHnc1O_R0",
    authDomain: "firstapp-e20a1.firebaseapp.com",
    databaseURL: "https://firstapp-e20a1.firebaseio.com",
    storageBucket: "firstapp-e20a1.appspot.com",
    messagingSenderId: "877097461184"
  };
  firebase.initializeApp(config);

  var fid = window.localStorage.dataFacebookUid;
  var keyID = window.localStorage.keyID;

  var uid = '' + fid;

  $rootScope.ref = firebase.database().ref();

  $rootScope.uidRef = $rootScope.ref.child(uid);
  $rootScope.messaging = firebase.messaging();


  $rootScope.data = [];

  $rootScope.tokenServer = "key=AAAAzDcVJcA:APA91bGaQnjFxefQh_2qqhLB-Kj1OW1EQjyB-aZJB6cxvIqqCNZb4oQtTBaFBCQxfvMFOR_Sr5IVZyPd-fUagvmqFBhjzRLg1bhH7y4h8wlDrt8Jg5Csu3T-4iVIIkUMR-JwJyi_6MM4c5rvWSozygsVopNgTLBBLQ";

  $rootScope.myTimer = 10;
  var myTimerVariable;

  $rootScope.startNoti = true;
  $rootScope.stopNoti = false;

  window.localStorage.keyPush;


  console.log("local = " + $rootScope.keyID);


  $ionicPlatform.ready(function() {

    console.log('fid = ' + fid);


    console.log("key = " + keyID);


    console.log($rootScope.tokenServer);


    $rootScope.sendNotification = function(pushID, messageID) {


      $rootScope.startNoti = false;
      $rootScope.stopNoti = true;

      $rootScope.p = pushID;
      $rootScope.m = messageID;


      $rootScope.myCustomTime = function() {
        $rootScope.myTimer--;
        console.log("MESSAGEMMM" + $rootScope.m);

        if ($rootScope.myTimer == 0) {

          $rootScope.startNoti = true;
          $rootScope.stopNoti = false;

          $timeout.cancel(myTimerVariable);


          $http({
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $rootScope.tokenServer
            },
            data: {
              to : "/topics/" + pushID,
              priority : "high",
              restricted_package_name : "com.ionicframework.sidemenu729108",
              notification : {
                title : "Message to you",
                body : messageID,
                sound : "bootanim",
                icon : "frog",
                color : "#FF9D00",
                click_action: "FCM_PLUGIN_ACTIVITY"
              },
              data: {
                message : messageID,
              }
            }

          }).then(function(result) {
            console.log('Success : ' + JSON.stringify(result));
          }, function(error) {
            console.log('Error', + error);
          });

          $rootScope.myTimer = 10;
          complete(false);
          return false;
        }

        myTimerVariable = $timeout($rootScope.myCustomTime, 1000)
      }

        myTimerVariable = $timeout($rootScope.myCustomTime, 1000)
    }




    $rootScope.stopNotification = function() {
      $rootScope.startNoti = true;
      $rootScope.stopNoti = false;
      $rootScope.myTimer = 10;

      $timeout.cancel(myTimerVariable);
      complete(true);
    }

    var complete = function(forceFulAbort) {
      if (forceFulAbort) {
        alert('You Killed the damn timer');
      } else {
        console.log('send ok');
      }
    }






    FCMPlugin.onTokenRefresh(function(token){
        console.log('TokenID = ' + token);
    });

    FCMPlugin.getToken(function(token){
        console.log('TokenID = ' + token);
    });

    FCMPlugin.subscribeToTopic(keyID);


    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert(data.message);

      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert(data.message);
      }
    });



    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });



  $ionicPlatform.ready(function() {


    // รอรับการทำงานเมื่อทำการสร้างกำหนดการแจ้งเตือนแล้ว
        $rootScope.$on('$cordovaLocalNotification:schedule',
            function (event, notification, state) {
                alert("SCHEDULED:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อแสดงการแจ้งเตือน
        $rootScope.$on('$cordovaLocalNotification:trigger',
            function (event, notification, state) {
                alert("TRIGGER:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการอัพเดทการแจ้งเตือนแล้ว
        $rootScope.$on('$cordovaLocalNotification:update',
            function (event, notification, state) {
                alert("UPDATE:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการเคลียร์รายการแจ้งเตือนนั้นๆ
        $rootScope.$on('$cordovaLocalNotification:clear',
            function (event, notification, state) {
                alert("CLEARED:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการเคลียร์รายการแจ้งเตือนทั้งหมด
        $rootScope.$on('$cordovaLocalNotification:clearall',
            function (event, state) {
                alert("CLEARED ALL:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการยกเลิกการแจ้งเตือน
        $rootScope.$on('$cordovaLocalNotification:cancel',
            function (event, notification, state) {
                alert("CANCELED:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการยกเลิกการแจ้งเตือนทั้งหมด
        $rootScope.$on('$cordovaLocalNotification:cancelall',
            function (event, state) {
                alert("CANCELED ALL:"+JSON.stringify(notification));
            });

        // รอรับการทำงานเมื่อทำการคลิกที่รายการแจ้งเตือน
        $rootScope.$on('$cordovaLocalNotification:click',
            function (event, notification, state) {
                alert("CLICKED:"+JSON.stringify(notification));
            });
  });


})









app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuController'

  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  })

    .state('app.addPersonal', {
      url: '/addPersonal',
      views: {
        'menuContent': {
          templateUrl: 'templates/addPersonal.html',
        }
      }
    })


    .state('app.friend', {
      url: '/friend',
      views: {
        'menuContent': {
          templateUrl: 'templates/friend.html',
          controller: 'PersonalController'
        }
      }
    })

    .state('app.family', {
      url: '/family',
      views: {
        'menuContent': {
          templateUrl: 'templates/family.html',
          controller: 'PersonalController'
        }
      }
    })

    .state('app.boy', {
      url: '/boy',
      views: {
        'menuContent': {
          templateUrl: 'templates/boy.html',
          controller: 'PersonalController'
        }
      }
    })

    .state('app.girl', {
      url: '/girl',
      views: {
        'menuContent': {
          templateUrl: 'templates/girl.html',
          controller: 'PersonalController'
        }
      }
    })

    .state('app.list', {
      url: '/list',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html',
          controller: 'listController'
        }
      }
    })


    .state('app.viewNotes', {
      url: '/viewNote/:id/:edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewNotes.html',
          controller: 'NotesController'
        }
      }
    })

    .state('app.note', {
      url: '/note/:id/:edit/:add',
      views: {
        'menuContent': {
          templateUrl: 'templates/note.html',
          controller: 'NoteManageController'
        }
      }
    })

    .state('app.viewFavourites', {
      url: '/viewFavourites/:id/:edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewFavourites.html',
          controller: 'FavouritesController'
        }
      }
    })

    .state('app.favourite', {
      url: '/favourite/:id/:edit/:add',
      views: {
        'menuContent': {
          templateUrl: 'templates/favourite.html',
          controller: 'FavouriteManageController'
        }
      }
    })

    .state('app.viewLocation', {
      url: '/viewLocation/:id/:edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewLocation.html',
          controller: 'LocationController'
        }
      }
    })

    .state('app.location', {
      url: '/location/:id/:edit/:add',
      views: {
        'menuContent': {
          templateUrl: 'templates/location.html',
          controller: 'LocationManageController'
        }
      }
    })

    .state('app.lovers', {
        url: '/lovers',
        views: {
          'menuContent': {
            templateUrl: 'templates/lovers.html',
            controller: 'LoversController'
          }
        }
    })

    .state('app.personal', {
        url: '/personal/:key',
        views: {
          'menuContent': {
            templateUrl: 'templates/personal.html',
            controller: 'PersonalController'
          }
        }
    })

    .state('app.setting', {
        url: '/setting',
        views: {
          'menuContent': {
            templateUrl: 'templates/setting.html',
            controller: 'SettingController'
          }
        }
    })

    .state('app.image', {
        url: '/image',
        views: {
          'menuContent': {
            templateUrl: 'templates/image.html',
            controller: 'ImageController'
          }
        }
    })



  .state('app.myCtrl', {
    url: '/myCtrl',
    views: {
      'menuContent': {
        templateUrl: 'templates/myCtrl.html',
        controller: 'MyCtrlController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  /*if (window.localStorage.dataFacebookUid == null) {
    $urlRouterProvider.otherwise('login');
  } else {
    $urlRouterProvider.otherwise('app/home');
  }*/

  $urlRouterProvider.otherwise('app/home');

});
