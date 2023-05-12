const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const connUri = process.env.MONGO_LOCAL_CONN_URL;



module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
        const name = req.body.name;
        const password = req.body.password;
        
        let user = new User();
        user.name = name;
        user.password = password; // document = instance of a model
        // TODO: We can hash the password here before we insert instead of in the model
        user.save((err, user) => {
          if (!err) {
            result.status = status;
            result.result = user;
          } else {
            status = 500;
            result.status = status;
            result.error = err;
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
  
  login: (req, res) => {
    const { name, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if (!err) {
        User.findOne({ name }, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt
              .compare(password, user.password)
              .then((match) => {
                if (match) {
                  result.status = status;
                  result.result = user;
                } else {
                  status = 401;
                  result.status = status;
                  result.error = "Authentication error";
                }
                res.status(status).send(result);
              })
              .catch((err) => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
              });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
};
