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
    } );
  };

  $scope.onColors = [ '#0082C8', '#73616F', '#E8846C', '#16528E', '#E54B4B', '#A2C5BF', '#167C80' ];
  $scope.showList = false;
  $scope.ongoingSetIndex = 0;
  $scope.getPrograms();

  $scope.startRoutine = () => {
    $scope.setTimer = {
      duration: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].duration,
      restPeriod: $scope.selectedRoutine.sets[ $scope.ongoingSetIndex ].restPeriod
    }
  };

  $scope.programCompleted = () => {
  };

  $scope.routineCompleted = () => {
    $scope.setTimer = undefined;
    $scope.ongoingSetIndex = 0;
    $scope.selectedRoutine.complete = true;

    document.getElementsByClassName( "workout-selected-program-routine" )[ $scope.ongoingRoutineIndex ].style.opacity = 0.5;
    document.getElementsByClassName( "workout-selected-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "none";

    for ( var i = 0; i < $scope.selectedProgram.routines.length; i++ ) {
      if ( !$scope.selectedProgram.routines[ i ].complete ) {
        $scope.ongoingRoutineIndex = i;
        break;
      }
    }

    if ( i < $scope.selectedProgram.routines.length ) {
      document.getElementsByClassName( "workout-selected-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "0 0 7px #000";

      $scope.selectedRoutine = $scope.selectedProgram.routines[ $scope.ongoingRoutineIndex ];
      $scope.startRoutine();
    }
    else {
      delete $scope.ongoingRoutineIndex;
      $scope.programCompleted();
    }
  };

  $scope.$on( 'exerciseCompleted', ( event, data ) => {
    var routinesInSelectedProgram = document.getElementsByClassName( "workout-selected-program-routine" );
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 5 ].style.color="black";
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 5 ].style.textDecoration = "line-through";
  } );

  $scope.$on( 'setCompleted', ( event, data ) => {
    var routinesInSelectedProgram = document.getElementsByClassName( "workout-selected-program-routine" );
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 0 ].style.color="black";
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 0 ].style.textDecoration = "line-through";
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 7 ].style.color="black";
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 7 ].style.textDecoration = "line-through";

    if ( ++$scope.ongoingSetIndex < $scope.selectedRoutine.sets.length )
      $scope.startRoutine();
    else {
      $scope.routineCompleted();
    }
  } );

  $scope.selectRoutine = ( routine, index ) => {
    if( $scope.ongoingRoutineIndex !== undefined )
      document.getElementsByClassName( "workout-selected-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "none";

    $scope.showList = false;
    $scope.setTimer = undefined;
    $scope.selectedRoutine = routine;
    $scope.ongoingSetIndex = 0;
    $scope.ongoingRoutineIndex = index;

    document.getElementsByClassName( "workout-selected-program-routine" )[ index ].style.textShadow = "0 0 7px #000";
  };

  $scope.selectProgram = ( program ) => {
    $scope.setTimer = undefined;
    $scope.selectedProgram = program;
    $scope.ongoingSetIndex = 0;
    delete $scope.ongoingRoutineIndex;
  };
  // complete first routine, change program, come back to the first program > will trigger already completed routine.

  $scope.setInfoPrinter = ( input ) => {
    if ( input ) return input;
    return "N/A";
  };

  $scope.showPrograms = () => {
    $scope.showList = !$scope.showList;
  };

  $scope.convertDate = ( str ) => {
    return new Date( str );
  };

  $scope.back2Home = () => {
    $state.go( 'home' );
  };
}

export default workoutCtrl;
