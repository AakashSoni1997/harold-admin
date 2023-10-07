import axios from "axios";
import {
  IS_LOADING,
  FMS_EXP_ADD_ERROR,
  FMS_EXP_ADD_SUCCESS,
  FMS_EXP_DELETE_ERROR,
  FMS_EXP_DELETE_SUCCESS,
  FMS_EXP_EDIT_ERROR,
  FMS_EXP_EDIT_SUCCESS,
  FMS_EXP_LIST_ERROR,
  FMS_EXP_LIST_SUCCESS,
  FMS_EXP_UPDATE_ERROR,
  FMS_EXP_UPDATE_SUCCESS,
  FMS_EXPERIENCE_ADD_ERROR,
  FMS_EXPERIENCE_ADD_SUCCESS,
  FMS_EXPERIENCE_UPDATE_ERROR,
  FMS_EXPERIENCE_UPDATE_SUCCESS,
  FMS_EXPERIENCE_EDIT_ERROR,
  FMS_EXPERIENCE_EDIT_SUCCESS,
  FMS_EXPERIENCE_LIST_ERROR,
  FMS_EXPERIENCE_LIST_SUCCESS,
  FMS_EXPERIENCE_DELETE_SUCCESS,
  FMS_EXPERIENCE_DELETE_ERROR,
  FMS_CAPABILITIES_LIST_SUCCESS,
  FMS_CAPABILITIES_LIST_ERROR,
  FMS_CAPABILITIES_UPDATE_SUCCESS,
  FMS_CAPABILITIES_UPDATE_ERROR,
  FMS_ANALYSIS_LIST_SUCCESS,
  FMS_ANALYSIS_LIST_ERROR,
  FMS_ANALYSIS_UPDATE_SUCCESS,
  FMS_ANALYSIS_UPDATE_ERROR,
  FMS_SLIDER_CAPABILITIES_LIST_SUCCESS,
  FMS_SLIDER_CAPABILITIES_LIST_ERROR,
  FMS_SLIDER_CAPABILITIES_UPDATE_SUCCESS,
  FMS_SLIDER_CAPABILITIES_UPDATE_ERROR,
  FMS_SPACE_LIST_SUCCESS,
  FMS_SPACE_LIST_ERROR,
  FMS_SPACE_UPDATE_SUCCESS,
  FMS_SPACE_UPDATE_ERROR,
} from "./Type";
import { baseUrlPostGres } from "../constant";
import { apiHeader } from "./ApiHeader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LogoutAction } from "./AuthAction";

// console.log("baseMongoUrl", baseUrlPostGres());

export const GetFMSEXPList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-exp-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: FMS_EXP_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXP_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const EditFMSEXPList = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-exp-edit/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: FMS_EXP_EDIT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXP_EDIT_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateFMSEXP = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-exp-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: FMS_EXP_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXP_UPDATE_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const AddFMSEXP = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .post(`${baseUrlPostGres()}/api/fms-exp-add`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: FMS_EXP_ADD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXP_ADD_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const GetFMSEXPERIENCEList = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-experience-list/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: FMS_EXPERIENCE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXPERIENCE_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const EditFMSEXPERIENCEList = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-experience-edit/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: FMS_EXPERIENCE_EDIT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXPERIENCE_EDIT_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateFMSEXPERIENCE = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-experience-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: FMS_EXPERIENCE_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXPERIENCE_UPDATE_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const AddFMSEXPERIENCE = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .post(`${baseUrlPostGres()}/api/fms-experience-add`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: FMS_EXPERIENCE_ADD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXPERIENCE_ADD_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const DeleteFMSEXPERIENCE = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .delete(`${baseUrlPostGres()}/api/fms-experience-delete/${id}`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content Deleted successfully");
      dispatch({ 
        type: FMS_EXPERIENCE_DELETE_SUCCESS,
        payload:response.data
       });
       
    })
    .catch((errors) => {
      dispatch({
        type: FMS_EXPERIENCE_DELETE_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};


//FMS capanilities Actions

export const GetFMSCapabilitiesList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-capabilities-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-capabilities-list Response is", response.data);
      dispatch({
        type:FMS_CAPABILITIES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type:FMS_CAPABILITIES_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateFMSCapabilities = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-capabilities-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type:FMS_CAPABILITIES_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type:FMS_CAPABILITIES_UPDATE_ERROR,
        payload:  errors
      });
    });
};

//FMS analysis Actions

export const GetFMSAnalysisList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-analysis-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-analysis-list Response is", response.data);
      dispatch({
        type:FMS_ANALYSIS_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type:FMS_ANALYSIS_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateFMSAnalysis = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-analysis-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type:FMS_ANALYSIS_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type:FMS_ANALYSIS_UPDATE_ERROR,
        payload:  errors
      });
    });
};

//FMS Slider capanilities Actions

export const GetFMSSliderCapabilitiesList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-cap-slider-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      console.log("logistics-cap-slider-list Response is", response.data);
      dispatch({
        type:FMS_SLIDER_CAPABILITIES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type:FMS_SLIDER_CAPABILITIES_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateFMSSliderCapabilities = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-cap-slider-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type:FMS_SLIDER_CAPABILITIES_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type:FMS_SLIDER_CAPABILITIES_UPDATE_ERROR,
        payload:  errors
      });
    });
};

//FMS Space  Actions

export const GetFMSSpaceList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/fms-space-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({  
        type:FMS_SPACE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type:FMS_SPACE_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};
export const UpdateFMSSpace = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/fms-space-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type:FMS_SPACE_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type:FMS_SPACE_UPDATE_ERROR,
        payload:  errors
      });
    });
};