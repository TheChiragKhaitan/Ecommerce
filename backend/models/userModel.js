const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    ProfilePic : String,
    role : String,
},{
    timestamps:true
})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel