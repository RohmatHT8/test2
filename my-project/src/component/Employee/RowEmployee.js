import { BiEdit } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import fetchEditEmployee, { fetchDeleteEmployee } from "../../store/actions"
export default function RowEmployee({ id, employee, companies, employees }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [company, setCompany] = useState([])
    const fullName = () => {
        return employee.firstName + " " + employee.lastName
    }
    const [input, setInput] = useState({
        firstName: "",
        lastName: '',
        CompanyId: '',
        email: '',
        phone: ''
    })
    const changeInput = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }
    const showEdit = (id) => {
        fetch('https://interview-hamparanstone.herokuapp.com/employee/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setInput(data)
            })
        setShowModal(true)
    }
    const handleSaveEdit = (id) => {
        dispatch(fetchEditEmployee(id, input, employees, () => {
            setShowModal(false)
        }))
    }

    const handleDeleteEmployee = (id) => {
        dispatch(fetchDeleteEmployee(id, employees))
    } 
    const companyDetail = (id) => {
        fetch('https://interview-hamparanstone.herokuapp.com/company/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => setCompany(data))
        setShowModalDetail(true)
    }
    const confirmDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteEmployee(id)
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Employee
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form>
                                        <div className="mb-3 flex">
                                            <div className="w-full">
                                                <p className="text-slate-700">First Name</p>
                                                <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="firstName" value={input.firstName} onChange={changeInput} />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-slate-700">Last Name</p>
                                                <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="lastName" value={input.lastName} onChange={changeInput} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Company</p>
                                            <select className="w-full border py-1 px-2 rounded-md" name="CompanyId" onChange={changeInput}>
                                                <option disabled selected value={''}>Choose One</option>
                                                {
                                                    companies.map((el, idx) => {
                                                        return employee.CompanyId === el.id ? 
                                                            <option value={el.id} selected>{el.name}</option> :
                                                            <option value={el.id}>{el.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Email</p>
                                            <input type={"email"} className="w-full border py-1 px-2 rounded-md" name="email" value={input.email} onChange={changeInput} />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Phone</p>
                                            <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="phone" value={input.phone} onChange={changeInput} />
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-sky-700 text-white hover:bg-sky-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleSaveEdit(employee.id)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {showModalDetail ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <img src={company.logo} alt="name.png" className="w-[200px]" />
                                    <p className="text-center font-bold text-2xl text-amber-700">{company.name}</p>
                                    <p className="text-center text-slate-700">{company.website}</p>
                                    <p className="text-center text-slate-700">{company.email}</p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModalDetail(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}


            <tr>
                <td className="text-center">{id}</td>
                <td>{fullName()}</td>
                <td>
                    <button className="bg-green-400 text-xs py-1 px-2 rounded-lg text-white hover:bg-green-600" onClick={() => companyDetail(employee.CompanyId)}>Company Detail</button>
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>
                    <button className="bg-amber-400 text-slate-50 py-1 px-2 rounded-md hover:bg-amber-500 mr-2" onClick={() => showEdit(employee.id)}><BiEdit className="inline mb-1" />Edit</button>
                    <button className="bg-red-600 text-slate-50 py-1 px-2 rounded-md hover:bg-red-700 mr-2" onClick={() => confirmDelete(employee.id)}><MdOutlineDelete className="inline mb-1" />Delete</button>
                </td>
            </tr>
        </>
    )
}