import { Link } from "react-router-dom"
import { AiOutlineFileAdd } from 'react-icons/ai'
import RowEmployee from "../component/Employee/RowEmployee"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchEmployees, fetchCompanies } from "../store/actions"
export default function EmployeePages() {
    const { employees } = useSelector((state) => state.employees)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])
    const { companies } = useSelector((state) => state.companies)
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [])
    return (
        <>
            <section>
                <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">Employee</h1>
                        <Link to="/addEmployee"><button className="bg-sky-700 text-slate-50 py-1 px-2 rounded-md hover:bg-sky-800"><AiOutlineFileAdd className="inline mb-1" /> Add Employee</button></Link>
                    </div>
                    <div className="mt-3 w-full p-3 h-[80vh] overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <th className="w-[5%]">No</th>
                                <th className="w-[15%] text-left">Full Name</th>
                                <th className="text-left w-[25%]">Company</th>
                                <th className="text-left w-[20%]">Email</th>
                                <th className="text-left w-[15%]">Phone</th>
                                <th className="text-left w-[20%]"></th>
                            </thead>
                            <tbody>
                                {
                                    employees.length === 0 ? <tr><td colSpan={5} className="text-center py-5">Loading...</td></tr> : employees.map((el, idx) => <RowEmployee key={idx} employee={el} id={idx + 1} companies={companies} employees={employees}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}