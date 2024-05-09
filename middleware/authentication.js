const { verifyToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
     return (req,res,next)=>{
        const tokenValue = req.cookies[cookieName]
        if(!tokenValue)
            return next();

        try{
            const payload = verifyToken(tokenValue)
            req.user = payload;
        } 
       catch(error){
           console.log(error)

       }
       return next()
     }
}

module.exports = {
     checkForAuthenticationCookie
}