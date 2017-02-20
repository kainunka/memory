app.controller('FavouriteManageController', ['$scope','$state', '$rootScope', '$stateParams', function($scope, $state, $rootScope, $stateParams) {

  //var id = $rootScope.uidRef;

  /* ================= Call API ======================*/
  var root = $rootScope.uidRef;
  $scope.key_edit = $stateParams.edit;
  $scope.key_id = $stateParams.id;
  $scope.key_add = $stateParams.add;

  var timeKey = new Date().getTime();
  var fav = root.child('favourite');


  fav.on("value", function(snapshot) {
    $scope.favRs = snapshot.val();
  });

  /* ================= End Call API ======================*/

  /* ============== Click Submit Add ============================= */
  $scope.submitAdd = function(title, favourite) {
      console.log('ok');

      if (favourite == 'A') {
        $scope.picUrl = 'img/sport.png';
      }
      if (favourite == 'B') {
        $scope.picUrl = 'img/food.png';
      }
      if (favourite == 'C') {
        $scope.picUrl = 'img/movie.png';
      }
      if (favourite == 'D') {
        $scope.picUrl = 'img/game.png';
      }
      if (favourite == 'E') {
        $scope.picUrl = 'img/music.png';
      }
      if (favourite == 'F') {
        $scope.picUrl = 'img/other.png';
      }


      fav.push({
        key: timeKey,
        perKey: $scope.key_id,
        title: title,
        favourite: favourite,
        pictureURL: $scope.picUrl
      }).then(function(ref) {
          $state.go('app.viewFavourites', { id: $scope.key_id });
      });
  }

/* ============== End Click Submit Add ============================= */

  /* ============== Click Submit Edit ============================= */

  $scope.submitEdit = function(key, time, perKey, title, favourite, pictureURL) {
      console.log('ok');

      var favEdit = fav.child(key);

      if (favourite == 'A') {
        pictureURL = 'img/sport.png';
      }
      if (favourite == 'B') {
        pictureURL = 'img/food.png';
      }
      if (favourite == 'C') {
        pictureURL = 'img/movie.png';
      }
      if (favourite == 'D') {
        pictureURL = 'img/game.png';
      }
      if (favourite == 'E') {
        pictureURL = 'img/music.png';
      }
      if (favourite == 'F') {
        pictureURL = 'img/other.png';
      }


      favEdit.set({
        key: time,
        perKey: perKey,
        title: title,
        favourite: favourite,
        pictureURL: pictureURL
      }).then(function(ref) {

           $state.go('app.viewFavourites', { id: $scope.key_id });
      });
  }

  /* ============== End Click Submit Edit ============================= */

}])
