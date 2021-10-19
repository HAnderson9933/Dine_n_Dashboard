//middleware
//if user not logged in. an error response is sent back

const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(request, response, next){
        jwt.verify(request.cookies.userToken,
            process.env.JWT_SECRET,
            (error, payload)=>{
                if(error){
                    response.status(401).json({verified:false})
                }else {
                    console.log("go forward");
                    next();
                }
            }
            )
    }
}