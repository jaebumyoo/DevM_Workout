const mongoose = require( 'mongoose' );
const User = require( './User' );
const Routine = require( '../routine/Routine' );

module.exports = {
  getUserAll( req, res ) {
    User
      .find( { email: req.params.email } )
      // .find( { email: req.user.email } )
      .populate( "routines" )
      .populate( "programs.routines" )
      .exec( ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user );
      } );
  },

  getUser( req, res ) {
    console.log( req.user.email );
    User.find(
      // { email: req.params.email },
      { email: req.user.email },
      { 'routines': 0, 'programs': 0 },
      ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user[ 0 ] );
      }
    );
  },

  postUser( req, res ) {
    // req.body.email = req.params.email;
    req.body.name = req.user.displayName;
    req.body.email = req.user.email;

    new User( req.body ).save( ( err, user ) => {
			if ( err ) return res.status( 500 ).json( err );
			return res.status( 201 ).json( user );
		} );
  },

  getRoutines( req, res ) {
    User
      .findById( req.params._id )
      .populate( "routines" )
      .exec( ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user.routines );
      } );
  },

  postRoutine( req, res ) {
    new Routine( req.body ).save( ( err, routine ) => {
      if ( err ) return res.status( 500 ).json( err );

      User.findByIdAndUpdate( req.params._id, { $push: { routines: routine._id } }, ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
  			return res.status( 201 ).json( user );
      } );
    } );
  },

  putRoutine( req, res ) {
    Routine.findByIdAndUpdate( req.params._routineId, req.body, ( err, routine ) => {
      if ( err ) return res.status( 500 ).json( err );
      return res.status( 200 ).json( routine );
    } );
  },

  deleteRoutine( req, res ) {
    Routine.findByIdAndRemove( req.params._routineId, ( err, response ) => {
      if ( err ) return res.status( 500 ).json( err );

      User.findByIdAndUpdate(
        req.params._id,
        { $pull: { routines: req.params._routineId } },
        ( err, user ) => {
          for ( let i = 0; i < user.programs.length; i++ ) {
            for ( let j = 0; j < user.programs[ i ].routines.length; j++ )
              if ( req.params._routineId === user.programs[ i ].routines[ j ].toString() )
                user.programs[ i ].routines.splice( j, 1 );

            if ( user.programs[ i ].routines.length === 0 ) {
              user.programs.splice( i, 1 );
              user.save();
            }
          }
        }
      );

      return res.status( 200 ).json( response );
    } );
  },

  getPrograms( req, res ) {
    User
      .findById( req.params._id )
      .populate( "programs.routines" )
      .exec( ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user.programs );
      } );
  },

  postProgram( req, res ) {
    console.log( req.body );
    User.findByIdAndUpdate(
      req.params._id,
      { $push: { programs: req.body } },
      ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user );
      }
    );
  },

  putProgram( req, res ) {
    console.log(req.body);
    User.findById( req.params._id, ( err, user ) => {
      if ( err ) return res.status( 500 ).json( err );

      for ( let i = 0; i < user.programs.length; i++ ) {
        if ( req.params._programId === user.programs[ i ]._id.toString() ) {
          if ( req.body.length === 0 )
            user.programs.splice( i, 1 );
          else
            user.programs[ i ].routines = req.body;

          user.save();
          break;
        }
      }

      return res.status( 200 ).json( user );
    } );
  },

  deleteProgram( req, res ) {
    User.findByIdAndUpdate(
      req.params._id,
      { $pull: { programs: { _id: req.params._programId } } },
      ( err, user ) => {
        if ( err ) return res.status( 500 ).json( err );
        return res.status( 200 ).json( user );
      }
    )
  }
}
