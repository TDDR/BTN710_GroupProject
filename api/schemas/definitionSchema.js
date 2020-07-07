
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var definitionSchema = new Schema({
  authorName: {type: String, required: true},
  dateCreated: {type: Date, required: true},
  definition: {type: String, required: true},
  quality: Number,
  likes: Number
});

// Make schema available to the application
module.exports = definitionSchema;
