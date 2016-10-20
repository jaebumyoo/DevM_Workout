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

  if ( !$scope.user )
    $scope.getUser();

  $scope.hoverIn = function( id ) {
    document.getElementById( id ).style.display = "block";
  }

  $scope.hoverOut = function( id ) {
    document.getElementById( id ).style.display = "none";
  }

  $scope.workout = function() {
    $state.go( 'workout', { _id: $scope.user._id } );
  };

  $scope.routine = function() {
    $state.go( 'routine', { _id: $scope.user._id } );
  };

  $scope.schedule = function() {
    $state.go( 'schedule', { _id: $scope.user._id } );
  };

  $scope.wingIt = function() {
    $state.go( 'wingIt', { _id: $scope.user._id } );
  };

  $scope.sample = function() {
    $state.go( 'sample' );
  }
}

export default homeCtrl;
