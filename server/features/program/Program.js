const mongoose = require( 'mongoose' );
const Routine = require( '../routine/Routine' );

const Program = new mongoose.Schema( {
  date: { type: Date },
  routines: [ { type: mongoose.Schema.Types.ObjectId, ref: "Routine" } ]
} );

module.exports = mongoose.model( "Program", Program );
