const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user")
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

// Create new order

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, {new: true}
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get user Order
router.get("/find/:userId", verifyTokenandAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all Orders
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;