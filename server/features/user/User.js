const mongoose = require( 'mongoose' );
const Routine = require( '../routine/Routine' );
const Program = require( '../program/Program' );

const User = new mongoose.Schema( {
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true},
  routines: [ { type: mongoose.Schema.Types.ObjectId, ref: "Routine" } ],
  programs: [ Program ]
} );

module.exports = mongoose.model( "User", User );
