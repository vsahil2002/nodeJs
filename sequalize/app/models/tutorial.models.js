const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("hellos", {
    phoneNumber: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });


  // Tutorial.hasOne(Contact);
  // Contact.belongsTo(Tutorial);
  return Tutorial;
};
