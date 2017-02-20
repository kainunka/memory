app.controller('MenuController', ['$scope', '$state', function($scope, $state) {

    $scope.photoURL = window.localStorage.dataFacebookPhotoUrl;
    $scope.clickHome = function() {
      window.location.reload(true);
      $state.go('app.home');
    }

}])
