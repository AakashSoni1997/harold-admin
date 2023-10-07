import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS, LOGIN_ERROR, IS_LOADING, SET_CURRENT_USER, LOGOUT_SUCCESS } from './Type';
import store from "../store";
import { apiHeader } from './ApiHeader';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrlPostGres } from '../constant';

toast.configure();

export const setCurrentUser = (token) => {
    return (
        store.dispatch({
            type: SET_CURRENT_USER,
            payload: token
        })
    )
}

export const LoginAction = (formData) => (dispatch) => {
    dispatch({ type: IS_LOADING })
    axios
        .post(`${baseUrlPostGres()}/api/login`, formData, {
            headers: apiHeader(true)
        })
        .then(response => {
            console.log("response is", response)
            const res = response.data.success
            console.log("login response", res)
            const payload = {
                id: res.id,
                email: res.email,
                token: res.token,
                country_code: res.country_code,
            }
            dispatch({ type: LOGIN_SUCCESS, payload: response })
            dispatch(setCurrentUser(payload))
            localStorage.setItem("security_auth", JSON.stringify(payload));
            toast.success(response.data.message, { theme: "colored" })

        })
        .catch(errors => {
            toast.error(errors.data.message, { theme: "colored" })
            dispatch({
                type: LOGIN_ERROR,
                payload: errors
            })
            // toast.error(errors.response.data.message, { theme: "colored" })
        })
}

export const LogoutAction = (msg) => (dispatch) => {
    dispatch({ type: IS_LOADING })
    axios
        .get(`${baseUrlPostGres()}/api/logout`, {
            headers: apiHeader()
        })
        .then(response => {
            console.log("logout error", response.data.success);
            toast.success(response.data.success, { theme: "colored" })
            dispatch({ type: LOGOUT_SUCCESS, payload: response })
            dispatch(setCurrentUser({}))
            localStorage.removeItem("security_auth");
        })
        .catch(error => {
            console.log("logout error", error);
        })
        if(msg==="Unauthorized please login again!"){
            toast("Session expired, please login again.!")
        }
}