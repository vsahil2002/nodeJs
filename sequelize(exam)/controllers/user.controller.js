const db = require("../models");
const User = db.users;
console.log(User);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
// const Sequelize = db.Sequelize;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists !== null) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashpassword,
    });
    res.json({
      status: 200,
      user: newUser,
      msg: "User registered successfully",
    });
  } catch (err) {
    res.json({
      status: 400,
      msg: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    var matchUser = await User.findOne({ where: { email: email } });
    console.log("MatchUser========================>", matchUser);

    if (!matchUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, matchUser.password);
    console.log("isMatch========================>", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const id = req.params.id;
    console.log("is-------------------------------------------->", email);
    const token = jwt.sign({ password }, secretKey);
    res
      .json({
        statusCode: 200,
        token: token,
        body: {
          success: true,
          message: "User login successful.",
        },
      })
      .send();
  } catch (err) {
    res.json({
      status: 400,
      msg: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });

    if (user === null) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      res
        .json({
          statusCode: 200,
          body: { success: true, message: "User logout successful." },
        })
        .send();
    }
  } catch (err) {
    res.json({
      status: 400,
      msg: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  console.log("----------------------------->",req.body)
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (newpassword !== confirmpassword) {
      return res.status(400).json({ msg: "Confirm Password does not match" });
    }
    const id = req.params.id;
    console.log(id)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const hashPassword = await bcrypt.hash(newpassword, 10);
    // console.log("pass-------->",hashPassword)
    // Update password
    await User.update({ password: hashPassword }, { where: { id: id } });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

//  const forgotpassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     // console.log("===========>",req.headers["authorization"])
//     console.log("===========>")                         
                                                    
//     const token = req.headers["authorization"];
//     if (!token) {
//       return res.status(400).json({ msg: "Please  provide token" });
//     }
//     if (!email) {
//       return res.status(400).json({ msg: "Please  provide email" });
//     }
//     const decoded = jwt.verify(token, secretKey);
//   console.log("dcode==================================>",decoded)
//     const user = await User.findOne({ where: { email: email } });
//     console.log("user6==================================>",user)

//     if (!user) {
//       return res.status(400).json({ msg: "User  not found" });
//     } else {
//       const token = jwt.sign({ id: user.id }, secretKey, {
//         expiresIn: "1m",
//       });
//       // push token into token table in resettoken column

//       const resettoken = await token.update(
//         { resettoken: token },
//         { where: { userId: decoded.id } }
//       );

//       const resetLink = `http://localhost:9999/api/resetpasswod/${token}`;
//       res.json({
//         status: 200,
//         msg: "Reset password link sent to your email",
//         resetLink: resetLink,
//       });
//     }
//   } catch (err) {
//     res.json({
//       status: 400,
//       msg: err.message,
//     });
//   }
// };

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({ msg: "Please provide a token" });
    }

    if (!email) {
      return res.status(400).json({ msg: "Please provide an email" });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
 
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      } else {
        // const newToken = jwt.sign({ id: user.id }, secretKey, {
        //   expiresIn: "1m",
        // });

        // Update resettoken column in the token table
        // await token.update(
        //   { resettoken: newToken },
        //   { where: { userId: decoded.id } }
        // );

        const resetLink = `http://localhost:9999/api/resetpassword/${newToken}`;
        res.json({
          status: 200,
          msg: "Reset password link sent to your email",
          resetLink: resetLink,
        });
      }
    } catch (err) {
      // Handle invalid token error
      return res.status(400).json({ msg: "Invalid token" });
    }
  } catch (err) {
    res.json({
      status: 400,
      msg: err.message,
    });
  }
};


module.exports = {
  register,
  login,
  updatePassword,
  logout,
  forgotpassword,
};
