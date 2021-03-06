//Heroku link: https://btn710-api.herokuapp.com/

// ################################################################################
// Web service setup

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Add support for incoming JSON entities
app.use(bodyParser.json());
// Add support for CORS
app.use(cors());


// ################################################################################
// Data model and persistent store setup

const manager = require("./manager.js");
const m = manager();


// ################################################################################
// Deliver the app's home page to browser clients

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// ################################################################################
// Request handlers for Authentication and Authorization

app.post('/register', (req, res) =>{
  m.addUser(req.body)
    .then((data) => {

      let payload = { subject: data._id}
      let token = jwt.sign(payload, 'superSecretKey')
      
      res.json({token});
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

app.post('/login', (req, res) =>{
  m.userLogin(req.body)
    .then((data) => {

      let payload = { subject: data._id}
      let token = jwt.sign(payload, 'superSecretKey')
      
      res.json({token});
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

function verifyToken(req, res, next){
  
  if (!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]

  if(token === null) {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'superSecretKey')
  
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }

  req.userId = payload.subject
  next()
};

// Get all words
app.get("/users", (req, res) => {
  
  m.getAllUsers()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// ################################################################################
// Request handlers for English Words

// Get all words
app.get("/words", (req, res) => {
  // Call the manager method
  
  m.wordGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one word by Id
app.get("/words/:id", (req, res) => {
  // Call the manager method
  m.wordGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Get one word by word English
app.get("/words/get/:word", (req, res) => {
  // Call the manager method
  m.wordGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new word with definition
app.post("/words", (req, res) => {

  let newDef = {authorName: req.body.authorName,
    dateCreated: new Date().toLocaleDateString(),
    definition: req.body.definition,
    quality: 0,
    likes: 0
  }   

  m.definitionAdd(newDef)
   .then(addedDef => {

      req.body.definition = addedDef._id;

  // Add the word
  m.wordAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
  })
});

//Edit word to add a defintion
app.put("/words/addDef/:word", (req, res) => {

  let newDef = {authorName: req.body.authorName,
    dateCreated: new Date().toLocaleDateString(),
    definition: req.body.definition,
    quality: 0,
    likes: 0
  }   

  m.definitionAdd(newDef)
   .then(addedDef => {

      req.body.definition = addedDef._id;
      req.body.dateRevised = new Date().toLocaleDateString();

      m.wordEdit(req.body)
        .then((data) => {
          res.json(data);
        })
        .catch(() => {
          res.status(404).json({ "message": "Resource not found addDef" });
      })
    })
});

//incrememt helpYes
app.put("/words/helpYes/:word", (req, res) => {
  // Call the manager method
  m.wordHelpYes(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found helpYes" });
    })
});

//incrememt helpNo
app.put("/words/helpNo/:word", (req, res) => {
  // Call the manager method
  m.wordHelpNo(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found helpNo" });
    })
});

//increment definition Likes
app.put("/definitions/like/:id", (req, res) => {
  // Call the manager method
  m.wordLikeDef(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found likes" });
    })
});

// Delete a word
app.delete("/words/:word", (req, res) => {
  // Call the manager method
  m.wordDelete(req.params.word)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found 2" });
    })
});

// ################################################################################
// Request handlers for definitions

// Get all definitions
app.get("/definitions", (req, res) => {
  // Call the manager method
  
  m.definitionGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one definition by Id
app.get("/definitions/:id", (req, res) => {
  // Call the manager method
  m.definitionGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new definition
app.post("/definitions", (req, res) => {
  // Call the manager method
  m.definitionAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing definition
app.put("/definitions/:id", (req, res) => {
  // Call the manager method
  m.definitionEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found 1" });
    })
});

// Delete a definition
app.delete("/definitions/:id", (req, res) => {
  // Call the manager method
  m.definitionDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found 2" });
    })
});

// ################################################################################
// Request handlers for other words

// Get all otherWords
app.get("/otherWords", verifyToken, (req, res) => {
  
  m.otherWordGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one otherWord by Id
app.get("/otherWords/:id", verifyToken, (req, res) => {

  m.otherWordGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Get one otherWord by word English
app.get("/otherWords/get/:word", verifyToken, (req, res) => {

  m.otherWordGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new otherWord with definition
app.post("/otherWords", verifyToken, (req, res) => {

  let newDef = {authorName: req.body.authorName,
    dateCreated: new Date().toLocaleDateString(),
    definition: req.body.definition,
    quality: 0,
    likes: 0
  }   

  m.definitionAdd(newDef)
   .then(addedDef => {

      req.body.definition = addedDef._id;

      m.wordGetByWord(req.body.wordEnglish)
        .then(related => {

          req.body.termEnglishId = related._id;

          // Add the otherWord
          m.otherWordAdd(req.body)
            .then((data) => {
              res.json(data);
            })
            .catch((error) => {
              res.status(500).json({ "message": error });
            })
          })
        })
  });

//Edit otherWord to add a defintion
app.put("/otherWords/addDef/:word", verifyToken, (req, res) => {

  let newDef = {authorName: req.body.authorName,
    dateCreated: new Date().toLocaleDateString(),
    definition: req.body.definition,
    quality: 0,
    likes: 0
  }   

  m.definitionAdd(newDef)
   .then(addedDef => {

      req.body.definition = addedDef._id;
      req.body.dateRevised = new Date().toLocaleDateString();

      m.otherWordEdit(req.body)
        .then((data) => {
          res.json(data);
        })
        .catch(() => {
          res.status(404).json({ "message": "Resource not found addDef" });
      })
    })
});

//incrememt helpYes
app.put("/otherWords/helpYes/:word", verifyToken, (req, res) => {
  // Call the manager method
  m.otherWordHelpYes(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found helpYes" });
    })
});

//incrememt helpNo
app.put("/otherWords/helpNo/:word", verifyToken, (req, res) => {
  // Call the manager method
  m.otherWordHelpNo(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found helpNo" });
    })
});

// Delete a otherWord
app.delete("/otherWords/:word", verifyToken, (req, res) => {
  // Call the manager method
  m.otherWordDelete(req.params.word)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found 2" });
    })
});


app.use((req, res) => {
  res.status(404).send("Resource not found last");
});


// Attempt to connect to the database, and
// tell the app to start listening for requests
m.connect().then(() => {
  app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
})
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });