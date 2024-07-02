async function userLogout(req, res){
    try{
        res.clearCookie("token")

        res.json({
            message : "Logout Successfull",
            data : [],
            error : false,
            success :true,
        })
    }
    catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}

module.exports = userLogout