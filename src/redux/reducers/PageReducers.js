import { PAGE_LIST_SUCCESS, IS_LOADING, CONTEST_ADD_SUCCESS, USER_VERIFICATION_SUCCESS, CONTEST_STATUS_CHANGED_SUCCESS, CONTEST_STATUS_CHANGED_ERROR, } from "../actions/Type";

const initialState = {
    page_list: {},
    loading: false,
    contest_add: {},
    contest_status_changed: {}
}

const PageReducers = (state = initialState, { type, payload } = {}) => {
    // console.log("payload", payload);
    switch (type) {
        case IS_LOADING:
            return {
                ...state,
                loading: true
            }
        case PAGE_LIST_SUCCESS:
            return {
                ...state,
                page_list: payload,
                loading: false
            }
        default:
            return state
    }
}

export default PageReducers