const programCtrl = require( './programCtrl' );

module.exports = ( app ) => {
  app.route( '/api/program/' )
    .get( programCtrl.getPrograms );

  app.route( '/api/program/:userId' )
    .post( programCtrl.postProgram );

  app.route( '/api/program/:userId/:programId' )
    .get( programCtrl.getProgram )
    .delete( programCtrl.deleteProgram );
};
