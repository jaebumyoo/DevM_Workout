var mongoose = require('mongoose');

const User = require( '../user/User' );
const Program = require( './Program' );

module.exports = {
  getPrograms( req, res ) {
    Program.find( {}, ( err, programs ) => {
      if ( err ) return res.status( 500 ).json( err );
			return res.status( 200 ).json( programs );
    } );
  },

  postProgram( req, res ) {
    new Program( req.body ).save( ( err, program ) => {
  		if ( err ) return res.status( 500 ).json( err );

      User.findByIdAndUpdate(
        req.params.userId,
        { $push: { programs: program._id } },
        ( err, user ) => {}
      );

      return res.status( 201 ).json( program );
  	} );
  },

  getProgram( req, res ) {
    Program.findById()
  },

  deleteProgram( req, res ) {
    Program.findByIdAndRemove( req.params.programId, ( err, response ) => {
      if ( err ) return res.status( 500 ).json( err );

      User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { programs: req.params.programId } },
        ( err, user ) => {}
      );

			return res.status( 200 ).json( response );
    } );
  }
}
