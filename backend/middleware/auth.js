const jwt = require('jsonwebtoken')

async function auth(req, res, next){
    try{
        console.log("req", req.cookies)
        const token = req.cookies?.token

        console.log("token",token)

        if(!token){
            return res.json({
                message : "Invalid User",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
            console.log(err) 
            console.log("decoded", decoded)

            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id
            
            next()
          });

        console.log("token", token)

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success: false,
            data : [],
            error : true
        })
    }
}

module.exports = auth