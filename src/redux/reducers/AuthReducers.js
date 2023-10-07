import { LOGIN_SUCCESS, LOGIN_ERROR, IS_LOADING, SET_CURRENT_USER } from "../actions/Type";

const initialState = {
    isAuthenticated: false,
    user: {},
    error: {},
    loading: false
}

const isEmpty = require('is-empty');

const authReducers = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case IS_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                user: payload,
                error: {},
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                user: payload,
                error: {},
                loading: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                user: {},
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default authReducers