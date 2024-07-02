const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({email})
    console.log("user is ", user)

    if(user){
        throw new Error("User already exists")
    }

    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("Please provide Password");
    }
    if (!name) {
      throw new Error("Please provide Name");
    }

    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if(!hashPassword){
        throw new Error("Something went wrong")
    }

    const payload = {
        ...req.body,
        role : "GENERAL",
        password : hashPassword
    }

    console.log("payload", payload)

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
        data : saveUser,
        success: true,
        error: false,
        message: "User Created Successfully"
    })

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}


module.exports = userSignUpController