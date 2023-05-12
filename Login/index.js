const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "secretKey";

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "sahil",
    email: "sahil40@gmail.com",
  };

  const refreshtoken = jwt.sign({user},secretKey)

  jwt.sign({ user }, secretKey, { expiresIn: "5000s" }, (err, token) => {
    res.json({
      token,
      refreshtoken: refreshtoken,
    });
  });
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[2];
    req.token = token;
    next();
  } else {
    res.status(401).send({
      message: "Authorization header is missing",
    });
  }
};  

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ message: "invalid token" });
    } else {
      res.json({
        message: "authentication successful",
        authData,
      });
    }
  });
});

app.listen(4000, () => {
  console.log("listen to port no 4000");
});
