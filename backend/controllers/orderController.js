import {Order} from "../models/orderModel.js";


export const addOrderItem = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    try {
        if (orderItems && orderItems.length === 0){
            res.status(401)
            throw new Error('No order items')
            return
        } else {
           const order = new Order({
               orderItems,
               user: req.user.userId,
               shippingAddress,
               paymentMethod,
               itemsPrice,
               taxPrice,
               shippingPrice,
               totalPrice
           })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }
    }catch (e) {
        res.send(e)
        console.log(e.message)
    }
}
