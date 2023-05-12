// const { events } = require("../models");

// module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
  
    const userController = require('../controllers/user.controller');
   
    router.post("/register", userController.register)
    router.post("/login", userController.login)
    router.post("/updatepassword/:id", userController.updatePassword)
    router.post("/logout/:id", userController.logout)




    module.exports = router ;
 
  


