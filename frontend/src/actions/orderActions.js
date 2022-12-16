import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../constants/orderConst";
import axios from "axios";


export const createOrder = (order) => async (dispatch, getState) => {

    dispatch({type: ORDER_CREATE_REQUEST})

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/orders', order, config)
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data})

    }catch (e) {
        dispatch({type: ORDER_CREATE_FAIL})
        console.log(e)
    }
}
