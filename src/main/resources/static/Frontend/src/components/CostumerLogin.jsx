import { useState } from "react";
import { POST } from "../api/api";

export default function CostumerLogin () {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const login = () => {
        const url = "http://localhost:8080/login/costumer";
        const body = formData;

        POST(url, body);
    };

    return (
        <main className="flex justify-center items-center px-10 h-screen w-screen bg-blue-100">
            <form className="bg-white rounded-3xl flex justify-around w-full">
                <div className="hidden sm:flex flex-col items-center px-10 py-10 h-142.5 w-96 bg-cover rounded-2xl bg-[url('/Frontend/public/cuties.png')]">
                    <h1 className="font-[inter] text-blue-950 text-3xl font-bold text-start">Everything you love, in one place.</h1>
                    <p className="text-cyan-900 text-start text-sm">Discover great products, enjoy seamless checkout, and experience
                        shopping made simple.</p>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl px-3 py-6 h-142.5 w-96">
                    <h1 className="text-blue-600 text-2xl font-bold tracking-wide text-center">
                        ShopEase
                    </h1>
                    <h1 className="text-2xl font-bold tracking-wide text-center">
                        Welcome back
                        <p className="text-center text-sm font-normal">Please login a litte</p>
                    </h1>
                    <input onChange={handleChange} className="py-3 bg-blue-100 w-full px-6 rounded-2xl outline-0" type="email" placeholder="Email address" />
                    <input onChange={handleChange} className="py-3 bg-blue-100 w-full px-6 rounded-2xl outline-0" type="password" name="" id="" placeholder="Password" />
                            <p className="text-end text-xs">Forgot passowrd?</p>
                            <button onClick={login} className="font-bold bg-blue-600 py-3 px-6 rounded-2xl text-white hover:bg-blue-700">Login</button>
                            <div className="flex gap-3 justify-center items-center w-full px-4">
                                <hr className="w-full" /><span className="whitespace-nowrap text-sm">Or login with</span>
                                    <hr className="w-full" />
                                    </div>
                                    <div className="px-2 border-gray-400 py-3 justify-center hover:bg-blue-100 rounded-2xl flex items-center border gap-2">
                                        <img width="25" height="25" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                                        <span className="text-sm">Google</span>
                                    </div>
                                    <div className="px-2 py-3 border-gray-400 justify-center hover:bg-blue-100 rounded-2xl flex items-center border gap-2">
                                        <img width="25" height="25" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" />
                                        <span className="text-sm">Facebook</span>
                                    </div>
                                    <p className="text-center">don't have an account? <a className="text-blue-600 hover:underline" href="/costumer-signup">Sign up</a></p>
                            </div>
                        </form>
                    </main>
    );
}