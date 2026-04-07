import { useState } from "react";
import { POST } from "../api/api";

export default function SellerSignup () {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => {
            return {...prev, [id]: value};
        })
    };

    const login = () => {
        const url = "http://localhost:8080/signup/seller";
        const body = formData;

        POST(url, body);
    }

    return (
        <div className="h-screen bg-blue-100 w-screen flex items-center justify-center">
            <div className="flex w-full sm:bg-white sm:shadow-2xl rounded-2xl sm:w-125 flex-col justify-center gap-2.5 items-center p-6">
                <h1 className="text-3xl font-bold">Seller Sign Up</h1>
                <h2 className="text-gray-400">Create your seller account</h2>
                <hr className="w-full text-gray-400" />
                <div className="flex w-full gap-2.5">
                    <div className="flex w-full flex-col">
                        <label className="text-sm" htmlFor="">First Name</label>
                        <input onChange={handleChange} id="firstName" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Enter your first name" />
                    </div>
                    <div className="flex w-full flex-col">
                        <label className="text-sm" htmlFor="">Last Name</label>
                        <input onChange={handleChange} id="lastName" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Enter your last name" />
                    </div>
                </div>
                <hr className="w-full text-gray-400" />
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="">Street Address</label>
                    <input onChange={handleChange} id="street" className="border border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Enter your steet address" />
                </div>
                <hr className="w-full text-gray-400" />
                <div className="flex justify-between items-center gap-2.5 w-full">
                    <div className="w-full">
                        <label className="text-sm" htmlFor="">City</label>
                        <input onChange={handleChange} id="city" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Enter your city" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm" htmlFor="">Province/State</label>
                        <input onChange={handleChange} id="province" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Select province/state" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm" htmlFor="">Postal Code</label>
                        <input onChange={handleChange} id="postalCode" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="text" placeholder="Enter postal code" />
                    </div>
                </div>
                <hr className="w-full text-gray-400" />
                <div className="w-full">
                    <label className="text-sm" htmlFor="">Country</label>
                    <select onChange={handleChange} id="country" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" name="">
                        <option value="Philippines">Philippines</option>
                    </select>
                </div>
                <hr className="text-gray-400 w-full" />
                <div className="w-full flex flex-col">
                    <label className="text-sm" htmlFor="">Email Address</label>
                    <input onChange={handleChange} id="email" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="email" placeholder="Enter you email address" />
                </div>
                <hr className="w-full text-gray-400" />
                <div className="w-full flex flex-col">
                    <label className="text-sm" htmlFor="">Password</label>
                    <input onChange={handleChange} id="password" className="border w-full border-gray-400 rounded p-1.5 outline-0 text-sm" type="password" placeholder="Create a password" />
                </div>
                <button onClick={login} id="signupSubmitButton" className="w-full bg-blue-800 text-white py-1.5 rounded font-bold">Sign Up</button>
            </div>
        </div>
    );
}