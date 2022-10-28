const initialState = {
    companies: [],
}
export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case "SUCCESS_GET_COMPANIES":
            return {
                ...state,
                companies: action.payload
            }
        case "SUCCESS_ADD_COMPANY":
            return {
                ...state,
                companies: [...state.companies, action.payload]
            }
        case "SUCCESS_EDIT_COMPANY":
            return {
                ...state,
                companies: action.payload
            }
        case "SUCCESS_DELETE_COMPANY":
            return {
                ...state,
                companies:action.payload
            }
        default: return state
    }
}