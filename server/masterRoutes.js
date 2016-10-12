const userRoutes = require( './features/user/userRoutes' );
const programRoutes = require( './features/program/programRoutes' );

module.exports = ( app ) => {
  userRoutes( app );
  programRoutes( app );
};
