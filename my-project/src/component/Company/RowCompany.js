import { useState } from "react"
import { BiEdit } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { fetchDeleteCompany, fetchEditCompany } from "../../store/actions"
export default function RowCompany({ company, idx, companies }) {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: "",
        email: '',
        logo: '',
        website: ''
    })
    const changeInput = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }
    const [showModal, setShowModal] = useState(false)
    const showEdit = (id) => {
        setShowModal(true)
        fetch('https://interview-hamparanstone.herokuapp.com/company/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'access_token': localStorage.access_token
            },
        })
            .then(response => response.json())
            .then(data => setInput(data))
    }
    const handleSaveEdit = (id) => {
        dispatch(fetchEditCompany(id, input, companies, () => {
            setShowModal(false)
        }))
    }
    const deleteCompany = (id) => {
        dispatch(fetchDeleteCompany(id, companies))
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
                deleteCompany(id)
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
                                        Edit Company
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Company Name</p>
                                            <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="name" value={input.name} onChange={changeInput} />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Email</p>
                                            <input type={"email"} className="w-full border py-1 px-2 rounded-md" name="email" value={input.email} onChange={changeInput} />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Logo</p>
                                            <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="logo" value={input.logo} onChange={changeInput} />
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-slate-700">Website</p>
                                            <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="website" value={input.website} onChange={changeInput} />
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
                                        onClick={() => handleSaveEdit(company.id)}
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
            <tr>
                <td className="text-center">{idx}</td>
                <td>{company.name}</td>
                <td>
                    <img src={company.logo} alt="logo" width={"100px"} />
                </td>
                <td>{company.email}</td>
                <td>{company.website}</td>
                <td>
                    <button className="bg-amber-400 text-slate-50 py-1 px-2 rounded-md hover:bg-amber-500 mr-2" onClick={() => showEdit(company.id)}><BiEdit className="inline mb-1" />Edit</button>
                    <button className="bg-red-600 text-slate-50 py-1 px-2 rounded-md hover:bg-red-700 mr-2" onClick={() => confirmDelete(company.id)}><MdOutlineDelete className="inline mb-1" />Delete</button>
                </td>
            </tr>
        </>
    )
}

