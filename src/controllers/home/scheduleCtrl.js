function scheduleCtrl( $scope, $state, $stateParams, mainSvc ) {
  $scope.getRoutines = () => {
    mainSvc.getRoutines( $stateParams._id ).then( response => {
      $scope.routines = response.data;
    } );
  };

  $scope.getPrograms = () => {
    mainSvc.getPrograms( $stateParams._id ).then( response => {
      $scope.allPrograms = response.data;
      $scope.selectDate( new Date().setHours( 0, 0, 0, 0 ) );
    } );
  };

  $scope.selectDate = ( date ) => {
    delete $scope.selectedProgram;
    delete $scope.programToEdit;
    delete $scope.selectedSet;
    $scope.programs = [];

    $scope.date = date;

    for ( let i = 0; i < $scope.allPrograms.length; i++ )
      if ( new Date( $scope.allPrograms[ i ].date ).setHours( 0, 0, 0, 0 ) === new Date( date ).getTime() )
        $scope.programs.push( $scope.allPrograms[ i ] );
  };

  $scope.getRoutines();
  $scope.getPrograms();

  $scope.selectProgram = ( program ) => {
    $scope.selectedProgram = program;
    delete $scope.programToEdit;
    delete $scope.selectedSet;
  };

  $scope.addProgram = () => {
    delete $scope.selectedProgram;
    $scope.programToEdit = {
      date: new Date( $scope.date ),
      routines: []
    }
  }

  $scope.postProgram = () => {
    mainSvc.postProgram( $stateParams._id, $scope.programToEdit ).then( response => {
      mainSvc.getPrograms( $stateParams._id ).then( response => {
        $scope.allPrograms = response.data;
        $scope.selectDate( $scope.date );
        $scope.selectProgram( $scope.programs[ $scope.programs.length - 1 ] );
      } );
    } );
  }

  $scope.deleteProgram = () => {
    mainSvc.deleteProgram( $stateParams._id, $scope.selectedProgram._id ).then( response => {
      for ( let i = 0; i < $scope.programs.length; i++ ) {
        if ( $scope.programs[ i ]._id === $scope.selectedProgram._id ) {
          mainSvc.getPrograms( $stateParams._id ).then( response => {
            $scope.allPrograms = response.data;
            $scope.programs.splice( i, 1 );
            delete $scope.selectedProgram;
          } );
        };
      };
    } );
  };

  $scope.editProgram = () => {
    $scope.programToEdit = {
      _id: $scope.selectedProgram._id,
      date: $scope.selectedProgram.date,
      routines: $scope.selectedProgram.routines.slice()
    }
  };

  $scope.addRoutine = ( routine ) => {
    $scope.programToEdit.routines.push( routine );
  };

  $scope.editRoutine = ( routine ) => {
    $state.go( 'routine', { _id: $stateParams._id, routine: routine } );
  };

  $scope.removeRoutine = ( index ) => {
    $scope.programToEdit.routines.splice( index, 1 );
  };

  $scope.putProgram = () => {
    mainSvc.putProgram( $stateParams._id, $scope.programToEdit._id, $scope.programToEdit.routines ).then( response => {
      mainSvc.getPrograms( $stateParams._id ).then( response => {
        $scope.selectedProgram.routines = $scope.programToEdit.routines.slice();
        delete $scope.programToEdit;
      } );
    } );
  };

  $scope.cancelEdit = () => {
    delete $scope.programToEdit;
  };

  $scope.selectSet = ( context ) => {
    context.$parent.selectedSet = context.set;
  }

  $scope.back2Home = () => {
    $state.go( 'home' );
  };
}

export default scheduleCtrl;
