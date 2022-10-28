import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAddEmployee, fetchCompanies } from "../../store/actions"
export default function AddEmployee() {
    const navigate = useNavigate()
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
    const handleInput = (e) => {
        e.preventDefault()
        dispatch(fetchAddEmployee(input, () => {
            setInput({
                firstName: "",
                lastName: '',
                CompanyId: '',
                email: '',
                phone: ''
            })
        }))
    }
    const dispatch = useDispatch()
    const { companies } = useSelector((state) => state.companies)
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [])
    return (
        <section>
            <div className="container mx-auto max-w-2xl border p-5 bg-slate-100 rounded-md">
                <h1 className="text-2xl mb-3 font-semibold"> Add Companies</h1>
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
                                    return <option value={el.id} key={idx}>{el.name}</option>
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
                    <button className="bg-sky-700 text-slate-50 py-1 px-2 rounded-md hover:bg-sky-800 mr-2" onClick={handleInput}>Save</button>
                    <button className="bg-red-700 text-slate-50 py-1 px-2 rounded-md hover:bg-red-800" onClick={() => navigate('/employee')}>Cancel</button>
                </form>
            </div>
        </section>
    )
}