import { useState } from "react";
import { POST } from "../api/api";

export default function SellerLogin () {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const login = () => {
        const url = "http://localhost:8080/login/seller";
        const body = formData;
        console.log(body);
        POST(url, body);
    };

    return (
        <div 
            className="items-center flex justify-center bg-blue-100 h-screen w-screen"
        >

            <div 
                className="flex flex-col gap-1.5 items-center bg-white p-2.5 sm:rounded-2xl w-96 py-5"
            >

                <h1 
                    className="text-blue-600 text-2xl font-bold tracking-wide text-center"
                >
                    ShopEase
                </h1>

                <div>
                    <h2 
                        className="text-2xl font-bold"
                    >Login as seller</h2>
    
                    <p 
                        className="text-sm text-center"
                    >please login a litte</p>
                </div>

                <input 
                    id="email"
                    // value={formData.email} i think this is useless just remove the comment when problem happens without this
                    onChange={handleChange} 
                    className="py-3 bg-blue-100 w-full px-6 rounded-2xl outline-0" type="email" placeholder="Email address" 
                />

                <input 
                    id="password" 
                    // value={formData.password} i think this is useless just remove the comment when problem happens without this
                    onChange={handleChange}
                    className="py-3 bg-blue-100 w-full px-6 rounded-2xl outline-0" type="password" name="" placeholder="Password" 
                />
                
                <p 
                    className="text-end text-xs"
                >Forgot passowrd?</p>

                <button 
                    className="font-bold w-full bg-blue-600 py-3 px-6 rounded-2xl text-white hover:bg-blue-700"
                    onClick={login}
                >Login</button>

                <div 
                    className="flex gap-3 justify-center items-center w-full px-4"
                >

                    <hr className="w-full" />
                    
                    <span 
                        className="whitespace-nowrap text-sm"
                    >Or login with</span>
    
                    <hr className="w-full" />

                </div>

                <div 
                    className="px-2 w-full border-gray-400 py-3 justify-center hover:bg-blue-100 rounded-2xl flex items-center border gap-2"
                >

                    <img 
                        width="25" 
                        height="25" 
                        src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" 
                    />

                    <span 
                        className="text-sm"
                    >Google</span>

                </div>

                <div 
                    className="px-2 w-full py-3 border-gray-400 justify-center hover:bg-blue-100 rounded-2xl flex items-center border gap-2"
                >

                    <img 
                        width="25" 
                        height="25" 
                        src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" 
                    />

                    <span 
                        className="text-sm"
                    >Facebook</span>

                </div>
                <p
                    className="text-center"
                >
                    
                    don't have an account?
                    <a  
                        className="text-blue-600 hover:underline" href="#"
                    > 
                        Sign up

                    </a>
                </p>
            </div>
        </div>
    );
}