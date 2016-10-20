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

  $scope.selectRoutine = routine => {
    $scope.selectedRoutine = routine;
  }

  $scope.addRoutine = () => {
    $scope.newRoutine = {
      name: "Routine Name",
      sets: []
    };
  };

  $scope.editSet = ( set ) => {
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
