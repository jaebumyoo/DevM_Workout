const Routine = require( './Routine' );

module.exports = {
  getRoutines( req, res ) {
    Routine.find( {}, ( err, routines ) => {
      if ( err ) return res.status( 500 ).json( err );
      return res.status( 200 ).json( routines );
    } );
  }
}
