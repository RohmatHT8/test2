import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAddCompany } from "../../store/actions"
export default function AddCompany() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    const handleInput = (e) => {
        e.preventDefault()
        dispatch(fetchAddCompany(input))
        navigate('/')
    } 
    return (
        <section>
            <div className="container mx-auto max-w-2xl border p-5 bg-slate-100 rounded-md">
                <h1 className="text-2xl mb-3 font-semibold"> Add Companies</h1>
                <form>
                    <div className="mb-3">
                        <p className="text-slate-700">Company Name</p>
                        <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="name" value={input.name} onChange={changeInput}/>
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-700">Email</p>
                        <input type={"email"} className="w-full border py-1 px-2 rounded-md" name="email" value={input.email} onChange={changeInput}/>
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-700">Logo</p>
                        <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="logo" value={input.logo} onChange={changeInput}/>
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-700">Website</p>
                        <input type={"text"} className="w-full border py-1 px-2 rounded-md" name="website" value={input.website} onChange={changeInput}/>
                    </div>
                    <button className="bg-sky-700 text-slate-50 py-1 px-2 rounded-md hover:bg-sky-800 mr-2" onClick={handleInput}>Save</button>
                    <button className="bg-red-700 text-slate-50 py-1 px-2 rounded-md hover:bg-red-800">Cancel</button>
                </form>
            </div>
        </section>
    )
}