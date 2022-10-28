import { useEffect } from "react"
import { AiOutlineFileAdd } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import RowCompany from "../component/Company/RowCompany"
import { fetchCompanies } from "../store/actions"
export default function CompanyPages() {
    const dispatch = useDispatch()
    const { companies } = useSelector((state) => state.companies)
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [])
    return (
        <section>
            <div className="container mx-auto max-w-4xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Companies</h1>
                    <Link to="/addCompany"><button className="bg-sky-700 text-slate-50 py-1 px-2 rounded-md hover:bg-sky-800"><AiOutlineFileAdd className="inline mb-1" /> Add Company</button></Link>
                </div>
                <div className="mt-3 w-full p-3 h-[80vh] overflow-y-auto">
                    <table className="w-full">
                        <thead>
                            <th className="w-[5%]">No</th>
                            <th className="w-[15%] text-left">Name</th>
                            <th className="text-left w-[15%]">Logo</th>
                            <th className="text-left w-[25%]">Email</th>
                            <th className="text-left w-[20%]">Website</th>
                            <th className="text-left w-[20%]"></th>
                        </thead>
                        <tbody>
                            {
                                companies.length === 0 ? <tr><td colSpan={5} className="text-center py-5">Loading...</td></tr> : companies.map((company, idx) => <RowCompany company={company} key={idx} idx={idx + 1} companies={companies}/>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}