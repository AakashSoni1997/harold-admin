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
} from "../actions/Type";

const initialState = {
  seaporte_assurance_list: {},
  seaporte_assurance_update: {},
  seaporte_objective_list: {},
  seaporte_objective_update: {},
  loading: false,
};

export const SeaporteReducers = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEAPORTE_ASSURANCE_LIST_SUCCESS:
      return {
        ...state,
        seaporte_assurance_list: payload,
        loading: false,
      };
    case SEAPORTE_ASSURANCE_LIST_ERROR:
      return {
        ...state,
        seaporte_assurance_list: payload,
        loading: false,
      };
    case SEAPORTE_ASSURANCE_UPDATE_SUCCESS:
      return {
        ...state,
        seaporte_assurance_update: payload,
        loading: false,
      };
    case SEAPORTE_ASSURANCE_UPDATE_ERROR:
      return {
        ...state,
        seaporte_assurance_update: payload,
        loading: false,
      };
      case SEAPORTE_OBJECTIVE_LIST_SUCCESS:
        return {
          ...state,
          seaporte_objective_list: payload,
          loading: false,
        };
      case SEAPORTE_OBJECTIVE_LIST_ERROR:
        return {
          ...state,
          seaporte_objective_list: payload,
          loading: false,
        };
      case SEAPORTE_OBJECTIVE_UPDATE_SUCCESS:
        return {
          ...state,
          seaporte_objective_update: payload,
          loading: false,
        };
      case SEAPORTE_OBJECTIVE_UPDATE_ERROR:
        return {
          ...state,
          seaporte_objective_update: payload,
          loading: false,
        };
    default:
      return state;
  }
};
