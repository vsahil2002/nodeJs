    const express = require('express');
    const router = express.Router();
  
    const userController = require('../controllers/user.controller');
   
    router.post("/register", userController.register)
    router.post("/login", userController.login)
    router.put("/updatepassword/:id", userController.updatePassword)
    router.post("/logout/:id", userController.logout)
    router.post("/forgotpassword", userController.forgotpassword)

    module.exports = router ;
 
  


