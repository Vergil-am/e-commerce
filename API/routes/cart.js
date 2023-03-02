const Cart = require("../models/cart");
const router = require("express").Router();
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");




// Create new Cart
router.post("/", verifyToken, async (req, res) => {
    const NewCart = new Cart(req.body)
    try{
        const savedCart = await NewCart.save();
        res.status(200).json(savedCart);
    }catch(err) {
        res.status(500).json(err)
    }
})


//Update Cart
router.put("/update/:UserID", verifyTokenandAndAuthorization, async (req, res) => {
        try{
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body}, {new: true})
            res.status(200).json(updatedCart)
        }catch (err) {
            res.status(500).json("cant update")
        }
    }
)


// Delete Cart
router.delete("/delete/:userID", verifyTokenandAndAuthorization, async (req, res) =>{
    try{
        await Cart.findOneAndDelete({userID: req.params.userID})
        res.status(200).json("Cart deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

//find Cart
router.get("/:userID", async (req, res) =>{
    try{
        const Cart = await Cart.findOne({userID: req.params.userID})
        res.status(200).json(Cart)
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router;