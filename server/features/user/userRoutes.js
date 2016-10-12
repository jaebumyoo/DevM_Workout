const userCtrl = require( './userCtrl' );

module.exports = ( app ) => {
  // app.route( '/api/user' )
  //   .get( userCtrl.getUser )
  //   .post( userCtrl.postUser );
  //
  // app.route( '/api/user/:id' )
  //   .post( userCtrl.postProgramToUser ) // post new program to a user
  //   .delete( userCtrl.deleteProgramFromUser ); // remove a program from a user

  app.route( '/api/user/:email' )
    .get( userCtrl.getUser )
    .post( userCtrl.postUser );

  // app.route( '/api/user/:email/:id' )
  //   .post( userCtrl.postProgramToUser ) // post new program to a user
  //   .delete( userCtrl.deleteProgramFromUser );
};
