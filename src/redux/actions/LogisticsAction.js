import axios from "axios";
import {
  IS_LOADING,
  LOGISTICS_CAPABILITIES_LIST_ERROR,
  LOGISTICS_CAPABILITIES_LIST_SUCCESS,
  LOGISTICS_CAPABILITIES_UPDATE_SUCCESS,
  LOGISTICS_EXPERIENCE_ADD_SUCCESS,
  LOGISTICS_EXPERIENCE_DELETE_SUCCESS,
  LOGISTICS_EXPERIENCE_EDIT_ERROR,
  LOGISTICS_EXPERIENCE_EDIT_SUCCESS,
  LOGISTICS_EXPERIENCE_LIST_SUCCESS,
  LOGISTICS_EXPERIENCE_UPDATE_SUCCESS,
} from "./Type";
import { baseUrlPostGres } from "../constant";
import { apiHeader } from "./ApiHeader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LogoutAction } from "./AuthAction";

// console.log("baseMongoUrl", baseUrlPostGres());

//LOGISTICS CAPABILITES SECTION

export const GetLogisticsCapabilitiesList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/logistics-capabilities-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-capabilities-list Response is", response.data);
      dispatch({
        type: LOGISTICS_CAPABILITIES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: LOGISTICS_CAPABILITIES_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateLogisticsCapabilities = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/logistics-capabilities-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: LOGISTICS_CAPABILITIES_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
    });
};

//LOGISTICS EXPERIENCE SECTION

export const GetLogisticsExperienceList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/logistics-experience-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-EXPERIENCE-list Response is", response.data);
      dispatch({
        type: LOGISTICS_EXPERIENCE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: LOGISTICS_CAPABILITIES_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const EditLogisticsExperienceList = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/logistics-experience-edit/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-EXPERIENCE-list Response is", response.data);
      dispatch({
        type: LOGISTICS_EXPERIENCE_EDIT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: LOGISTICS_EXPERIENCE_EDIT_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateLogisticsExperience = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/logistics-experience-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: LOGISTICS_EXPERIENCE_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
    });
};

export const AddLogisticsExperience = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .post(`${baseUrlPostGres()}/api/logistics-experience-add`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: LOGISTICS_EXPERIENCE_ADD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
    });
};

export const DeleteLogisticsExperience = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .delete(`${baseUrlPostGres()}/api/logistics-experience-delete/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content Delted successfully");
      dispatch({
        type: LOGISTICS_EXPERIENCE_DELETE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
    });
};
