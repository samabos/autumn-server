const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const corsOptions ={
    origin: '*', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

require("dotenv").config({ path: "./config.env" });

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(require("./routes/record"));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
require('./routes/hscode.routes')(app);
require('./routes/tarrif.routes')(app);
require('./routes/regulation.routes')(app);
require('./routes/currency.routes')(app);
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to autumn application." });
  });
// get driver connection
const dbo = require("./db/mongoose_conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    //if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

// Export the Express API
module.exports = app;