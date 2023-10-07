const {
  IS_LOADING,
  LOGISTICS_CAPABILITIES_LIST_SUCCESS,
  LOGISTICS_CAPABILITIES_LIST_ERROR,
  LOGISTICS_CAPABILITIES_UPDATE_SUCCESS,
  LOGISTICS_CAPABILITIES_UPDATE_ERROR,
  LOGISTICS_EXPERIENCE_LIST_SUCCESS,
  LOGISTICS_EXPERIENCE_LIST_ERROR,
  LOGISTICS_EXPERIENCE_UPDATE_SUCCESS,
  LOGISTICS_EXPERIENCE_UPDATE_ERROR,
  LOGISTICS_EXPERIENCE_ADD_SUCCESS,
  LOGISTICS_EXPERIENCE_ADD_ERROR,
  LOGISTICS_EXPERIENCE_DELETE_SUCCESS,
  LOGISTICS_EXPERIENCE_DELETE_ERROR,
  LOGISTICS_EXPERIENCE_EDIT_SUCCESS,
  LOGISTICS_EXPERIENCE_EDIT_ERROR,
} = require("../actions/Type");

const initialState = {
  logistics_capabilites_list: {},
  logistics_capabilites_update: {},
  logistics_experience_add: {},
  logistics_experience_delete: {},
  logistics_experience_list: {},
  logistics_experience_edit: {},
  logistics_experience_update: {},
  loading: false,
};

export const LogisticsReducer = (
  state = initialState,
  { type, payload } = {},
) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGISTICS_CAPABILITIES_LIST_SUCCESS:
      return {
        ...state,
        logistics_capabilites_list: payload,
        loading: false,
      };
    case LOGISTICS_CAPABILITIES_LIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGISTICS_CAPABILITIES_UPDATE_SUCCESS:
      return {
        ...state,
        logistics_capabilites_update: payload,
        loading: false,
      };
    case LOGISTICS_CAPABILITIES_UPDATE_ERROR:
      return {
        ...state,
        logistics_experience_update: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_LIST_SUCCESS:
      return {
        ...state,
        logistics_experience_list: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_LIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_EDIT_SUCCESS:
      return {
        ...state,
        logistics_experience_edit: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_EDIT_ERROR:
      return {
        ...state,
        logistics_experience_edit: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_ADD_SUCCESS:
      return {
        ...state,
        logistics_experience_add: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_ADD_ERROR:
      return {
        ...state,
        logistics_experience_add: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_DELETE_SUCCESS:
      return {
        ...state,
        logistics_experience_delete: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_DELETE_ERROR:
      return {
        ...state,
        logistics_experience_delete: payload,
        loading: false,
      };

    case LOGISTICS_EXPERIENCE_UPDATE_SUCCESS:
      return {
        ...state,
        logistics_experience_update: payload,
        loading: false,
      };
    case LOGISTICS_EXPERIENCE_UPDATE_ERROR:
      return {
        ...state,
        logistics_experience_update: payload,
        loading: false,
      };

    default:
      return state;
  }
};
