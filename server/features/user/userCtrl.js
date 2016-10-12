const User = require( './User' );
const Program = require( '../program/Program' );

module.exports = {
  getUser( req, res ) {
    User
      .find( { email: req.params.email } )
    // User
    //   .find( { email: req.user.email } )
      .populate( "programs" )
      .exec( ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user );
      } );
  },

  postUser( req, res ) {
    // req.body.name = req.user.displayName;
    // req.body.email = req.user.email;
    req.body.email = req.params.email;
    console.log(req.params.email);

    new User( req.body ).save( ( err, user ) => {
			if ( err ) return res.status( 500 ).json( err );
			return res.status( 201 ).json( user );
		} );
  }

  // postProgramToUser( req, res ) {
  //   User.findOneAndUpdate( { email: req.params.email }, { $push: { programs: req.params.id } }, ( err, program ) => {
  //   // User.findOneAndUpdate( { email: req.user.email }, { $push: { programs: req.params.id } }, ( err, program ) => {
	// 		if ( err ) return res.status( 500 ).json( err );
	// 		return res.status( 200 ).json( program );
	// 	} );
  // },
  //
  // deleteProgramFromUser( req, res ) {
  //   User.find( { email: req.params.email }, ( err, user ) => {
  //   // User.find( { email: req.user.email }, ( err, user ) => {
  //     if ( err ) return res.status( 500 ).json( err );
  //
  //     for ( let i = 0; i < user.programs.length; i++ ) {
  //       if ( req.params.id === user.programs[ i ] ) {
  //         user.programs.splice( i, 1 );
  //         break;
  //       }
  //     }
  //
  //     return res.status( 200 ).json( user );
  //   } );
  // }
}
