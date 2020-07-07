
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema

var wordSchema = new Schema({
  wordEnglish: {type: String, required: true, unique: true},
  wordNonEnglish: String,
  wordExpanded: String,
  languageCode: {type: String, required: true}, 
  image: String,
  imageType: String,
  audio: String,
  audioType: String,
  linkAuthoritative: String,
  linkWikipedia: String,
  linkYouTube: String,
  authorName: {type: String, required: true},
  dateCreated: {type: Date, required: true},
  dateRevised: {type: Date, required: true},
  fieldOfStudy: String,
  helpYes: Number,
  helpNo: Number,
  definition: [{type: Schema.Types.ObjectId,  ref: 'definitions'}]
});

// Make schema available to the application
module.exports = wordSchema;