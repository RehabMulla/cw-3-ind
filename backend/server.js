//required dependencies
const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.set('port', 3000)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
})

const fs = require('fs');

// logger middleware
app.use((req, res, next) => {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
});

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://RehabMulla:12345@cluster0.hzekf69.mongodb.net/School_Lessons?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

client.connect().then(() => {
  db = client.db('School_Lessons');
}).catch(err => {
  console.error(err);
  process.exit(1);
});

// display a message for root path to show that API is working
app.get('/', (req, res, next) => {
  res.send('Select a collection, e.g., /collection/messages')
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/collection/:collectionName', (req, res, next) => {
  req.collection.find({}).toArray().then(results => {
    res.send(results);
  }).catch(e => {
    console.error(e);
    next(e);
  });
})

// static file server middleware
app.use((req, res, next) => {
  // Uses path.join to find the path where the file should be
  const filePath = path.join(__dirname, 'images', req.url);
  // Built-in fs.stat gets info about a file    
  fs.stat(filePath, (err, fileInfo) => {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) res.sendFile(filePath);
    else next();
  });
});

// to show app is running
app.listen(3000, () => {
  console.log('Express.js server running at localhost:3000')
})

// to post collection
app.post('/collection/:collectionName', (req, res, next) => {
  req.collection.insertOne(req.body).then(results => {
    res.send(results.ops);
  }).catch(e => {
    console.error(e);
    next(e);
  });
});

// to search for lessons using subject and location
app.get('/collection/:collectionName/:search', (req, res, next) => {
  const searchQuery = req.params.search;
  req.collection.find({
    $or: [
      { subject: { $regex: `^${searchQuery}`, $options: "i" } },
      { location: { $regex: `^${searchQuery}`, $options: "i" } }
    ]
  }).toArray().then(results => {
    console.log(results);
    res.send(JSON.parse(JSON.stringify(results)));
  }).catch(e => {
    console.error(e);
    next(e);
  });
});

// middleware error handler
app.use((req, res) => {
  res.status(404)
  res.send("Error! Not found!")
});
