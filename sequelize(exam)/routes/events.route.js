const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/event.controller");

router.post("/create-event", eventsController.create);

module.exports = router;
