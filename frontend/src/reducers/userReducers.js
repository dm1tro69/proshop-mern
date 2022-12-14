import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConst";


export const userReducer = (state={}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return{...state, isLoading: true}
        case USER_LOGIN_SUCCESS:
            return{...state, userInfo: action.payload, isLoading: false}
        case USER_LOGIN_FAIL:
            return{...state, isLoading: false, error: action.payload}
        case USER_LOGOUT:
            return{}
        default:
            return {...state}
    }
}
