function workoutCtrl( $scope, $state, $stateParams, mainSvc ) {
  $scope.getPrograms = () => {
    mainSvc.getPrograms( $stateParams._id ).then( response => {
      $scope.programs = response.data;

      for ( let i = 0; i < $scope.programs.length; i++ ) {
        if ( new Date( $scope.programs[ i ].date ).setHours( 0, 0, 0, 0 ) === new Date().setHours( 0, 0, 0, 0 ) ) {
          $scope.selectedProgram = $scope.programs[ i ];
          $scope.selectedRoutine = $scope.selectedProgram.routines[ $scope.ongoingRoutineIndex ];
          break;
        }
      }
    } )
  };

  $scope.ongoingSetIndex = 0;
  $scope.ongoingRoutineIndex = 0;
  $scope.getPrograms();

  $scope.startRoutine = () => {
    console.log( $scope.ongoingSetIndex );
    $scope.setTimer = {
      duration: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].duration,
      restPeriod: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].restPeriod
    }
    console.log( $scope.setTimer );
  };

  $scope.$on( 'exerciseCompleted', ( event, data ) => {
    console.log( data );
  } );

  $scope.programCompleted = () => {
    console.log( "Program is completed!" );
  };

  $scope.routineCompleted = () => {
    $scope.setTimer = undefined;
    $scope.ongoingSetIndex = 0;
    $scope.selectedRoutine.complete = true;
    console.log( "Routine is completed!", $scope.selectedRoutine.completed );

    for ( var i = 0; i < $scope.selectedProgram.routines.length; i++ ) {
      if ( !$scope.selectedProgram.routines[ i ].complete ) {
        $scope.ongoingRoutineIndex = i;
        break;
      }
    }

    if ( i < $scope.selectedProgram.routines.length ) {
      $scope.selectedRoutine = $scope.selectedProgram.routines[ $scope.ongoingRoutineIndex ];
      $scope.startRoutine();
    }
    else {
      delete $scope.ongoingRoutineIndex;
      $scope.programCompleted();
    }
  };

  $scope.$on( 'setCompleted', ( event, data ) => {
    console.log( data );

    if ( ++$scope.ongoingSetIndex < $scope.selectedRoutine.sets.length )
      $scope.startRoutine();
    else {
      $scope.routineCompleted();
    }
  } );

  $scope.selectRoutine = ( routine ) => {
    $scope.setTimer = undefined;
    $scope.selectedRoutine = routine;
    $scope.ongoingSetIndex = 0;
  };

  $scope.selectProgram = ( program ) => {
    $scope.setTimer = undefined;
    $scope.selectedProgram = program;
    $scope.selectedRoutine = $scope.selectedProgram.routines[ 0 ];
    $scope.ongoingSetIndex = 0;
  };
  // complete first routine, change program, come back to the first program > will trigger already completed routine.

  $scope.back2Home = () => {
    $state.go( 'home' );
  };
}

export default workoutCtrl;
