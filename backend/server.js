import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import products from "./data/products.js";
import colors from 'colors'

const app = express()
dotenv.config()
mongoose.set('strictQuery', true)

const PORT = 4000

app.get('/', (req, res) => {
   res.send('server')
})
app.get('/api/products', (req, res) => {
   res.json(products)
})
app.get('/api/products/:id', (req, res) => {
   const {id} = req.params
   const product = products.find(p => p._id === id)
   res.json(product)
})

const start = async () => {
   try {
     await mongoose.connect(process.env.DB_KEY,  ()=> {
         console.log('db connect'.cyan.underline)
         app.listen(PORT, () => {
            console.log('server started'.yellow.underline)
         })
      })
   }catch (e) {
      console.log(e.message.red.underline.bold)
   }
}
start()

