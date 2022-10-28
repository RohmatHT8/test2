import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"

export default function Navbar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("access_token")
        navigate('/login')
    }
    return (
        <div className="py-4 w-full relative top-0 flex justify-between z-50 px-60 primaryGradient mb-4">
            <div className="flex gap-3">
                <Link to="/"><h1 className="font-semibold text-slate-700 hover:font-bold cursor-pointer">Companies</h1></Link>
                <Link to="/employee"><h1 className="font-semibold text-slate-700 hover:font-bold cursor-pointer">Employees</h1></Link>
                <h1 className="font-semibold text-slate-700 hover:font-bold cursor-pointer">Quotes</h1>
            </div>
            <h1 className="font-semibold text-slate-700 hover:font-bold hover:text-red-600 cursor-pointer" onClick={logout}>Logout <FiLogOut className="inline mb-[0.10rem]" /></h1>
        </div>
    )
}