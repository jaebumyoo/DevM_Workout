const passport = require( 'passport' );
const session = require('express-session');
const FacebookStrategy = require( 'passport-google-oauth2' ).Strategy;
const config = require( '../config/config.js' );

module.exports = app => {
  app.use( session( { secret: config.mySecrets.secret } ) )
  app.use( passport.initialize() );
  app.use( passport.session() );

  var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

  passport.use( new GoogleStrategy( {
      clientID:     config.google.clientID,
      clientSecret: config.google.secret,
      callbackURL:  config.google.cbURL,
      passReqToCallback   : true
    }, function( request, accessToken, refreshToken, profile, done ) {
      return done( null, profile );
    }
  ) );

  app.get( '/auth/google', passport.authenticate( 'google', { scope:
      [ 'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read' ] } ) );
  app.get( '/auth/google/callback', passport.authenticate( 'google', {
    successRedirect: '/#/home',
    failureRedirect: '/#'
  } ) );

  passport.serializeUser( function( user, done ) {
    done( null, user );
  } );

  passport.deserializeUser( function( obj, done ) {
    done( null, obj );
  } );
}
