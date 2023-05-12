const { Sequelize, Model, DataTypes } = require("sequelize");

// class User extends  Model{}

// User.init({
//  firstName:{
//     type:DataTypes.STRING,
//     allowNull:false
//  },
//  lastName:{
//     type:DataTypes.STRING,
//     defaultValue:"ss"
//  }
// })

const User = async (req, res) => {
  const data = await User.create(
    {
      userName: "sahil",
      isAdmin: true,
    },
    { fields: ["username"] }
  );
  res.status(200).json({ data: data });
};

module.exports = User;
