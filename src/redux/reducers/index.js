import { combineReducers } from "redux";
import authReducers from "./AuthReducers";
import { LogisticsReducer } from "./LogisticsReducers";
import { FMSReducers } from "./FMSReducers";
import PageReducers from "./PageReducers";
import UsersReducers from "./UsersReducers";
import { SeaporteReducers } from "./SeaporteReducers";
import { ServicesReducers } from "./ServicesReducers";

export default combineReducers({
    auth: authReducers,
    users: UsersReducers,
    Page: PageReducers,
    logistics:LogisticsReducer,
    fms:FMSReducers,
    seaporte:SeaporteReducers,
    services:ServicesReducers,
    
})