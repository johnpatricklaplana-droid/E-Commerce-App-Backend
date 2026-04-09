import { useState } from "react";
import { POST } from "../api/API";
import Button from "../components/Button";

export default function AdminLogin () {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const login = async () => {
        
        const url = "http://localhost:8080/api/auth/login";
        const body = formData;

        const result = await POST(url, body);
 
        if(result.status === 200) {
            // TODO: 
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-blue-100">
            <div className="bg-white flex p-5 mw-[100%] items-center w-96 flex-col gap-2 rounded-2xl">
                <h1 className="font-bold text-2xl text-center">
                    TODO: SOME LOGO
                </h1>
                <h1 className="text-3xl font-bold text-center">Admin Login</h1>
                <div className="w-full flex gap-1.5 flex-col">
                    <div>
                        <label className="text-[14px]" htmlFor="">Email address</label>
                        <div className="flex bg-blue-100 rounded gap-1.5 items-center px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" />
                                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <input id="email" value={formData.email} onChange={handleChange} className="w-full outline-0 py-2.5" type="email" placeholder="admin@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[14px]" htmlFor="">Password</label>
                        <div className="flex bg-blue-100 rounded gap-1.5 items-center px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" stroke-width="2" />
                                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" />
                                <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                            </svg>
                            <input id="password" value={formData.password} onChange={handleChange} className="w-full outline-0 py-2.5" type="password" placeholder="************" />
                        </div>
                    </div>
                    <p className="text-sm text-blue-600">Forgot password?</p>
                    <Button onClick={login}>Login</Button>
                </div>
                <div><span className="text-[12px]">Privacy Policy</span> <span className="text-[12px]">|</span> <span className="text-[12px]">Terms of Service</span></div>
            </div>
        </div>
    );
}