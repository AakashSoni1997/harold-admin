import axios from 'axios';
import { toast } from 'react-toastify';
import { IS_LOADING, UPCOMING_MATCH_LIST_SUCCESS, UPCOMING_MATCH_LIST_ERROR, ACTIVE_MATCH_LIST_SUCCESS, ACTIVE_MATCH_LIST_ERROR, POOL_LIST_ERROR, POOL_LIST_SUCCESS, MATCH_STATUS_CHANGED_ERROR, MATCH_STATUS_CHANGED_SUCCESS, POOL_ADD_SUCCESS, POOL_ADD_ERROR, POOL_PRIZE_BREAK_SUCCESS, POOL_PRIZE_BREAK_ERROR } from './Type';
import store from "../store";
import { baseUrlPostGres } from '../constant';
import { apiHeader } from './ApiHeader';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
// console.log("baseMongoUrl", baseUrlPostGres())
// console.log("baseMongoUrl", baseUrlPostGres())


export const GetPoolListAction = (page, size, id) => async (dispatch) => {
    dispatch({ type: IS_LOADING })
    let sendData = {
        contest_id: id
    }
    await axios
        .post(`${baseUrlPostGres()}/admin/poolmaster/list?page=${page}&limit=${size}`, sendData, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("GetUpcomingMatchListAction Response is", response)
            dispatch({
                type: POOL_LIST_SUCCESS,
                payload: response
            })
        })
        .catch(errors => {
            dispatch({
                type: POOL_LIST_ERROR,
                payload: errors
            })
            console.log("user list error", errors);
        })
}

export const GetActiveMatchListAction = (page, size) => async (dispatch) => {
    dispatch({ type: IS_LOADING })

    await axios
        .get(`${baseUrlPostGres()}/admin/match/active_list?page=${page}&limit=${size}`, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("active_list Response is", response)
            dispatch({
                type: ACTIVE_MATCH_LIST_SUCCESS,
                payload: response
            })
        })
        .catch(errors => {
            dispatch({
                type: ACTIVE_MATCH_LIST_ERROR,
                payload: errors
            })
            console.log("user list error", errors);
        })
}

export const MatchChangeStatusAction = (body) => async (dispatch) => {
    console.log("Called")
    dispatch({ type: IS_LOADING })

    await axios
        .post(`${baseUrlPostGres()}/admin/match/active-inactive`, body, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("response is client register", response)
            dispatch({
                type: MATCH_STATUS_CHANGED_SUCCESS,
                payload: response.data
            })
            toast.success(response.data.message, { theme: "colored" })

        })
        .catch(errors => {
            console.log("error is ", errors)
            dispatch({
                type: MATCH_STATUS_CHANGED_ERROR,
                payload: errors
            })
            toast.error(errors.error.errorMessage.id.message, { theme: "colored" })
            console.log("error is ", errors)
        })
}

export const AddPoolAction = (data, formValues) => async (dispatch) => {
    dispatch({ type: IS_LOADING })
    console.log("formValues", formValues);
    await axios
        .post(`${baseUrlPostGres()}/admin/poolmaster/create`, data, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("response is user active", response)
            dispatch({
                type: POOL_ADD_SUCCESS,
                payload: response
            })
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(errors => {
            dispatch({
                type: POOL_ADD_ERROR,
                payload: errors
            })
            console.log("user Detail error", errors);
        })

    await axios
        .post(`${baseUrlPostGres()}/admin/poolmaster/pool_range`, formValues, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            console.log("response is pool_range active", response)
            dispatch({
                type: POOL_PRIZE_BREAK_SUCCESS,
                payload: response
            })
            toast.success(response.data.message, { theme: "colored" })
        })
        .catch(errors => {
            dispatch({
                type: POOL_PRIZE_BREAK_ERROR,
                payload: errors
            })
            console.log("user Detail error", errors);
        })
}

