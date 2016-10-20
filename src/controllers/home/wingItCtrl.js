function wingItCtrl( $scope, $state, $stateParams, mainSvc ) {
  $scope.getRoutines = () => {
    mainSvc.getRoutines( $stateParams._id ).then( response => {
      $scope.routines = response.data;

      $scope.program = {
        date: new Date(),
        routines: []
      };
    } );
  };

  $scope.ongoingSetIndex = 0;
  $scope.ongoingRoutineIndex = 0;
  $scope.getRoutines();

  $scope.startRoutine = () => {
    if ( !$scope.selectedRoutine ) {
      for ( var i = 0; i < $scope.program.routines.length; i++ ) {
        if ( !$scope.program.routines[ i ].complete ) {
          console.log("$scope.program.routines[ i ]: ", i, $scope.program.routines[ i ]);
          $scope.ongoingRoutineIndex = i;
          break;
        }
      }

      if ( i < $scope.program.routines.length ) {
        $scope.selectedRoutine = $scope.program.routines[ $scope.ongoingRoutineIndex ];
      }
      else {
        delete $scope.ongoingRoutineIndex;
        $scope.programCompleted();
        return;
      }
    }

    console.log( $scope.ongoingSetIndex );
    $scope.setTimer = {
      duration: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].duration,
      restPeriod: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].restPeriod
    }
    console.log( $scope.program.routines );
  };

  $scope.programCompleted = () => {
    console.log( "Program is completed!" );
  };

  $scope.routineCompleted = () => {
    $scope.setTimer = undefined;
    $scope.ongoingSetIndex = 0;
    $scope.selectedRoutine.complete = true;
    console.log( "Routine is completed!", $scope.selectedRoutine.completed );
    delete $scope.selectedRoutine;
    $scope.startRoutine();
  };

  $scope.$on( 'exerciseCompleted', ( event, data ) => {
    console.log( data );
  } );

  $scope.$on( 'setCompleted', ( event, data ) => {
    console.log( data );
    if ( ++$scope.ongoingSetIndex < $scope.selectedRoutine.sets.length )
      $scope.startRoutine();
    else {
      $scope.routineCompleted();
    }
  } );

  $scope.removeRoutine = ( index ) => {
    delete $scope.selectedRoutine;
    $scope.program.routines.splice( index, 1 );
  };

  $scope.selectRoutine = ( routine ) => {
    $scope.setTimer = undefined;
    $scope.selectedRoutine = routine;
    $scope.ongoingSetIndex = 0;
  };

  $scope.add2program = routine => {
    $scope.program.routines.push( routine );
  };

  $scope.back2Home = () => {
    $state.go( 'home' );
  };
}

export default wingItCtrl;
