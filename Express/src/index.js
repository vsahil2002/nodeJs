const path = require("path")
const express = require("express");
const app = express();
const port = 4000;

// relative absolute path
// console.log(__dirname)

// console.log(path.join(__dirname ,"../public"))

const staticPath = path.join(__dirname ,"../public")

// built in middleware
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.write("<h1>Hello World!</h1>");
  res.write("<h1>kal ana ho</h1>");
  // to stop loading
  res.send();
});

app.get("/about", (req, res) => {
  res.status(200).send("this is about page");
});

app.get("/api", (req, res) => {
    res.json({
        id:1,
        name:"sahil",
    });
  });
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
