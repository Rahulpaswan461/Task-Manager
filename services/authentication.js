const JWT  = require("jsonwebtoken")
const secret = "rahul@123"

function createTokenForUser(user){
    const payload={
        id:user._id,
        fullName:user.fullName,
    }
    const token = JWT.sign(payload,secret)
    console.log("generated token")
    return token;
}

function verifyToken(token){
    const payload = JWT.verify(token,secret)
    return payload;
}

module.exports = {
     createTokenForUser,
     verifyToken
}