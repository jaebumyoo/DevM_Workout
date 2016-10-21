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

  $scope.onColors = [ '#0082C8', '#73616F', '#E8846C', '#16528E', '#E54B4B', '#A2C5BF', '#167C80' ];
  $scope.showList = false;
  $scope.ongoingSetIndex = 0;
  $scope.ongoingRoutineIndex = 0;
  $scope.getRoutines();

  $scope.startRoutine = () => {
    if ( !$scope.selectedRoutine ) {
      for ( var i = 0; i < $scope.program.routines.length; i++ ) {
        if ( !$scope.program.routines[ i ].complete ) {
          console.log("$scope.program.routines[ i ]: ", i, $scope.program.routines[ i ]);
          $scope.ongoingRoutineIndex = i;
          document.getElementsByClassName( "wingit-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "0 0 7px #000";
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
    document.getElementsByClassName( "wingit-program-routine" )[ $scope.ongoingRoutineIndex ].style.opacity = 0.5;
    document.getElementsByClassName( "wingit-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "none";

    $scope.setTimer = undefined;
    $scope.ongoingSetIndex = 0;
    $scope.selectedRoutine.complete = true;
    console.log( "Routine is completed!", $scope.selectedRoutine.completed );
    delete $scope.selectedRoutine;
    $scope.startRoutine();
  };

  $scope.$on( 'exerciseCompleted', ( event, data ) => {
    var routinesInSelectedProgram = document.getElementsByClassName( "wingit-program-routine" );
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 5 ].style.color="black";
    routinesInSelectedProgram[ $scope.ongoingRoutineIndex ].children[ $scope.ongoingSetIndex + 1 ].children[ 0 ].children[ 5 ].style.textDecoration = "line-through";
  } );

  $scope.$on( 'setCompleted', ( event, data ) => {
    var routinesInSelectedProgram = document.getElementsByClassName( "wingit-program-routine" );
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

  $scope.removeRoutine = ( index ) => {
    delete $scope.selectedRoutine;
    $scope.program.routines.splice( index, 1 );
  };

  $scope.selectRoutine = ( routine, index ) => {
    console.log(document.getElementsByClassName( "wingit-program-routine" ), $scope.ongoingRoutineIndex);

    if( $scope.ongoingRoutineIndex !== undefined )
      document.getElementsByClassName( "wingit-program-routine" )[ $scope.ongoingRoutineIndex ].style.textShadow = "none";

    $scope.setTimer = undefined;
    $scope.selectedRoutine = routine;
    $scope.ongoingSetIndex = 0;
    $scope.ongoingRoutineIndex = index;
    console.log($scope.selectedRoutine);
    document.getElementsByClassName( "wingit-program-routine" )[ index ].style.textShadow = "0 0 7px #000";
  };

  $scope.selectViewRoutine = routine => {
    if ( $scope.viewRoutine == routine )
      delete $scope.viewRoutine;
    else
      $scope.viewRoutine = routine;
  };

  $scope.add2program = routine => {
    $scope.program.routines.push( routine );
  };

  $scope.setInfoPrinter = ( input ) => {
    if ( input ) return input;
    return "N/A";
  };

  $scope.showRoutines = () => {
    $scope.showList = !$scope.showList;
  };

  $scope.back2Home = () => {
    $state.go( 'home' );
  };
}

export default wingItCtrl;
