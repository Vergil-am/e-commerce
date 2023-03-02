const router = require("express").Router();
const User = require("../models/user");
const argon2 = require("argon2");
const { findOne } = require("../models/user");
const JWT = require("jsonwebtoken");


//Register
router.post("/register", async (req, res) => {
    try{
        const hashedPassword = await argon2.hash(req.body.Password);
        console.log(hashedPassword);
        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: hashedPassword,
            isAdmin: req.body.isAdmin,
    
        });
        const saveduser = await newUser.save();
        res.status(201).json(saveduser);
        console.log(saveduser);
    }catch (err) {
        res.status(500).json(err)
    }
});

//log in
router.post("/login", async (req, res) => {
    
    try {
        const user = await User.findOne({Email: req.body.Email});
        if (!user){
            res.status(401).json("this user doesn't exist")
        } else if(await argon2.verify(user.Password, req.body.Password)){
            const accesstoken = JWT.sign({
                id: user._id, 
                isAdmin : user.isAdmin,
            }, process.env.JWT_key,
            {expiresIn: "30d"})
            const { Password, ...others } = user._doc;
            res.cookie('access_token', accesstoken).status(200).json({...others, accesstoken})
        } else {
            res.status(400).json('wrong credientials')
        }
    } catch(err) {
        res.status(500).json(err)
    }

})



module.exports = router;