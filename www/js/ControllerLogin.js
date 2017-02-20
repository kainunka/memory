/*app.factory("Auth", function($firebaseAuth) {

  var config = {
    apiKey: "AIzaSyB9iverOh8z6ZeRX5kj1C4faPLHnc1O_R0",
    authDomain: "firstapp-e20a1.firebaseapp.com",
    databaseURL: "https://firstapp-e20a1.firebaseio.com",
    storageBucket: "firstapp-e20a1.appspot.com"
  };
  var usersRef = firebase.initializeApp(config);
  return $firebaseAuth(usersRef);
})*/

app.controller('LoginController', ['$scope','$state', '$ionicLoading', '$ionicPopup', '$rootScope', function($scope, $state, $ionicLoading, $ionicPopup, $rootScope) {

  var timeKey = new Date().getTime();

    /* facebook id = 277565905991180 App_Name = FirstName */
    $state.go('login');
    $scope.login = function() {

      var fbLoginSuccess = function (userData) {
        console.log("UserInfo: ", userData);
        facebookConnectPlugin.getAccessToken(function(token) {
          console.log("Token: " + token);

          var credential = firebase.auth.FacebookAuthProvider.credential(token);
          firebase.auth().signInWithCredential(credential).then(function(result) {
            user = result;

            var full = user.uid;
            var font = full.slice(0, 4);
            var back = full.slice(24);
            var keyHash = font + back;

            $rootScope.fuid = $rootScope.ref.child(user.uid).child("key");


            $rootScope.fuid.set({
              key: "GB" + keyHash
            }).then(function(ref) {
                console.log("successs");
            });



            $rootScope.fuid.on("value", function(snapshot) {
              window.localStorage.keyID = snapshot.val().key;

              console.log("snaps = " + snapshot.val().key);

              window.localStorage.dataFacebookUid = user.uid
              window.localStorage.dataFacebookPhotoUrl = user.photoURL;
              window.localStorage.dataFacebookDisplayName = user.displayName;
              window.localStorage.dataFacebookEmail = user.email;

              $ionicLoading.show({
                template: 'Login Success Please Wait Loading...',
                duration: 3000
              }).then(function() {

                window.location.reload(true);
                $state.go('app.home');
              });

            });



          }, function(error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
              firebase.auth().fetchProvidersForEmail(error.email).then(function(providers) {
                $ionicPopup.alert({
                    title: 'Login Error!!',
                    template: 'Close App.'
                });
              });
            }
          });

        });
      }

      facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
        function (error) {
          $ionicPopup.alert({
              title: 'Login Error!!',
              template: 'Please Click Login Again..'
          });

        }
      );

    }

}])
