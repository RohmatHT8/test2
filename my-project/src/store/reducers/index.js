import { combineReducers } from "redux"
import companyReducer from "./companyReducer";
import employeesReducer from "./employeeReducer";

const rootReducer = combineReducers({
    companies: companyReducer,
    employees: employeesReducer
})

export default rootReducer;