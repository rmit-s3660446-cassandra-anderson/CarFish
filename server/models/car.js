const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our user schema
const carSchema = new Schema({
  type: String,
  licensePlate: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//create model from schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;