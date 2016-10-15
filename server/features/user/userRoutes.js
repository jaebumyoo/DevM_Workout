const userCtrl = require( './userCtrl' );

module.exports = ( app ) => {
  // app.route( '/api/user/:email' )
  app.route( '/api/user' )
    .get( userCtrl.getUser ) // get a user
    .post( userCtrl.postUser ); // create and save a user

  app.route( '/api/user/:email/all')
  // app.route( '/api/user/all' )
    .get( userCtrl.getUserAll )

  app.route( '/api/user/:_id/routine' )
    .get( userCtrl.getRoutines ) // get all routines
    .post( userCtrl.postRoutine ); // create and save a routine in a user

  app.route( '/api/user/:_id/routine/:_routineId' )
    .put( userCtrl.putRoutine ) // update a routine
    .delete( userCtrl.deleteRoutine ); // delete a routine

  app.route( '/api/user/:_id/program')
    .get( userCtrl.getPrograms )
    .post( userCtrl.postProgram ); // create and save a program in a user

  app.route( '/api/user/:_id/program/:_programId' )
    .put( userCtrl.putProgram ) // update routines in a program
    .delete( userCtrl.deleteProgram ); // delete a program from a user
};
