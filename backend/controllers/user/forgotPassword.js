const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs")

const forgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword, confirmNewPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!confirmNewPassword) {
        res.status(400).send({ message: "Confirm New Password is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
     
      const user = await userModel.findOne({ email });
     
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid Email ",
        });
      }

      if(newPassword !== confirmNewPassword){
        return res.status(400).json({
            success: false,
            error: true,
            message: "Password and Confirm Password do not match",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, {new : true});

      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };

  module.exports = forgotPasswordController