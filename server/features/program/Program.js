const mongoose = require( 'mongoose' );
const Routine = require( '../routine/Routine' );

module.exports = new mongoose.Schema( {
  date: { type: Date },
  routines: [ { type: mongoose.Schema.Types.ObjectId, ref: "Routine" } ]
} );
