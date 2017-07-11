const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(process.env.MONGODB_URI, function(err, connection) {
  console.log("Connected successfully to server");
  db = connection;
});

module.exports = {
  getAuthUser,
  updateUserDetails
};

function getAuthUser (email) {
  return new Promise (resolve => {
    let collection = db.collection('users');
    return collection.find({ email: email }).toArray().then(docs => {
      resolve(docs.length > 0 ? docs[0] : null);
    });
  });
}

function updateUserDetails(userId, profile) {
  let collection = db.collection('users');
  return collection.findOneAndUpdate({ _id: userId }, {
    $set: {
      displayName: profile.displayName,
      facebookId: profile.id
    }});
}