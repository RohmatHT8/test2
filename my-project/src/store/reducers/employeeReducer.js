const initialState = {
    employees: [],
}
export default function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case "SUCCESS_GET_EMPLOYEES":
            return {
                ...state,
                employees: action.payload
            }
        case "SUCCESS_ADD_EMPLOYEE":
            return {
                ...state,
                employees: [...state.employees, action.payload]
            }
        case "SUCCESS_EDIT_EMPLOYEE":
            return {
                ...state,
                employees: action.payload
            }
        case "SUCCESS_DELETE_EMPLOYEE":
            return {
                ...state,
                employees: action.payload
            }
        default: return state
    }
}