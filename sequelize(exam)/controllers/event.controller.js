const db = require("../models");
const Event = db.events;
console.log("------->eve",Event)
// const Sequelize = db.Sequelize;
// 2 min kham ok
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "content can not be empty",
    });
    return;
  }

  const event = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    userId: req.body.userId,
  };

  console.log("=====================>",event)

  const data = Event.create(event)
    .then((data) => {
      console.log("data======>", data);
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
