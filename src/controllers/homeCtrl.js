function homeCtrl( $scope, $state ) {
  $scope.workout = function() {
    $state.go( 'workout' );
  };

  $scope.routine = function() {
    $state.go( 'routine' );
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
