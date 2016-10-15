function mainSvc( $http, $rootScope ) {
  this.getUser = () => {
    return $http.get( `api/user` );
  };

  this.postUser = () => {
    return $http.post( `/api/user` );
  };

  this.getRoutines = _id => {
    return $http.get( `/api/user/${ _id }/routine` );
  };

  this.postRoutine = ( _id, routine ) =>  {
    return $http.post( `/api/user/${ _id }/routine`, routine );
  };

  this.putRoutine = ( _id, _routineId, routine ) => {
    return $http.put( `/api/user/${ _id }/routine/${ _routineId }`, routine );
  };

  this.deleteRoutine = ( _id, _routineId ) => {
    return $http.delete( `/api/user/${ _id }/routine/${ _routineId }` );
  };

  this.getPrograms = _id => {
    return $http.get( `/api/user/${ _id }/program` );
  };

  this.exerciseCompleted = ( str ) => {
    $rootScope.$broadcast( 'exerciseCompleted', str );
  };

  this.setCompleted = ( str ) => {
    $rootScope.$broadcast( 'setCompleted', str );
  };
}

export default mainSvc;
