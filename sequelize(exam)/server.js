const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());
app.use(express.json())
const eventroutes = require("./routes/events.route");
const userroutes = require("./routes/users.route");

app.use("/api/event/", eventroutes);
app.use("/api/user/", userroutes);

const db = require("./models");
db.sequelize.sync();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to events." });
});

// set port, listen for requests
// const PORT = 5000
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
