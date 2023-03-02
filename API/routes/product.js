const Product = require("../models/product");
const router = require("express").Router();
const { verifyToken, verifyTokenandAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");




// Create new Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const NewProduct = new Product(req.body)
    try{
        const savedProduct = await NewProduct.save();
        res.status(200).json(savedProduct);
    }catch(err) {
        res.status(500).json(err)
    }
})


//Update Product
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body}, {new: true})
            res.status(200).json(updatedProduct)
        }catch (err) {
            res.status(500).json("cant update")
        }
    }
)

// Delete Product
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

//find Product
router.get("/:id", async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch(err) {
        res.status(500).json(err)
    }
})



//find all Products
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category
    try{
        let products;
        if(qNew){
            products = await Product.find().sort(
                {createdAt: -1}
            ).limit(10)
        }else if (qCategory){
            products = await Product.find({Categories: {
                $in: [qCategory],
            }})
        } else {
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json(err)
    }
})

//Search for certaian properties


module.exports = router;
