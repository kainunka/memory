app.controller('HomeController', ['$scope', '$state', '$ionicActionSheet', '$rootScope', '$ionicScrollDelegate', '$ionicPopup', '$cordovaToast', '$http', '$timeout', '$ionicPlatform', '$cordovaLocalNotification', function($scope, $state, $ionicActionSheet, $rootScope, $ionicScrollDelegate, $ionicPopup, $cordovaToast, $http, $timeout, $ionicPlatform, $cordovaLocalNotification) {

    var root = $rootScope.uidRef;
    var id = root.child('personal');

    var now = new Date().getTime();
    var _10SecondsFromNow = new Date(now + 10 * 1000);


    $ionicPlatform.ready(function() {
      $scope.scheduleSingleNotification = function() {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title Here',
          text: 'Text Here',
          badge: 2,
          data: {
              customProperty: 'custom value'
          }
        }).then(function(result) {
          console.log('resultsss' + result);
        })
      }
    });






  $scope.loversMode = function() {
    $state.go('app.lovers');
  }



/* ================= config css animate =================  */
    $scope.animate = "animated fadeIn";
    $scope.clickPerson = "detailClick(name, r.key, r.name, r.description, r.friend, r.family, r.boy, r.girl, r.favourite, r.pictureURL, true);";
    $scope.iconFav = "ion ion-star starColor";
    $scope.iconPer = "ion ion-person";
    $scope.bgStyle = "background-color: #fff;";
    $scope.errNoPer = "ไม่มีบุคคลในหมวดนี้";
    $scope.errNoFav = "เพิ่ม favourite";

/* ================= css animate =================  */


/*  $scope.tokenServer = "key=AAAAzDcVJcA:APA91bGaQnjFxefQh_2qqhLB-Kj1OW1EQjyB-aZJB6cxvIqqCNZb4oQtTBaFBCQxfvMFOR_Sr5IVZyPd-fUagvmqFBhjzRLg1bhH7y4h8wlDrt8Jg5Csu3T-4iVIIkUMR-JwJyi_6MM4c5rvWSozygsVopNgTLBBLQ";*/

/* ===================== My Timer Send Notification ====================*/
    /*$scope.myTimer = 10;
    var myTimerVariable;

    $scope.startNoti = true;
    $scope.stopNoti = false;*/



    /*var request = {
      method: "post",
      url: "http://localhost:8080/push_noti/push.php",
      data: {
        title: $scope.pushID,
        body: $scope.messageID
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/

    $rootScope.data = {
      pushID: '',
      messageID: ''
    };

    $scope.sendNo = function(pushID, messageID) {

      var url =  "http://localhost:8080/push_noti/push.php";


      $rootScope.data = {
        pushID: pushID,
        messageID: messageID
      }


      $http.post(url, {pushID: $rootScope.data.pushID, messageID: $rootScope.data.messageID}).then(function(res) {
        console.log(res);;
      });

      console.log(JSON.stringify($rootScope.data));

    }




  /*  $scope.sendNotification = function(pushID, messageID) {

      $scope.startNoti = false;
      $scope.stopNoti = true;

      $scope.p = pushID;
      $scope.m = messageID;

      $scope.myCustomTime = function() {
        $scope.myTimer--;
        console.log($scope.m);

        if ($scope.myTimer == 0) {

          $scope.startNoti = true;
          $scope.stopNoti = false;

          $timeout.cancel(myTimerVariable);


          $http({
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': $scope.tokenServer
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
            console.log('Success : ' + result);
          }, function(error) {
            console.log('Error', + error);
          });

          $scope.myTimer = 10;
          complete(false);
          return false;
        }

        myTimerVariable = $timeout($scope.myCustomTime, 1000)
      }

        myTimerVariable = $timeout($scope.myCustomTime, 1000)
    }*/


    /*$scope.stopNotification = function() {
      $scope.startNoti = true;
      $scope.stopNoti = false;
      $scope.myTimer = 10;

      $timeout.cancel(myTimerVariable);
      complete(true);
    }

    var complete = function(forceFulAbort) {
      if (forceFulAbort) {
        alert('You Killed the damn timer');
      } else {
        console.log('send ok');
      }
    }*/

/* ===================== My Timer Send Notification ====================*/






    id.on("value", function(snapshot) {
      $scope.rs = [];
      $scope.rs = snapshot.val();

      $scope.countFriend = 0; $scope.countFamily = 0;
      $scope.countBoy = 0; $scope.countGirl = 0;
      $scope.countFavFriend = 0; $scope.countFavFamily = 0;
      $scope.countFavBoy = 0; $scope.countFavGirl = 0;

      angular.forEach(snapshot.val(),function(value, key) {

          if (value.friend == true) {
            $scope.countFriend++;
            if (value.favourite == true) {
              $scope.countFavFriend++;
            }
          }

          if (value.family == true) {
              $scope.countFamily++;
              if (value.favourite == true) {
                $scope.countFavFamily++;
              }
          }

          if (value.boy == true) {
              $scope.countBoy++;
              if (value.favourite == true) {
                $scope.countFavBoy++;
              }
          }

          if (value.girl == true) {
              $scope.countGirl++;
              if (value.favourite == true) {
                $scope.countFavGirl++;
              }
          }


      });




    });




    $scope.titleTextFriend = "My Friend";
    $scope.titleTextFamily = "My Family";
    $scope.titleTextBoy = "Boy";
    $scope.titleTextGirl = "Girl";

    $scope.slideHasChanged = function() {
      $ionicScrollDelegate.$getByHandle('Homedelegate').scrollTop();
    }

    $scope.photoURL = window.localStorage.dataFacebookPhotoUrl;
    $scope.displayName = window.localStorage.dataFacebookDisplayName;
    $scope.textWelcome = 'Welcome';


    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500
    }

    /* =================  functiom Popup Delete  ========================= */
      $scope.showConfirmDelete = function(key) {
        var confirmPopup = $ionicPopup.confirm({
        title: 'Delete!',
        template: 'คุณต้องการลบบุคคลนี้จริงหรือไม่ ?'
      });

        confirmPopup.then(function(res) {
        if(res) {
          var deleteChild = id.child(key).remove();
          $scope.deleteChild = deleteChild;

          var note = root.child('note');
          var fav = root.child('favourite');
          var location = root.child('location');

          note.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.key);

                if (childSnapshot.val().perKey == key) {
                  note.child(childSnapshot.key).remove();
                }

            });
          });

          fav.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.key);

                if (childSnapshot.val().perKey == key) {
                  fav.child(childSnapshot.key).remove();
                }

            });
          });

          location.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.key);

                if (childSnapshot.val().perKey == key) {
                  location.child(childSnapshot.key).remove();
                }

            });
          });

          console.log('ok');
        } else {
          console.log('You are not sure');
        }
        });
      };
    /* ================= end  functiom Popup Delete  ========================= */

    $scope.addClick = function() {
      $state.go('app.addPersonal');
    }

    $scope.goPersonFriend = function() {
      $state.go('app.friend');
    }

    $scope.goPersonFamily = function() {
      $state.go('app.family');
    }

    $scope.goPersonBoy = function() {
      $state.go('app.boy');
    }

    $scope.goPersonGirl = function() {
      $state.go('app.girl');
    }


    $scope.detailClick = function(key, time, name, description, friend, family, boy, girl, favourite, pictureURL, add) {


       if (favourite == true) {
         $scope.textFav = 'Unfavourite';
         $scope.valueUpdate = false;
       } else if (favourite == false) {
         $scope.textFav = 'Add Favourite';
         $scope.valueUpdate = true;
       }


      // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<div class="test"><i class="ion-person"> <b>Profile</b></div>' },
           { text: '<div class="test"><i class="ion-star"></i> <b> ' + $scope.textFav + '</b></div>' },
           { text: '<div class="test"><i class="ion-fireball"> <b>Quick Note</b></div>' },
           { text: '<div class="test"><i class="ion-eye"> <b>View Activity</b></div>' },
           { text: '<div class="test"><i class="ion-trash-a"> <b>Delete Personal</b></div>' }
         ],
         titleText: ' <i class="ion-fireball"></i> Menu  ',
         effect: 'fade',
         speed: 300,
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {

           if (index == 0) {
              $scope.key = key;
              $state.go('app.personal', { key: $scope.key });
           }

           if (index == 1) {

             $scope.countFriend = 0; $scope.countFamily = 0;
             $scope.countBoy = 0; $scope.countGirl = 0;
             $scope.countFavFriend = 0; $scope.countFavFamily = 0;
             $scope.countFavBoy = 0; $scope.countFavGirl = 0;
             var addFav = id.child(key);

             var newData = {
               key: time,
               name: name,
               description: description,
               friend: friend,
               family: family,
               boy: boy,
               girl: girl,
               favourite: $scope.valueUpdate,
               pictureURL: pictureURL
             }

             addFav.set(newData).then(function(ref) {
                 console.log('Favourite Update');

                 if ($scope.valueUpdate == false) {
                   $cordovaToast.showShortTop('Un Favourite');
                 }

                 if ($scope.valueUpdate == true) {
                   $cordovaToast.showShortTop('Add Favourite');
                 }

             });

           }

           if (index === 2) {
             var hideSheet = $ionicActionSheet.show({
               buttons: [
                 { text: '<div class="test"><b>Add Note</b></div>' },
                 { text: '<div class="test"><b>Add Favourite</b></div>' },
                 { text: '<div class="test"><b>Add Location</b></div>' }
               ],
               titleText: '<div class="test"><i class="ion-fireball"></i> Quick Note</div>',
               effect: 'fade',
               speed: 300,
               cancelText: 'Cancel',
               cancel: function() {
                    // add cancel code..
                  },
               buttonClicked: function(index) {
                 if (index === 0) {
                   $state.go('app.note', { id: key, edit: $scope.addNote = 'add', add: $scope.addNote = add } );
                 }

                 if (index === 1) {
                   $state.go('app.favourite', { id: key, edit: $scope.addNote = 'add', add: $scope.addNote = add } );
                 }

                 if (index === 2) {

                   $state.go('app.location', { id: key, edit: $scope.addNote = 'add', add: $scope.addNote = add } );
                 }

                 return true;
               }
             });
           }

           if (index === 3) {
             $scope.key = key;

             var hideSheet = $ionicActionSheet.show({
               buttons: [
                 { text: '<div class="test"><i class="ion-eye"> <b>View Notes</b></div>' },
                 { text: '<div class="test"><i class="ion-ios-star-outline"> <b>View Favourites</b></div>' },
                 { text: '<div class="test"><i class="ion-navigate"> <b>View Location</b></div>' }
               ],
               titleText: '<div class="test"><i class="ion-eye"></i> View</div>',
               effect: 'fade',
               speed: 300,
               cancelText: 'Cancel',
               cancel: function() {
                    // add cancel code..
                  },
               buttonClicked: function(index) {
                 if (index === 0) {
                   $state.go('app.viewNotes', { id: $scope.key });
                 }

                 if (index === 1) {
                   $state.go('app.viewFavourites', { id: $scope.key });
                 }

                 if (index === 2) {
                  $state.go('app.viewLocation', { id: $scope.key });
                 }

                 return true;
               }
             });
           }


           if (index == 4) {
             $scope.showConfirmDelete(key);

           }

           return true;
         }
       });
    }

}])
