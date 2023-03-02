const JWT = require("jsonwebtoken");

const verifyToken = (req, res ,next) => {
    const token = req.cookies.access_token;
    //const authHeader = req.headers.token
    if (token) {
        //const token = authHeader.split(" ")[1]
        JWT.verify(token, process.env.JWT_key, (err, user) =>{
            if(err) res.status(403).json("invalid token");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("authentication failed")
    }
}
const verifyTokenandAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("authorization failed")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not admin")
        }
    })
    
}

module.exports = { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin }