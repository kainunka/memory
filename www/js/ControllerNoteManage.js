app.controller('NoteManageController', ['$scope','$state', '$rootScope', '$stateParams', function($scope, $state, $rootScope, $stateParams) {

  //var id = $rootScope.uidRef;

  /* ================= Call API ======================*/
  var root = $rootScope.uidRef;
  $scope.key_edit = $stateParams.edit;
  $scope.key_id = $stateParams.id;
  $scope.key_add = $stateParams.add;

  var timeKey = new Date().getTime();
  var noteNote = root.child('note');


  noteNote.on("value", function(snapshot) {
    $scope.noteNoteRs = snapshot.val();
  });

  /* ================= End Call API ======================*/


  /* ============== Click Submit Add ============================= */
  /*$scope.submitAdd = function(title, description) {
      console.log('ok');
      noteNote.push({
        key: timeKey,
        perKey: $scope.key_id,
        title: title,
        description: description,
      }).then(function(ref) {
          $state.go('app.viewNotes', { id: $scope.key_id });
      });
  }*/

/* ============== End Click Submit Add ============================= */

  /* ============== Click Submit Edit ============================= */

  /*$scope.submitEdit = function(key, time, perKey, title, description) {
      console.log('ok');

      var noteEdit = noteNote.child(key);

      noteEdit.set({
        key: time,
        perKey: perKey,
        title: title,
        description: description
      }).then(function(ref) {

           $state.go('app.viewNotes', { id: $scope.key_id });
      });
  }*/

  /* ============== End Click Submit Edit ============================= */

}])
