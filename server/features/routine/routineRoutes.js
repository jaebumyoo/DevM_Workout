const routineCtrl = require( './routineCtrl' );

module.exports = ( app ) => {
  app.route( '/api/routine' )
    .get( routineCtrl.getRoutines );
};
