app.controller('PersonalController', ['$scope', '$state', '$ionicActionSheet', '$cordovaCamera', '$rootScope', '$stateParams', function($scope, $state, $ionicActionSheet, $cordovaCamera, $rootScope, $stateParams) {

  // test android $roorScope.uidRef
  var root = $rootScope.uidRef;
  var id = root.child('personal');
  $scope.keyPerson = $stateParams.key;
  var timeKey = new Date().getTime();


  id.on("value", function(snapshot) {
    $scope.rs = snapshot.val();
  });

  $scope.addPerson = {
    friend: false,
    family: false,
    boy: false,
    girl: false,
    favourite: false
  }

  //$scope.pictureURL = 'http://www.placehold.it/300x300';

  $scope.pictureURL = 'img/avartar-home.png';


/*============================ Add Personal  =====================================*/
  $scope.submit = function(name, description, friend, family, boy, girl, favourite, pictureURL) {

    if ($scope.addPerson.friend == false &&
        $scope.addPerson.family == false &&
        $scope.addPerson.boy == false &&
        $scope.addPerson.girl == false) {
      alert('Please Click');

    } else {

      console.log('ok');


      var newData = {
        key: timeKey,
        name: name,
        description: description,
        friend: friend,
        family: family,
        boy: boy,
        girl: girl,
        favourite: favourite,
        pictureURL: pictureURL
      }

      id.push(newData).then(function(ref) {
          $rootScope.data = [];
          $state.go('app.home');
      });
    }
  }

  /*============================ Add Personal  =====================================*/

  /*============================ Update Profile  =====================================*/
    $scope.UpdateProfile = function(key, time, name, description, friend, family, boy, girl, favourite, pictureURL) {
      var childUpdate = id.child(key);
      if (friend == false &&
          family == false &&
          boy == false &&
          girl == false) {
        alert('Please Click');

      } else {

        console.log('ok');

        var newData = {
          key: time,
          name: name,
          description: description,
          friend: friend,
          family: family,
          boy: boy,
          girl: girl,
          favourite: favourite,
          pictureURL: pictureURL
        }

        childUpdate.set(newData).then(function(ref) {
            $state.go('app.home');
        });
      }
    }

    /*============================ Update Profile  =====================================*/



    $scope.clickPic = function() {
      // Show the action sheet

       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<div class="test"><b>Take a Picture</b></div>' },
           { text: '<div class="test"><b>Select From Gallary</b></div>' },

         ],
         titleText: 'Control',
         effect: 'fade',
         speed: 300,
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
           if (index === 0) {


            var options = {
              destinationType: Camera.DestinationType.DATA_URL,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              correctOrientation:true
            }

            $cordovaCamera.getPicture(options).then(function(data){
              $scope.pictureURL = 'data:image/jpeg;base64,' + data;
            },function(error) {
              console.log('camera Error');
            })

           }

           if (index === 1) {
             console.log('Select From Gallary');
           }

           return true;
         }
       });
    }
}])
