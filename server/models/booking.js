const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our user schema
const bookingSchema = new Schema({
  startDate: Date,
  endDate: Date,
  cost: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  car: {type: Schema.Types.ObjectId, ref: 'Car'}
});

//create model from schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;