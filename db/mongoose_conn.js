
const Db = process.env.ATLAS_URI;
const db = require("../models");
const Role = db.role;

  //var _db;

 
module.exports = {
  connectToServer: function (callback) {

    //client.connect(function (err, db) {
      // Verify we got a good "db" object
    //  if (db)
    //  {
    //    _db = db.db("ClassificationDb");
    //    console.log("Successfully connected to MongoDB."); 
    //  }
    //  return callback(err);
     //    });

         db.mongoose
        .connect(Db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            initial();
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
  },
 
  //getDb: function () {
  //  return _db;
  //},
};



  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }