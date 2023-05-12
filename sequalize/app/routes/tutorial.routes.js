// const { tutorials } = require("../models");

// module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

  const tutorials = require("../contollers/tutorial.controller");

  // var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  router.post("/login", tutorials.login);

  // router.post("/profile-verify", tutorials.profile);


  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/get-tutorial/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/update-tutorial/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/delete-tutorial/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/delete-all-tutorials", tutorials.deleteAll);

  // Retrieve a data using search
  router.get("/search", tutorials.search);

  router.get("/sort", tutorials.sort);


  module.exports = router;
  // app.use("/api/tutorials", router);
// };
