import { Navigate } from "react-router-dom"
export default function ProtectedLogin({children}) {
    const token = localStorage.access_token
    if(token) {
        return <Navigate to="/" replace />
    }
    return children
}