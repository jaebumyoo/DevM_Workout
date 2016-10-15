const mongoose = require( 'mongoose' );

const Set = new mongoose.Schema( {
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: [ "Machine", "Barbell", "Dumbbell", "etc" ] },
  weight: { type: Number },
  numOfReps: { type: Number },
  duration: { type: Number },
  restPeriod: { type: Number }
} );

 const Routine = new mongoose.Schema( {
  name: { type: String, required: true, trim: true },
  sets: [ Set ]
} );

module.exports = mongoose.model( "Routine", Routine );
