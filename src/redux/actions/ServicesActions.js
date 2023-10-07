import { baseUrlPostGres } from "../constant";
import { apiHeader } from "./ApiHeader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  IS_LOADING,
  SERVICES_ADMINISTRATIVE_LIST_ERROR,
  SERVICES_ADMINISTRATIVE_LIST_SUCCESS,
  SERVICES_ADMINISTRATIVE_UPDATE_ERROR,
  SERVICES_ADMINISTRATIVE_UPDATE_SUCCESS,
  SERVICES_CAPABILITIES_LIST_ERROR,
  SERVICES_CAPABILITIES_LIST_SUCCESS,
  SERVICES_CAPABILITIES_UPDATE_ERROR,
  SERVICES_CAPABILITIES_UPDATE_SUCCESS,
  SERVICES_INSTRUCTIONAL_LIST_ERROR,
  SERVICES_INSTRUCTIONAL_LIST_SUCCESS,
  SERVICES_INSTRUCTIONAL_UPDATE_ERROR,
  SERVICES_INSTRUCTIONAL_UPDATE_SUCCESS,
  SERVICES_EXPERIENCE_ADD_ERROR,
  SERVICES_EXPERIENCE_ADD_SUCCESS,
  SERVICES_EXPERIENCE_UPDATE_ERROR,
  SERVICES_EXPERIENCE_UPDATE_SUCCESS,
  SERVICES_EXPERIENCE_EDIT_ERROR,
  SERVICES_EXPERIENCE_EDIT_SUCCESS,
  SERVICES_EXPERIENCE_LIST_ERROR,
  SERVICES_EXPERIENCE_LIST_SUCCESS,
  SERVICES_EXPERIENCE_DELETE_SUCCESS,
  SERVICES_EXPERIENCE_DELETE_ERROR,
  SERVICES_TECHNOLOGY_LIST_SUCCESS,
  SERVICES_TECHNOLOGY_LIST_ERROR,
  SERVICES_TECHNOLOGY_UPDATE_SUCCESS,
  SERVICES_TECHNOLOGY_UPDATE_ERROR,
} from "./Type";
import axios from "axios";
import { LogoutAction } from "./AuthAction";

//capabilities section

export const GetServicesCapabilitiesList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .get(`${baseUrlPostGres()}/api/service-capabilities-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log(response.data, "responseeeeeeeeeeeeeeeeeeee");
      dispatch({
        type: SERVICES_CAPABILITIES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SERVICES_CAPABILITIES_LIST_ERROR,
        payload: errors,
      });
      toast(errors);
    });
};

export const UpdateServicesCapabilitiesList =
  (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .put(`${baseUrlPostGres()}/api/service-capabilities-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        console.log(response.data, "responseeeeeeeeeeeeeeeeeeee");
        toast("content updated successfully");

        dispatch({
          type: SERVICES_CAPABILITIES_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_CAPABILITIES_UPDATE_ERROR,
          payload: errors,
        });
        toast(errors);
      });
  };

//instructional section

export const GetServicesInstructionalList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .get(`${baseUrlPostGres()}/api/service-instructional-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log(response.data, "responseeeeeeeeeeeeeeeeeeee");
      dispatch({
        type: SERVICES_INSTRUCTIONAL_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SERVICES_INSTRUCTIONAL_LIST_ERROR,
        payload: errors,
      });
      toast(errors);
    });
};

export const UpdateServicesInstructionalList =
  (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .put(`${baseUrlPostGres()}/api/service-instructional-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("content updated successfully");

        dispatch({
          type: SERVICES_INSTRUCTIONAL_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_INSTRUCTIONAL_UPDATE_ERROR,
          payload: errors,
        });
        toast(errors);
      });
  };

//administrative section

export const GetServicesAdministrativeList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .get(`${baseUrlPostGres()}/api/service-administrative-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log(response.data, "responseeeeeeeeeeeeeeeeeeee");
      dispatch({
        type: SERVICES_ADMINISTRATIVE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SERVICES_ADMINISTRATIVE_LIST_ERROR,
        payload: errors,
      });
      toast(errors);
    });
};

export const UpdateServicesAdministrativeList =
  (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .put(`${baseUrlPostGres()}/api/service-administrative-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("content updated successfully");
        dispatch({
          type: SERVICES_ADMINISTRATIVE_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_ADMINISTRATIVE_UPDATE_ERROR,
          payload: errors,
        });
        toast(errors);
      });
  };


  //services experience section

  export const GetServicesExperienceList = (id) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
  
    await axios
      .get(`${baseUrlPostGres()}/api/service-experience-list`, {
        headers: apiHeader(),
      })
      .then((response) => {
        dispatch({
          type: SERVICES_EXPERIENCE_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_EXPERIENCE_LIST_ERROR,
          payload: errors,
        });
        console.log("user list error", errors);
      });
  };
  
  export const EditServicesExperienceList = (id) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
  
    await axios
      .get(`${baseUrlPostGres()}/api/service-experience-edit/${id}`, {
        headers: apiHeader(),
      })
      .then((response) => {
        dispatch({
          type: SERVICES_EXPERIENCE_EDIT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_EXPERIENCE_EDIT_ERROR,
          payload: errors,
        });
        console.log("user list error", errors);
      });
  };
  
  export const UpdateServicesExperience = (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .put(`${baseUrlPostGres()}/api/service-experience-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("Content update successfully");
        dispatch({
          type: SERVICES_EXPERIENCE_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_EXPERIENCE_UPDATE_ERROR,
          payload: errors,
        });
        console.log("user list error", errors);
      });
  };
  
  export const AddServicesExperience = (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .post(`${baseUrlPostGres()}/api/service-experience-add`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("Content update successfully");
        dispatch({
          type: SERVICES_EXPERIENCE_ADD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_EXPERIENCE_ADD_ERROR,
          payload: errors,
        });
        console.log("user list error", errors);
      });
  };
  
  export const DeleteServicesExperience = (id) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
  
    await axios
      .delete(`${baseUrlPostGres()}/api/service-experience-delete/${id}`, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("Content Deleted successfully");
        dispatch({ 
          type: SERVICES_EXPERIENCE_DELETE_SUCCESS,
          payload:response.data
         });
         
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_EXPERIENCE_DELETE_ERROR,
          payload: errors,
        });
        console.log("user list error", errors);
      });
  };

  //technology section

export const GetServicesTechnologyList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .get(`${baseUrlPostGres()}/api/service-technology-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log(response.data, "responseeeeeeeeeeeeeeeeeeee");
      dispatch({
        type: SERVICES_TECHNOLOGY_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SERVICES_TECHNOLOGY_LIST_ERROR,
        payload: errors,
      });
      toast(errors);
    });
};

export const UpdateServicesTechnologyList =
  (formData) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    await axios
      .put(`${baseUrlPostGres()}/api/service-technology-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("content updated successfully");
        dispatch({
          type: SERVICES_TECHNOLOGY_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((errors) => {
        dispatch({
          type: SERVICES_TECHNOLOGY_UPDATE_ERROR,
          payload: errors,
        });
        toast(errors);
      });
  };
