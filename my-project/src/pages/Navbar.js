export default function Navbar() {
    return (
        <div className="py-4 w-full relative top-0 flex justify-center gap-3 z-50">
            <h1 className="font-semibold text-slate-700 hover:font-bold hover:underline cursor-pointer">Companies</h1>
            <h1 className="font-semibold text-slate-700 hover:font-bold hover:underline cursor-pointer">Employees</h1>
            <h1 className="font-semibold text-slate-700 hover:font-bold hover:underline cursor-pointer">Quotes</h1>
        </div>
    )
}