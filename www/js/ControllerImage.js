app.controller('ImageController', ['$scope', '$state', '$stateParams', '$ionicActionSheet', '$rootScope', '$ionicModal', '$ionicPopup', '$ionicLoading', function($scope, $state, $stateParams, $ionicActionSheet, $rootScope, $ionicModal, $ionicPopup, $ionicLoading) {

  var root = $rootScope.uidRef;
  var id = root.child('image');


  id.on("value", function(snapshot) {
    $scope.rs = snapshot.val();
  });


  $scope.input = {
    url: null
  }

  $scope.addClick = function(add) {


    id.push({
      url: add
    }).then(function(ref) {
        console.log('ok');
    });
      $scope.input.url= null;
  }

}])
