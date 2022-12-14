import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConst";
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
