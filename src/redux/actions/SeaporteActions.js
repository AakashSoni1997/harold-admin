//SEAPORTE assurance  Actions

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrlPostGres } from "../constant";
import { apiHeader } from "./ApiHeader";
import { LogoutAction } from "./AuthAction";
import {
  IS_LOADING,
  SEAPORTE_ASSURANCE_LIST_ERROR,
  SEAPORTE_ASSURANCE_LIST_SUCCESS,
  SEAPORTE_ASSURANCE_UPDATE_ERROR,
  SEAPORTE_ASSURANCE_UPDATE_SUCCESS,
  SEAPORTE_OBJECTIVE_LIST_ERROR,
  SEAPORTE_OBJECTIVE_LIST_SUCCESS,
  SEAPORTE_OBJECTIVE_UPDATE_ERROR,
  SEAPORTE_OBJECTIVE_UPDATE_SUCCESS,
} from "./Type";

// SEAPORTE

//assurance section

export const GetSeaporteAssuranceList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/seaporte-quality-assurance-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: SEAPORTE_ASSURANCE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SEAPORTE_ASSURANCE_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateSeaporteAssurance = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(
      `${baseUrlPostGres()}/api/seaporte-quality-assurance-update`,
      formData,
      {
        headers: apiHeader(),
      },
    )
    .then((response) => {
      toast("Content update successfully");
      dispatch({
        type: SEAPORTE_ASSURANCE_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type: SEAPORTE_ASSURANCE_UPDATE_ERROR,
        payload: errors,
      });
    });
};

//objective section

export const GetSeaporteObjectiveList = () => async (dispatch) => {
  dispatch({ type: IS_LOADING });

  await axios
    .get(`${baseUrlPostGres()}/api/seaporte-objective-list`, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      dispatch({
        type: SEAPORTE_OBJECTIVE_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      dispatch({
        type: SEAPORTE_OBJECTIVE_LIST_ERROR,
        payload: errors,
      });
      console.log("user list error", errors);
    });
};

export const UpdateSeaporteObjective = (formData) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  await axios
    .put(`${baseUrlPostGres()}/api/seaporte-objective-update`, formData, {
      headers: apiHeader(),
   })
    .then((response) => {
if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
      toast("Content update successfully");
      dispatch({
        type: SEAPORTE_OBJECTIVE_UPDATE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((errors) => {
      console.log("user list error", errors);
      dispatch({
        type: SEAPORTE_OBJECTIVE_UPDATE_ERROR,
        payload: errors,
      });
    });
};
