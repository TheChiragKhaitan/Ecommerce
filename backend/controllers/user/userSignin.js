const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    console.log("value", req.body)

    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("Please provide Password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("Check Password", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id : user._id,
        email : user.email,
      }

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
      
      const tokenOption = {
        httpOnly : true,
        secure : true
      }

      res.cookie("token", token, tokenOption).json({
        message : "Login successfull",
        data : token,
        success : true,
        error : false 
      })

    } else {
      throw new Error("Incorrect Password");
    }



  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
