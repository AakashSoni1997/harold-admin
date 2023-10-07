import axios from 'axios';
import { toast } from 'react-toastify';
import { USERLIST_SUCCESS, IS_LOADING, USER_DETAIL_SUCCESS, USER_VERIFICATION_SUCCESS } from './Type';
import store from "../store";
import { apiHeader } from './ApiHeader';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrlPostGres} from '../constant';
import { LogoutAction } from './AuthAction';

toast.configure();

export const GetUserListAction = (Data) => (dispatch) => {
    dispatch({ type: IS_LOADING })
    axios
        .get(`${baseUrlPostGres()}/admin/users/list?page=1&size=10`, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("List Response is",response)
            dispatch({
                type: USERLIST_SUCCESS,
                payload: response
            })
        })
        .catch(errors => {
            console.log("user list error", errors);
        })
}

export const UserDetailAction = (id) => (dispatch) => {
    dispatch({type: IS_LOADING})
    console.log("id called", id);
    axios
    .post(`${baseUrlPostGres()}/admin/customer_detail`, id, {
        headers: apiHeader(true)
    })
    .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: response
        })
        console.log("response called", response);
    })
    .catch(errors => {
        console.log("user Detail error", errors);
    })
}

export const AcceptRejectAction = (data) => (dispatch) => {
    dispatch({type: IS_LOADING})
    console.log("AcceptRejectAction", data);
    axios
    .post(`${baseUrlPostGres()}/admin/users/active-inactive`, data, {
        headers: apiHeader()
    })
    .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
        console.log("response is user active",response)
        dispatch({
            type: USER_VERIFICATION_SUCCESS,
            payload: response
        })
        toast.success(response.data.message, { theme: "colored" })
    })
    .catch(errors => {
        console.log("user Detail error", errors);
    })
}
