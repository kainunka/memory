app.controller('LocationController', ['$scope', '$state', '$stateParams', '$ionicActionSheet', '$rootScope', '$ionicModal', '$ionicPopup', '$ionicLoading', function($scope, $state, $stateParams, $ionicActionSheet, $rootScope, $ionicModal, $ionicPopup, $ionicLoading) {


 /* ============== Firebase Api Snapshot ==================*/
  $scope.key_id = $stateParams.id;
  $scope.key_edit = $stateParams.edit;

  var timeKey = new Date().getTime();

  var root = $rootScope.uidRef;
  var id = root.child('personal');
  var childLo = root.child('location');
  $scope.favAdd = childLo.child(timeKey);

  $scope.rs = [];
  id.on("value", function(snapshot) {
    $scope.rs = snapshot.val();
  });

  $scope.loRs = [];
  childLo.on("value", function(snapshot) {
    $scope.loRs = snapshot.val();
    console.log($scope.loRs);


  });



/* ============== Firebase Api Snapshot ==================*/


/* ============== Add Note State ==================*/


$scope.addLocation = function(add) {
   $state.go('app.location', { id: $scope.key_id, edit: $scope.addNote = 'add', add: $scope.addNote = add } );
}


/* ============== Add Note State ==================*/



/* =================  functiom Popup Delete  ========================= */
  $scope.showConfirmDelete = function(key) {
    var confirmPopup = $ionicPopup.confirm({
    title: 'Delete!',
    template: 'คุณต้องการลบโน้ตนี้จริงหรือไม่ ?'
  });

    confirmPopup.then(function(res) {
    if(res) {
      var deleteChild = childLo.child(key).remove();
      $scope.deleteChild = deleteChild;
      console.log('ok');
    } else {
      console.log('You are not sure');
    }
    });
  };
/* ================= end  functiom Popup Delete  ========================= */


  $scope.noteClick = function(key) {

  // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<div class="test"><b>Edit Note</b></div>' },
       { text: '<div class="test"><b>Delete Note</b></div>' }
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

         $scope.keyNote = key;

         $state.go('app.favourite', { edit: $scope.keyNote, id: $scope.key_id });


       }

       if (index === 1) {
         $scope.showConfirmDelete(key);
       }

       return true;
     }
   });
  }



}])