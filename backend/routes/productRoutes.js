import {Router} from "express";
// import products from "../data/products.js";
import asyncHandler from "express-async-handler";
import {Product} from "../models/productModel.js";


const router = Router()

router.get('/', asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    }catch (e) {
        console.log(e.message)
    }
}))
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        if (product){
            res.json(product)
        } else {
            res.status(404).json({message: 'Product not found'})
        }


    }catch (e) {
        res.send(e)
        console.log(e.message)

    }
})

export default router
