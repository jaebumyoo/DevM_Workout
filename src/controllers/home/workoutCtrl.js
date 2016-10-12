function workoutCtrl( $scope, $state ) {
  $scope.routine = function() {
    $state.go( 'routine' );
  };

  $scope.wingIt = function() {
    $state.go( 'wingIt' );
  }

}

export default workoutCtrl;
