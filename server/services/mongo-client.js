const MongoClient = require('mongodb').MongoClient;
const mongoPath = process.env.MONGOPATH || 'mongodb://localhost:27017/myproject';

MongoClient.connect(mongoPath, (err, db) => {
  console.log("Connected correctly to server");

  db.close();
});
