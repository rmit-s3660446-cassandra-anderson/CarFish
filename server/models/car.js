const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our user schema
const carSchema = new Schema({
  type: {
    brand: String,
    model: String,
    year: Number,
    doors: Number,
    transmission: String
  },
  location: {
    suburb: String,
    street: String
  },
  rate: Number,
  startDate: Date,
  endDate: Date,
  maxLength: Number,
  userNotes: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//create model from schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;