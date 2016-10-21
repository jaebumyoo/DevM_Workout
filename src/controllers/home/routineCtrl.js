function routineCtrl( $scope, $state, $stateParams, mainSvc ) {
  $scope.getRoutines = () => {
    mainSvc.getRoutines( $stateParams._id ).then( response => {
      $scope.routines = response.data;
    } );

    if ( $stateParams.routine !== null ) {
      $scope.newRoutine = $stateParams.routine;
    }
  };

  $scope.getRoutines();

  $scope.addRoutine = () => {
    $scope.newRoutine = {
      name: "Routine Title",
      sets: []
    };
  };

  $scope.editSetAndRoutine = ( routine, set ) => {
    if( routine !== undefined ) {
      $scope.newRoutine = {
        _id: routine._id,
        name: routine.name,
        sets: routine.sets.slice()
      };
    }

    $scope.name = set.name;
    $scope.type = set.type;
    $scope.weight = set.weight;
    $scope.numOfReps = set.numOfReps;
    $scope.duration = set.duration;
    $scope.restPeriod = set.restPeriod;

    $scope.setIndex = $scope.newRoutine.sets.indexOf( set );
  }

  $scope.addSet = ( setIndex ) => {
    $scope.newRoutine.sets[ setIndex === undefined ? $scope.newRoutine.sets.length : setIndex ] = {
      name: $scope.name,
      type: $scope.type,
      weight: $scope.weight,
      numOfReps: $scope.numOfReps,
      duration: $scope.duration,
      restPeriod: $scope.restPeriod
    };

    deleteInput();
  }

  $scope.clearSet = () => {
    deleteInput();
  }

  $scope.postRoutine = () => {
    delete $scope.newRoutine._id;

    mainSvc.postRoutine( $stateParams._id, $scope.newRoutine ).then( response => {
      $scope.getRoutines();
    } );

    delete $scope.newRoutine;
    delete $stateParams.routine;
  };

  $scope.putRoutine = () => {
    mainSvc.putRoutine( $stateParams._id, $scope.newRoutine._id, $scope.newRoutine ).then( response => {
      $scope.getRoutines();
    } );

    delete $scope.newRoutine;
    delete $stateParams.routine;
  }

  $scope.cancelPost = () => {
    deleteInput();
    delete $scope.newRoutine;
  }

  $scope.editRoutine = ( routine ) => {
    $scope.newRoutine = {
      _id: routine._id,
      name: routine.name,
      sets: routine.sets.slice()
    }
  }

  $scope.deleteRoutine = ( _routineId ) => {
    mainSvc.deleteRoutine( $stateParams._id, _routineId ).then( response => {
      $scope.getRoutines();
    } );
  }

  $scope.showSets = ( index, inOut ) => {
    var routineOfInterest = document.getElementsByClassName( "routine-routines" )[ index ];
    var sizeOfRoutine = -6;

    if ( !inOut ) {
      routineOfInterest.style.paddingTop = "0";
      routineOfInterest.children[ 0 ].children[ 3 ].style.display = "block";

      for ( let i = 0; i < routineOfInterest.children[ 0 ].children.length; i++ ) {
        sizeOfRoutine += routineOfInterest.children[ 0 ].children[ i ].offsetHeight;
      }

      routineOfInterest.style.height = sizeOfRoutine + "px";
    }
    else {
      routineOfInterest.children[ 0 ].children[ 3 ].style.display = "none";
      routineOfInterest.style.paddingTop = "18%";
      routineOfInterest.style.height = "0";
    }
  }

  $scope.setInfoPrinter = ( input ) => {
    if ( input ) return input;
    return "N/A";
  };

  $scope.back2Home = () => {
    $state.go( 'home' );
  }

  function deleteInput() {
    delete $scope.name;
    delete $scope.type;
    delete $scope.weight;
    delete $scope.numOfReps;
    delete $scope.duration;
    delete $scope.restPeriod;
    $scope.setIndex = -1;
  }

}

export default routineCtrl;
