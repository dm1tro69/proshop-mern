import {Product} from "../models/productModel.js";

export const getProducts = async (req, res) => {
     try {
         const products = await Product.find({})
         res.json(products)
     }catch (e) {
         res.send(e)
         console.log(e.message)
     }
}

export const getProductById = async (req, res) => {
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
}
