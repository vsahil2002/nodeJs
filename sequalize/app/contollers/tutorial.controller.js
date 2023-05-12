const express = require("express");
// const bodyParser = require("body-parser");
// console.log("===================")
// console.log(bodyParser);
const jwt = require("jsonwebtoken");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const secretKey = "secretKey";

exports.create = (req, res) => {
  // let dataBody = req.body
  // console.log('.............',req.body);
  // let title = dataBody.title
  // console.log(">>>>++++++++++++++++++++++++++++++++++++++++++++++>>>",title)

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    phoneNumber: req.body.phoneNumber,
  };
  // console.log("===========")
  // Save Tutorial in the database
  const data = Tutorial.create(tutorial)
    .then((data) => {
      console.log("======>", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
  console.log(data);
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log("=======>", req.body.title);
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      console.log("hello------>", num);
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false, // if true than delete all table with column
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// find particular data on search
exports.search = (req, res) => {
  console.log("Search Called");
  // const title = req.body.title;
  // var condition = title ? { title: { [Op.like]: "%ddk1" } } : null;
  // console.log("---------->first", title);
  Tutorial.findAll({ where: { title: { [Op.like]: "%sahil" } } })
    .then((data) => {
      // console.log("-------->", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err---------->", err);
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials.",
      });
    });
};

// sorting the data
exports.sort = (req, res) => {
  Tutorial.findAll({
    where: {},
    order: [["createdAt", "ASC"]], // Sort by createdAt field in Aescending order
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err---------->", err);
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.login = (req, res) => {
  const user = {
    id: 1,
    name: "sahil",
    email: "sahil40@gmail.com",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "5000s" }, (err, token) => {
    res.json({
      token,
    });
  });
};


// exports.verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   console.log("/////////////////////////===",bearerHeader)
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const token = bearer[2];
//     req.token = token;
//     next();
//   } else {
//     res.status(401).send({
//       message: "Authorization header is missing",
//     });
//   }


// };

// exports.profile = this.verifyToken,(req,res)=>{
//   jwt.verify(req.token, secretKey, (err, authData) => {
//     if (err) {
//       res.send({ message: "invalid token" });
//     } else {
//       res.json({
//         message: "authentication successful",
//         authData,
//       });
//     }
//   });
// }