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
  FMS_EXPERIENCE_ADD_SUCCESS,
  FMS_EXPERIENCE_ADD_ERROR,
  FMS_EXPERIENCE_DELETE_SUCCESS,
  FMS_EXPERIENCE_DELETE_ERROR,
  FMS_EXPERIENCE_LIST_SUCCESS,
  FMS_EXPERIENCE_LIST_ERROR,
  FMS_EXPERIENCE_EDIT_SUCCESS,
  FMS_EXPERIENCE_EDIT_ERROR,
  FMS_EXPERIENCE_UPDATE_SUCCESS,
  FMS_EXPERIENCE_UPDATE_ERROR,
  FMS_CAPABILITIES_UPDATE_SUCCESS,
  FMS_CAPABILITIES_UPDATE_ERROR,
  FMS_CAPABILITIES_LIST_SUCCESS,
  FMS_CAPABILITIES_LIST_ERROR,
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
} from "../actions/Type";

const initialState = {
  fms_exp_add: {},
  fms_exp_delete: {},
  fms_exp_list: {},
  fms_exp_edit: {},
  fms_exp_update: {},
  fms_experience_add: {},
  fms_experience_delete: {},
  fms_experience_list: {},
  fms_experience_edit: {},
  fms_experience_update: {},
  fms_lowercapabilities_list: {},
  fms_lowercapabilities_update: {},
  fms_slidercapabilities_list: {},
  fms_slidercapabilities_update: {},
  fms_analysis_list: {},
  fms_analysis_update: {},
  fms_space_list: {},
  fms_space_update: {},
  loading: false,
};

export const FMSReducers = (
  state = initialState,
  { type, payload } = {},
) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FMS_EXP_ADD_SUCCESS:
      return {
        ...state,
        fms_exp_add: payload,
        loading: false,
      };
    case FMS_EXP_ADD_ERROR:
      return {
        ...state,
        fms_exp_add: payload,
        loading: false,
      };
    case FMS_EXP_DELETE_SUCCESS:
      return {
        ...state,
        fms_exp_delete: payload,
        loading: false,
      };
    case FMS_EXP_DELETE_ERROR:
      return {
        ...state,
        fms_exp_delete: payload,
        loading: false,
      };
    case FMS_EXP_LIST_SUCCESS:
      return {
        ...state,
        fms_exp_list: payload,
        loading: false,
      };
    case FMS_EXP_LIST_ERROR:
      return {
        ...state,
        fms_exp_list: payload,
        loading: false,
      };
    case FMS_EXP_EDIT_SUCCESS:
      return {
        ...state,
        fms_exp_edit: payload,
        loading: false,
      };
    case FMS_EXP_EDIT_ERROR:
      return {
        ...state,
        fms_exp_edit: payload,
        loading: false,
      };
    case FMS_EXP_UPDATE_SUCCESS:
      return {
        ...state,
        fms_exp_update: payload,
        loading: false,
      };
    case FMS_EXP_UPDATE_ERROR:
      return {
        ...state,
        fms_exp_update: payload,
        loading: false,
      };
      case FMS_EXPERIENCE_ADD_SUCCESS:
        return {
          ...state,
          fms_experience_add: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_ADD_ERROR:
        return {
          ...state,
          fms_experience_add: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_DELETE_SUCCESS:
        return {
          ...state,
          fms_experience_delete: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_DELETE_ERROR:
        return {
          ...state,
          fms_experience_delete: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_LIST_SUCCESS:
        return {
          ...state,
          fms_experience_list: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_LIST_ERROR:
        return {
          ...state,
          fms_experience_list: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_EDIT_SUCCESS:
        return {
          ...state,
          fms_experience_edit: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_EDIT_ERROR:
        return {
          ...state,
          fms_experience_edit: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_UPDATE_SUCCESS:
        return {
          ...state,
          fms_experience_update: payload,
          loading: false,
        };
      case FMS_EXPERIENCE_UPDATE_ERROR:
        return {
          ...state,
          fms_experience_update: payload,
          loading: false,
        };
        case FMS_CAPABILITIES_LIST_SUCCESS:
          return {
            ...state,
            fms_lowercapabilities_list: payload,
            loading: false,
          };
        case FMS_CAPABILITIES_LIST_ERROR:
          return {
            ...state,
            fms_lowercapabilities_list: payload,
            loading: false,
          };
        case FMS_CAPABILITIES_UPDATE_SUCCESS:
          return {
            ...state,
            fms_lowercapabilities_update: payload,
            loading: false,
          };
        case FMS_CAPABILITIES_UPDATE_ERROR:
          return {
            ...state,
            fms_lowercapabilities_update: payload,
            loading: false,
          };
          case FMS_ANALYSIS_LIST_SUCCESS:
            return {
              ...state,
              fms_analysis_list: payload,
              loading: false,
            };
          case FMS_ANALYSIS_LIST_ERROR:
            return {
              ...state,
              fms_analysis_list: payload,
              loading: false,
            };
          case FMS_ANALYSIS_UPDATE_SUCCESS:
            return {
              ...state,
              fms_analysis_update: payload,
              loading: false,
            };
          case FMS_ANALYSIS_UPDATE_ERROR:
            return {
              ...state,
              fms_analysis_update: payload,
              loading: false,
            };
            case FMS_SLIDER_CAPABILITIES_LIST_SUCCESS:
              return {
                ...state,
                fms_slidercapabilities_list: payload,
                loading: false,
              };
            case FMS_SLIDER_CAPABILITIES_LIST_ERROR:
              return {
                ...state,
                fms_slidercapabilities_list: payload,
                loading: false,
              };
            case FMS_SLIDER_CAPABILITIES_UPDATE_SUCCESS:
              return {
                ...state,
                fms_slidercapabilities_update: payload,
                loading: false,
              };
            case FMS_SLIDER_CAPABILITIES_UPDATE_ERROR:
              return {
                ...state,
                fms_slidercapabilities_update: payload,
                loading: false,
              };
              case FMS_SPACE_LIST_SUCCESS:
                return {
                  ...state,
                  fms_space_list: payload,
                  loading: false,
                };
              case FMS_SPACE_LIST_ERROR:
                return {
                  ...state,
                  fms_space_list: payload,
                  loading: false,
                };
              case FMS_SPACE_UPDATE_SUCCESS:
                return {
                  ...state,
                  fms_space_update: payload,
                  loading: false,
                };
              case FMS_SPACE_UPDATE_ERROR:
                return {
                  ...state,
                  fms_space_update: payload,
                  loading: false,
                };
    default:
      return state;
  }
};
