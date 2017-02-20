app.controller('AboutController', ['$scope', function($scope) {
  $scope.photoURL = window.localStorage.dataFacebookPhotoUrl;
  $scope.displayName = window.localStorage.dataFacebookDisplayName;
}])
