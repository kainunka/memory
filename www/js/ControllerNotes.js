app.controller('NotesController', ['$scope', '$state', '$stateParams', '$ionicActionSheet', '$rootScope', '$ionicModal', '$ionicPopup', '$ionicLoading', function($scope, $state, $stateParams, $ionicActionSheet, $rootScope, $ionicModal, $ionicPopup, $ionicLoading) {


 /* ============== Firebase Api Snapshot ==================*/
  $scope.key_id = $stateParams.id;
  $scope.key_edit = $stateParams.edit;

  var root = $rootScope.uidRef;
  var id = root.child('personal');
  var noteNote = root.child('note');
  var timeKey = new Date().getTime();
  $scope.noteAdd = noteNote.child(timeKey);

  $scope.rs = [];
  id.on("value", function(snapshot) {
    $scope.rs = snapshot.val();
  });

  noteNote.on("value", function(snapshot) {
    $scope.noteNoteRs = snapshot.val();

  });



/* ============== Firebase Api Snapshot ==================*/



/* ======================  ionic Modal ==================  */


$ionicModal.fromTemplateUrl('templates/addNote.html', {
  scope: $scope,
  animation: 'slide-left-right',
  focusFirstInput: true
}).then(function(modal) {
  $scope.addNotes = modal;
});


$ionicModal.fromTemplateUrl('templates/editNote.html/', {
  scope: $scope
}).then(function(modal) {
  $scope.editNotes = modal;
});



/* ======================  ionic Modal ==================  */


/* ============== Click Submit Add ============================= */
$scope.submitAdd = function(title, description) {
    console.log('ok');
    noteNote.push({
      key: timeKey,
      perKey: $scope.key_id,
      title: title,
      description: description,
    }).then(function(ref) {
        $scope.addNotes.hide();
        //$state.go('app.viewNotes', { id: $scope.key_id });
    });
}

/* ============== End Click Submit Add ============================= */



/* ============== Click Submit Edit ============================= */

$scope.submitEdit = function(key, time, perKey, title, description) {
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
}

/* ============== End Click Submit Edit ============================= */






/* ============== Add Note State ==================*/


$scope.addNoteClick = function(add) {
   $state.go('app.note', { id: $scope.key_id, edit: $scope.addNote = 'add', add: $scope.addNote = add } );
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
      var deleteChild = noteNote.child(key).remove();
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
         $scope.editNotes.show();

         //$state.go('app.note', { edit: $scope.keyNote, id: $scope.key_id });


       }

       if (index === 1) {

         $scope.showConfirmDelete(key);
       }

       return true;
     }
   });
  }



}])
