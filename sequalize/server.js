
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
const routes = require("./app/routes/tutorial.routes");
app.use('/api/tutorials/', routes)

const db = require("./app/models");
db.sequelize.sync()   
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



// set port, listen for requests
// const PORT = 5000
app.listen(7000, () => {
  console.log(`Server is running on port 7000.`);
});