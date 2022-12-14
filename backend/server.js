import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";



const app = express()
dotenv.config()
mongoose.set('strictQuery', true)

const PORT = 4000

app.use(express.json())

app.get('/', (req, res) => {
   res.send('server')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)






export const start = async () => {
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


