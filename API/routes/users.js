const User = require("../models/user");
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const argon2 = require("argon2")

const router = require("express").Router();



//Update user
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
    if (req.body.Password) {
        req.body.Password = await argon2.hash(req.body.Password);
        try{
            // needs fixing user update not working only works on pawwsord
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body}, {new: true})
            res.status(200).json(updateduser)
        }catch (err) {
            res.status(500).json("cant update")
        }
    } else {
        try {
            const updateduser = await User.findByIdAndUpdate( req.params.id, {
                $set: req.body}, {new : true})
            res.status(200).json(updateduser)
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

// Delete user
router.delete("/delete/:id", verifyTokenandAndAuthorization, async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

//find user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})



//find all users
router.get("/find/", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})



router.post("/newuser", async (req, res) => {
    req.body.Password = await argon2.hash(req.body.Password);
    try {
        const NewUser = new User(req.body)
        res.status(200).json(NewUser)
    } catch (err) {
        res.status(500).json(err)
    }
    
})

module.exports = router








