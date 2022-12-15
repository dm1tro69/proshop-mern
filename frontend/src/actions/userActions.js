import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../constants/userConst";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    dispatch({type: USER_LOGIN_REQUEST})
     try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
         const {data} = await axios.post('/api/users/login', {email, password}, config)
         dispatch({type: USER_LOGIN_SUCCESS, payload: data})
         localStorage.setItem('userInfo', JSON.stringify(data))
     }catch (e) {
         dispatch({type: USER_LOGIN_FAIL, payload: e.message})
     }
}
export const logout = () => {
    localStorage.removeItem('userInfo')
    return {type: USER_LOGOUT}

}
export const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST})
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/register', {name, email, password}, config)
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch (e) {
        dispatch({type: USER_REGISTER_FAIL, payload: e.message})
    }
}

export const updateUsers = (user) => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_REQUEST})
    try {
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.data.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile', user, config)
        dispatch({type: USER_UPDATE_SUCCESS, payload: data})

    }catch (e) {
        dispatch({type: USER_UPDATE_FAIL, payload: e.message})
    }
}
export const getUsersDetails = (id) => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST})
    try {
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.data.token}`
            }
        }
        const {data} = await axios.get(`api/users/${id}`, config )
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})
    }catch (e) {
        dispatch({type: USER_DETAILS_FAIL, payload: e.message})
    }
}
