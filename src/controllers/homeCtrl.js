function homeCtrl( $scope, $state, mainSvc ) {
  $scope.getUser = function() {
    mainSvc.getUser().then( response => {
      $scope.user = response.data;

      if ( response.data.length === 0 )
        mainSvc.postUser().then( response => {
          $scope.user = response.data;
        } )
    } );
  }

  $scope.getUser();

  $scope.workout = function() {
    $state.go( 'workout', { _id: $scope.user._id } );
  };

  $scope.routine = function() {
    $state.go( 'routine', { _id: $scope.user._id } );
  };

  $scope.schedule = function() {
    $state.go( 'schedule' );
  };

  $scope.wingIt = function() {
    $state.go( 'wingIt' );
  };

  $scope.sample = function() {
    $state.go( 'sample' );
  }
}

export default homeCtrl;
