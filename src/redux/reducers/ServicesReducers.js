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
  SERVICES_EXPERIENCE_ADD_ERROR,
  SERVICES_EXPERIENCE_ADD_SUCCESS,
  SERVICES_EXPERIENCE_DELETE_SUCCESS,
  SERVICES_EXPERIENCE_DELETE_ERROR,
  SERVICES_EXPERIENCE_LIST_SUCCESS,
  SERVICES_EXPERIENCE_LIST_ERROR,
  SERVICES_EXPERIENCE_EDIT_SUCCESS,
  SERVICES_EXPERIENCE_EDIT_ERROR,
  SERVICES_EXPERIENCE_UPDATE_SUCCESS,
  SERVICES_EXPERIENCE_UPDATE_ERROR,
  SERVICES_INSTRUCTIONAL_LIST_ERROR,
  SERVICES_INSTRUCTIONAL_LIST_SUCCESS,
  SERVICES_INSTRUCTIONAL_UPDATE_ERROR,
  SERVICES_INSTRUCTIONAL_UPDATE_SUCCESS,
  SERVICES_TECHNOLOGY_LIST_SUCCESS,
  SERVICES_TECHNOLOGY_LIST_ERROR,
  SERVICES_TECHNOLOGY_UPDATE_SUCCESS,
  SERVICES_TECHNOLOGY_UPDATE_ERROR,
} from "../actions/Type";

const initialState = {
  services_capabilities_list: {},
  services_capabilities_update: {},
  services_instructional_list: {},
  services_instructional_update: {},
  services_administrative_list: {},
  services_administrative_update: {},
  services_experience_add: {},
  services_experience_delete: {},
  services_experience_list: {},
  services_experience_edit: {},
  services_experience_update: {},
  services_technology_list: {},
  services_technology_update: {},
};

export const ServicesReducers = (
  state = initialState,
  { type, payload } = {},
) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SERVICES_CAPABILITIES_LIST_SUCCESS:
      return {
        ...state,
        services_capabilities_list: payload,
        loading: false,
      };
    case SERVICES_CAPABILITIES_LIST_ERROR:
      return {
        ...state,
        services_capabilities_list: payload,
        loading: false,
      };
    case SERVICES_CAPABILITIES_UPDATE_SUCCESS:
      return {
        ...state,
        services_capabilities_update: payload,
        loading: false,
      };
    case SERVICES_CAPABILITIES_UPDATE_ERROR:
      return {
        ...state,
        services_capabilities_update: payload,
        loading: false,
      };
    case SERVICES_INSTRUCTIONAL_LIST_SUCCESS:
      return {
        ...state,
        services_instructional_list: payload,
        loading: false,
      };
    case SERVICES_INSTRUCTIONAL_LIST_ERROR:
      return {
        ...state,
        services_instructional_list: payload,
        loading: false,
      };
    case SERVICES_INSTRUCTIONAL_UPDATE_SUCCESS:
      return {
        ...state,
        services_instructional_update: payload,
        loading: false,
      };
    case SERVICES_INSTRUCTIONAL_UPDATE_ERROR:
      return {
        ...state,
        services_instructional_update: payload,
        loading: false,
      };
    case SERVICES_ADMINISTRATIVE_LIST_SUCCESS:
      return {
        ...state,
        services_administrative_list: payload,
        loading: false,
      };
    case SERVICES_ADMINISTRATIVE_LIST_ERROR:
      return {
        ...state,
        services_administrative_list: payload,
        loading: false,
      };
    case SERVICES_ADMINISTRATIVE_UPDATE_SUCCESS:
      return {
        ...state,
        services_administrative_update: payload,
        loading: false,
      };
    case SERVICES_ADMINISTRATIVE_UPDATE_ERROR:
      return {
        ...state,
        services_administrative_update: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_ADD_SUCCESS:
      return {
        ...state,
        services_experience_add: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_ADD_ERROR:
      return {
        ...state,
        services_experience_add: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_DELETE_SUCCESS:
      return {
        ...state,
        services_experience_delete: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_DELETE_ERROR:
      return {
        ...state,
        services_experience_delete: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_LIST_SUCCESS:
      return {
        ...state,
        services_experience_list: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_LIST_ERROR:
      return {
        ...state,
        services_experience_list: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_EDIT_SUCCESS:
      return {
        ...state,
        services_experience_edit: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_EDIT_ERROR:
      return {
        ...state,
        services_experience_edit: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_UPDATE_SUCCESS:
      return {
        ...state,
        services_experience_update: payload,
        loading: false,
      };
    case SERVICES_EXPERIENCE_UPDATE_ERROR:
      return {
        ...state,
        services_experience_update: payload,
        loading: false,
      };
      case SERVICES_TECHNOLOGY_LIST_SUCCESS:
        return {
          ...state,
          services_technology_list: payload,
          loading: false,
        };
      case SERVICES_TECHNOLOGY_LIST_ERROR:
        return {
          ...state,
          services_technology_list: payload,
          loading: false,
        };
      case SERVICES_TECHNOLOGY_UPDATE_SUCCESS:
        return {
          ...state,
          services_technology_update: payload,
          loading: false,
        };
      case SERVICES_TECHNOLOGY_UPDATE_ERROR:
        return {
          ...state,
          services_technology_update: payload,
          loading: false,
        };
    default:
      return state;
  }
};
