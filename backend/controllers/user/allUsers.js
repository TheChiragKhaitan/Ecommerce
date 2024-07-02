const userModel = require("../../models/userModel")

async function allUsers(req, res){
    try{
        console.log("userId all Users", req.userId)

        const allUser = await userModel.find()

        res.json({
            message: "All Users",
            data: allUser,
            success: true,
            error: false
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = allUsers;