const userRoutes = require( './features/user/userRoutes' );
const routineRoutes = require( './features/routine/routineRoutes' );

module.exports = ( app ) => {
  userRoutes( app );
  routineRoutes( app );
};
