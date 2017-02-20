app.controller('MyCtrlController', ['$scope', '$state', '$ionicHistory', '$ionicLoading', '$timeout', function($scope, $state, $ionicHistory, $ionicLoading, $timeout) {

    $scope.photoURL = window.localStorage.dataFacebookPhotoUrl;
    $scope.displayName = window.localStorage.dataFacebookDisplayName;
    $scope.email = window.localStorage.dataFacebookEmail;
    $scope.uid = window.localStorage.dataFacebookUid;

    $scope.logout = function() {


      $ionicLoading.show({
        template: 'Logout Success Please Wait Loading...',
        duration: 3000
      }).then(function(){


        $state.go('login');

        $timeout(function () {
          window.localStorage.removeItem('dataFacebookUid');
          window.localStorage.removeItem('keyID');
          window.localStorage.removeItem('dataFacebookDisplayName');
          window.localStorage.removeItem('dataFacebookEmail');
          window.localStorage.removeItem('dataFacebookPhotoUrl');
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });


        }, 3000);

      });

    }
}])
