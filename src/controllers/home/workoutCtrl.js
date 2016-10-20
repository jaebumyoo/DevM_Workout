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
  $scope.offColors = [ '#003451', '#322A2F', '#754336', '#142C43', '#5C1E1E', '#42504E', '#083233']
  $scope.showList = false;
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

  $scope.programCompleted = () => {
    console.log( "Program is completed!" );
  };

  $scope.routineCompleted = () => {
    $scope.setTimer = undefined;
    $scope.ongoingSetIndex = 0;
    $scope.selectedRoutine.complete = true;
    console.log( "Routine is completed!", $scope.selectedRoutine.completed );

    var routinesInSelectedProgram = document.getElementsByClassName( "workout-selected-program-routine" );
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].style.color="black";

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

  $scope.$on( 'exerciseCompleted', ( event, data ) => {
    console.log( data );
  } );

  $scope.$on( 'setCompleted', ( event, data ) => {
    var routinesInSelectedProgram = document.getElementsByClassName( "workout-selected-program-routine" );
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].style.color = "black";

    console.log( data );
    if ( ++$scope.ongoingSetIndex < $scope.selectedRoutine.sets.length )
      $scope.startRoutine();
    else {
      $scope.routineCompleted();
    }
  } );

  $scope.selectRoutine = ( routine, context ) => {
    $scope.showList = false;
    $scope.setTimer = undefined;
    $scope.selectedRoutine = routine;
    $scope.ongoingSetIndex = 0;
    $scope.ongoingRoutineIndex = context.$index;

  };

  $scope.selectProgram = ( program ) => {
    $scope.setTimer = undefined;
    $scope.selectedProgram = program;
    $scope.ongoingSetIndex = 0;
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
