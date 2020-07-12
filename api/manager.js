// ################################################################################
// Encryption operations setup

const scrypt = require('../node-scrypt')
const scryptParams = {N: 1, r:1, p:1}

// ################################################################################
// Data service operations setup

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Data entities
const wordSchema = require('./schemas/wordSchema.js');
const otherWordSchema =  require('./schemas/otherWordSchema.js')
const definitionSchema = require('./schemas/definitionSchema.js')
const userSchema = require('./schemas/userSchema.js')


// ################################################################################
// Define the functions that can be called by server.js

module.exports = function () {

  // Collection properties, which get their values upon connecting to the database
  let Words;
  let OtherWords;
  let Definitions;
  let Users;

  return {

    // ############################################################
    // Connect to the database

    connect: function () {
      return new Promise(function (resolve, reject) {

        // Create connection to the database
        console.log('Attempting to connect to the database...');
        let db = mongoose.createConnection("mongodb+srv://troberts10:TWbmmdbp2020@web425-bkoan.mongodb.net/db-a2?retryWrites=true&w=majority",
                                            { useNewUrlParser: true, useUnifiedTopology: true });
        
        db.on('error', (error) => {
          console.log('Connection error:', error.message);
          reject(error);
        });

        db.once('open', () => {
          console.log('Connection to the database was successful');
          Words = db.model("words", wordSchema, "words");
          OtherWords = db.model("otherWords", otherWordSchema, "otherWords");
          Definitions = db.model("definitions", definitionSchema, "definitions");
          Users = db.model('users', userSchema, 'users');
          resolve();
        });
      });
    },

    // ############################################################
    // Authorize/Authenticate requests

    addUser: function (newUser) {
      return new Promise(function (resolve, reject) {

        //Cheacking to see if word exsists
        Users.find({userName: newUser.userName}, (error, item) => {
          
          //if it's not in database then add it
          if(item.length === 0){

          scrypt.kdf(Buffer.from(newUser.password, "ascii"), scryptParams)
              .then((result) => {
                newUser.password = result.toString('binary')
                
                Users.create(newUser, (error, item) => {
                  if (error) {
                    // Cannot add item
                    return reject(error.message);
                  }
                  //Added object will be returned
                  return resolve(item);
                });
              }, function(err){
            });
          }
          else
            return reject("***Cannot Perform Operation, word already in database***")
        })
      })
    },

    userLogin: function (user) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        Users.findOne({userName: user.userName})
             .exec((error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          else{
            if(!item){
              reject("Invalid user name")
            } else{
              scrypt.verifyKdf(Buffer.from(item.password, 'ascii'),
                               Buffer.from(user.password, 'ascii')) 
                 .then((res) => { 

                    if(!res)
                      reject({message: "Invalid password"})
                    else      
                      resolve({item})
                  
              }).catch((error) => {reject(error.message)})
            }
          }}
        );
      })},

    // ############################################################
    // word requests

    wordGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        Words.find()
          .sort({wordEnglish: 'asc'})
          .populate('definition')
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    wordGetById: function (id) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        Words.findById(id)
             .populate('definition')
             .exec( (error, item) => {
          if (error) {
            // Find match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },


    wordGetByWord: function (word) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        Words.findOne({wordEnglish: word})
             .populate('definition')
             .exec((error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    wordAdd: function (newWord) {
      return new Promise(function (resolve, reject) {

        //Cheacking to see if word exsists
        Words.find({wordEnglish: newWord.wordEnglish}, (error, item) => {
          
          //if it's not in database then add it
          if(item.length === 0){
            Words.create(newWord, (error, item) => {
              if (error) {
                // Cannot add item
                return reject(error.message);
              }
              //Added object will be returned
              return resolve(item);
            });
          }
          else
            return reject("***Cannot Perform Operation, word already in database***")
        })
      })
    },

    wordEdit: function (newWord) {
      return new Promise(function (resolve, reject) {
       
        Words.findOneAndUpdate(
            {wordEnglish: newWord.wordEnglish}, 
            {$push: {definition: newWord.definition}}, 
            {new: true}, 
            (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    wordDelete: function (word) {
      return new Promise(function (resolve, reject) {

        Words.findOneAndRemove({wordEnglish: word}, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        })
      })
    },

    wordHelpYes: function (word) {
      return new Promise(function (resolve, reject) {

        Words.findOneAndUpdate(
          {wordEnglish: word}, 
          {$inc: {"helpYes" : 1}}, 
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {

            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    wordHelpNo: function (word) {
      return new Promise(function (resolve, reject) {

        Words.findOneAndUpdate(
          {wordEnglish: word}, 
          {$inc: {"helpNo" : 1}}, 
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {

            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    wordLikeDef: function (id) {
      return new Promise(function (resolve, reject) {

        Definitions.findOneAndUpdate({_id: id}, 
          {$inc: {"likes" : 1}}, 
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {

            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },


    // ############################################################
    // definition requests

    definitionGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        Definitions.find()
          .sort({definitionEnglish: 'asc', likes: 'asc'})
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    definitionGetById: function (id) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        Definitions.findById(id, (error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    definitionAdd: function (newItem) {
      return new Promise(function (resolve, reject) {

            Definitions.create(newItem, (error, item) => {
              if (error) {
                // Cannot add item
                return reject(error.message);
              }
              //Added object will be returned
              return resolve(item);
            });
          }
        ) 
    },

    definitionEdit: function (newItem) {
      return new Promise(function (resolve, reject) {
       
        Definitions.findByIdAndUpdate(newItem._id, newItem, { new: true }, (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },



    definitionDelete: function (itemId) {
      return new Promise(function (resolve, reject) {

        Definitions.findByIdAndRemove(itemId, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        })
      })
    },

        // ############################################################
        // otherWord requests

    otherWordGetAll: function () {
      return new Promise(function (resolve, reject) {

        // Fetch all documents
        OtherWords.find()
          .sort({wordNonEnglish: 'asc'})
          .populate('definition')
          .exec((error, items) => {
            if (error) {
              // Query error
              return reject(error.message);
            }
            // Found, a collection will be returned
            return resolve(items);
          });
      })
    },

    otherWordGetById: function (id) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        OtherWords.findById(id)
             .populate('definition')
             .exec( (error, item) => {
          if (error) {
            // Find match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },


    otherWordGetByWord: function (otherWord) {
      return new Promise(function (resolve, reject) {
    
        // Find one specific document
        OtherWords.findOne({wordNonEnglish: otherWord})
             .populate('definition')
             .exec((error, item) => {
          if (error) {
            // Find/match is not found
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Found, one object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    otherWordAdd: function (newWord) {
      return new Promise(function (resolve, reject) {

        //Cheacking to see if otherWord exsists
        OtherWords.find({wordNonEnglish: newWord.wordNonEnglish}, (error, item) => {
          
          //if it's not in database then add it
          if(item.length === 0){
            OtherWords.create(newWord, (error, item) => {
              if (error) {
                // Cannot add item
                return reject(error.message);
              }
              //Added object will be returned
              return resolve(item);
            });
          }
          else
            return reject("***Cannot Perform Operation, OtherWord already in database***")
        })
      })
    },

    otherWordEdit: function (newWord) {
      return new Promise(function (resolve, reject) {
       
        OtherWords.findOneAndUpdate(
          {wordNonEnglish: newWord.wordNonEnglish}, 
          {$push: {definition: newWord.definition}}, 
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {
            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    otherWordDelete: function (otherWord) {
      return new Promise(function (resolve, reject) {

        OtherWords.findOneAndRemove({wordNonEnglish: otherWord}, (error) => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        })
      })
    },

    otherWordHelpYes: function (word) {
      return new Promise(function (resolve, reject) {

        OtherWords.findOneAndUpdate(
          {wordNonEnglish: word}, 
          {$inc: {"helpYes" : 1}}, 
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {

            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    },

    otherWordHelpNo: function (word) {
      return new Promise(function (resolve, reject) {

        OtherWords.findOneAndUpdate(
          {wordNonEnglish: word}, 
          {$inc: {"helpNo" : 1}},
          { new: true }, 
        (error, item) => {
          if (error) {
            // Cannot edit item
            return reject(error.message);
          }
          // Check for an item
          if (item) {

            // Edited object will be returned
            return resolve(item);
          } else {
            return reject('Not found');
          }
        });
      })
    }
  }// return statement that encloses all the function members
} // module.exports
  


