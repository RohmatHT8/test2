import { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import Swal from 'sweetalert2'
export default function LoginPages() {
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const changeInput = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                if(!data.message) {
                    localStorage.setItem("access_token", data.access_token)
                }else{
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
    return (
        <section>
            <div className="w-screen h-screen primaryGradient pt-10 flex justify-center items-center">
                <div className="max-w-lg bg-slate-50 shadow-xl rounded-lg mx-auto p-5">
                    <h1 className="font-medium text-2xl text-center mb-2">Wellcome !</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <p className="font-semibold text-slate-700">Email</p>
                            <input type={"text"} name="email" className="rounded-lg py-1 px-2 border" value={input.email} onChange={changeInput} />
                        </div>
                        <div className="mb-3">
                            <p className="font-semibold text-slate-700">Password</p>
                            <input type={"password"} name="password" className="rounded-lg py-1 px-2 border" value={input.password} onChange={changeInput} />
                        </div>
                        <div>
                            <button className="font-semibold text-slate-700 primaryGradient px-2 py-1 rounded-lg w-full opacity-90 hover:opacity-100">Login <FiLogIn className='inline mb-1' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}