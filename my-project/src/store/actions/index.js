import Swal from 'sweetalert2'
const baseUrl = 'http://localhost:3001'
export const succesGetCompanies = (data) => {
    return {
        type: "SUCCESS_GET_COMPANIES",
        payload: data
    }
}

export const succesAddCompany = (data) => {
    return {
        type: "SUCCESS_ADD_COMPANY",
        payload: data
    }
}

export const successGetCompany = (data) => {
    return {
        type: "SUCCESS_GET_COMPANY",
        payload: data
    }
}

export const succesEditCompany = (data) => {
    return {
        type: "SUCCESS_EDIT_COMPANY",
        payload: data
    }
}

export const succesDeleteCompany = (data) => {
    return {
        type: "SUCCESS_DELETE_COMPANY",
        payload: data
    }
}

export const succesGetEmployee = (data) => {
    return {
        type: "SUCCESS_GET_EMPLOYEES",
        payload: data
    }
}

export const successAddEmployee = (data) => {
    return {
        type: "SUCCESS_ADD_EMPLOYEE",
        payload: data
    }
}
export const succesEditEmployee = (data) => {
    return {
        type: "SUCCESS_EDIT_EMPLOYEE",
        payload: data
    }
}
export const succesDeleteEmployee = (data) => {
    return {
        type: "SUCCESS_DELETE_EMPLOYEE",
        payload: data
    }
}

export const fetchCompanies = () => {
    return function (dispatch) {
        fetch(baseUrl + '/company', {
            headers: {
                "access_token": localStorage.access_token
            }
        })
            .then(response => response.json())
            .then(data => dispatch(succesGetCompanies(data)))
    }
}

export const fetchAddCompany = (input) => {
    return function (dispatch) {
        fetch(baseUrl + '/company', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "access_token": localStorage.access_token
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.message) {
                    dispatch(succesAddCompany(data))
                    Swal.fire(
                        'Success',
                        data.name + " Success Create",
                        'success'
                    )
                } else {
                    throw data
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }
}

export const fetchEditCompany = (id, input, companies, cb) => {
    return function (dispatch) {
        fetch(baseUrl + '/company/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const newCompanies = companies.filter(el => el.id !== id)
                dispatch(succesEditCompany([input, ...newCompanies]))
                Swal.fire(
                    'Success',
                    "Edit data succes",
                    'success'
                )
                cb()
            })
    }
}

export const fetchDeleteCompany = (id, companies) => {
    return function (dispatch) {
        fetch(baseUrl + '/company/delete/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => {
                const newCompanies = companies.filter(el => el.id !== id)
                dispatch(succesDeleteCompany(newCompanies))
            })
    }
}

export const fetchEmployees = () => {
    return function (dispatch) {
        fetch(baseUrl + '/employee', {
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => dispatch(succesGetEmployee(data)))
    }
}

export const fetchAddEmployee = (input, cb) => {
    return function (dispatch) {
        fetch('http://localhost:3001/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "access_token": localStorage.access_token
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.message) {
                    dispatch(successAddEmployee(input))
                    Swal.fire(
                        'Success',
                        data.firstName + " Success Create",
                        'success'
                    )
                    cb()
                } else {
                    throw data
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }
}

export default function fetchEditEmployee(id, input, employee, cb) {
    console.log(employee)
    return function (dispatch) {
        fetch(baseUrl + '/company/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                const newEmployee = employee.filter(el => el.id !== id)
                dispatch(succesEditEmployee([input, ...newEmployee]))
                Swal.fire(
                    'Success',
                    "Edit data succes",
                    'success'
                )
                cb()
            })
    }
}

export const fetchDeleteEmployee = (id, employees) => {
    return function (dispatch) {
        fetch(baseUrl + '/employee/delete/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => {
                const newEmployees = employees.filter(el => el.id !== id)
                dispatch(succesDeleteEmployee(newEmployees))
            })
    }
}
