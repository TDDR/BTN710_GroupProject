
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  firstName: String,
  lastName: String,
  role: String,
  joinedOn: {type: Date, required: true}
});

// Make schema available to the application
module.exports = userSchema;
