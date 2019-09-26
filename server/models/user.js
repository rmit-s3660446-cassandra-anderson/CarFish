const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our user schema
const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  ccNumber: Number,
  csv: Number,
  licenseNumber: String
});

//if a user is deleted, delete all of their cars from the database too
userSchema.pre('remove', function(next) {
  this.model('Car').deleteMany({ user: this._id }, next);
});

//create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;