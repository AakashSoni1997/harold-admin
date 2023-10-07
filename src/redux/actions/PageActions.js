import axios from 'axios';
import { toast } from 'react-toastify';
import { PAGE_LIST_SUCCESS, IS_LOADING } from './Type';
import { baseUrlPostGres } from '../constant';
import { apiHeader } from './ApiHeader';
import 'react-toastify/dist/ReactToastify.css';
import { LogoutAction } from './AuthAction';

toast.configure();
// console.log("baseMongoUrl", baseUrlPostGres())
// console.log("baseMongoUrl", baseUrlPostGres())

export const getHomePage = (value) => async (dispatch) => {
    dispatch({ type: IS_LOADING })

    await axios
        .get(`${baseUrlPostGres()}/api/${value}`, {
            headers: apiHeader()
        })
        .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            dispatch({
                type: PAGE_LIST_SUCCESS,
                payload: response
            })
        })
        .catch(errors => {
            console.log("user list error", errors);
        })
}


