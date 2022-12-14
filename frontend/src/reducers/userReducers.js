import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS
} from "../constants/userConst";


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
export const userRegisterReducer = (state={}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return{...state, isLoading: true}
        case USER_REGISTER_SUCCESS:
            return{...state, userInfo: action.payload, isLoading: false}
        case USER_REGISTER_FAIL:
            return{...state, isLoading: false, error: action.payload}
        default:
            return {...state}
    }
}
export const userDetailsReducer = (state={user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return{...state, isLoading: true}
        case USER_DETAILS_SUCCESS:
            return{...state, user: action.payload, isLoading: false}
        case USER_DETAILS_FAIL:
            return{...state, isLoading: false, error: action.payload}
        default:
            return {...state}
    }
}
export const userUpdateReducer = (state={}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return{isLoading: true}
        case USER_UPDATE_SUCCESS:
            return{userInfo: action.payload, isLoading: false, success: true}
        case USER_UPDATE_FAIL:
            return{...state, isLoading: false, error: action.payload}
        default:
            return {...state}
    }
}


