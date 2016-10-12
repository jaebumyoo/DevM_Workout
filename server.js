const express = require( 'express' );
const { json } = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const mongoUri = 'mongodb://localhost:27017/exercise';

const app = express();
const port = 3000;

app.use( json() );
app.use( express.static( `${ __dirname }/public` ) );

mongoose.connect( mongoUri );
mongoose.connection.once( 'open', () => console.log( `Connected to MongoDB at ${ mongoUri }.` ) );

require( './server/features/googleLogin' )( app );

require( './server/masterRoutes' )( app );

app.listen( port, () => `Listening on port ${ port }.`  );
