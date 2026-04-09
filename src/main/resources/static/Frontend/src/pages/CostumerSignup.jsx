import { useState } from "react";
import { POST } from "../api/API";
import Button from "../components/Button";

export default function CostumerSignup () {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const signUp = (e) => {
        e.preventDefault();
        const requestBody = formData;
        const url = "http://localhost:8080/api/auth/costumer-signup"

        POST(url, requestBody);
    }

    return (
        <div className="h-screen justify-center flex items-center bg-blue-950">
        <form onSubmit={signUp} id="costumer_signup_form" className="flex sm:w-96 h-150 sm:rounded-2xl sm:px-5 items-center gap-1.5 py-2.5 shadow-2xl px-1.5 w-screen flex-col" action="">
            <h1 
                className="text-white text-center text-lg sm:text-2xl font-bold"
            >Create

                <span 
                    className="text-blue-600 text-lg sm:text-2xl font-bold tracking-wide text-center"
                >
                    ShopEase
                </span>
                account
            </h1>

            <div 
                className=" overflow-auto flex flex-col w-full scrollbar-none gap-1.5 py-2.5 px-1.5"
            
            >
                <label 
                    for="" 
                    className="text-white"
                >First Name</label>

                <input 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="enter you first name"
                />

                <label 
                    for="" 
                    className="text-white"
                >Last Name</label>

                <input 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text" 
                    className="text-white w-full outline-none roundedborder-gray-400 border px-2.5 py-2.5" placeholder="enter you last name" 
                />
                        
                <label 
                    for="" 
                    className="text-white"
                >street</label>
                
                <input 
                    id="street" 
                    value={formData.street}
                    onChange={handleChange}
                    type="text" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="street"
                />
            
                <label 
                    for="" 
                    className="text-white"
                >city</label>

                <select 
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5"
                >

                    <option value="">Select your City</option>
                    <option value="Cebu City">Cebu City</option>
                    <option value="Davao City">Davao City</option>
                    <option value="Makati City">Makati City</option>
                    <option value="Quezon City">Quezon City</option>
                    <option value="Taguig City">Taguig City</option>

                </select>
                    
                <label 
                    for="" 
                    className="text-white"
                >province</label>

                <select 
                    id="province"
                    value={formData.province}
                    onChange={handleChange}
                    type="text" 
                    className="text-black w-full outline-none rounded border-gray-400 border px-2.5 py-2.5 bg-white"
                >

                    <option value="">Select a province</option>
                    <option value="Cebu">Cebu</option>
                    <option value="Davao del Sur">Davao del Sur</option>
                    <option value="Metro Manila">Metro Manila</option>

                </select>
                            
                <label 
                    for="" 
                    className="text-white"
                >postal code</label>

                <input 
                    id="postalCode"
                    value={formData.postalCode} 
                    onChange={handleChange}
                    type="text" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="postal code" 
                />

                <label 
                    for="" 
                    className="text-white"
                >country</label>

                <select 
                    id="country"
                    value={formData.country} 
                    onChange={handleChange}
                    type="text" 
                    required
                    className="bg-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="country"
                >

                    <option value="">Select your country</option>
                    <option value="Philippines">Philippines</option>

                </select>
                                
                <label 
                    for="" 
                    className="text-white"
                >Email</label>
                                
                <input 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="enter some email"
                />
                        
                <label 
                    for="" 
                    className="text-white"
                >Password</label>

                <input 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    type="password" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="create powerful password" 
                />
   
                <label 
                    for="" 
                    className="text-white"
                >confirm password</label>
                                        
                <input 
                    id="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password" 
                    className="text-white w-full outline-none rounded border-gray-400 border px-2.5 py-2.5" placeholder="confirm password" 
                />
            </div>

            <Button fullWidth={true}>Register</Button>

            <div 
                className="flex gap-3 justify-center items-center w-full px-4"
            >
                <hr className="w-full text-white" />
                <span 
                    className="text-white whitespace-nowrap text-sm"
                >Or sign in with</span>

                <hr className="w-full text-white" />

            </div>

            <div 
                className="flex w-full justify-center gap-1"
            >
                
                <div
                    className="px-2 border-gray-400 w-[40%] py-1.5 justify-center rounded-2xl flex items-center border gap-2"
                >
                    <img 
                        width="20" 
                        height="20" 
                        src="https://img.icons8.com/color/48/google-logo.png" 
                        alt="google-logo" 
                    />

                    <span 
                        className="text-sm text-white"
                    >Google</span>
                </div>

                <div 
                    className="px-2 py-1.5 border-gray-400 w-[40%] justify-center rounded-2xl flex items-center border gap-2"
                >
                    <img 
                        width="20" 
                        height="20" 
                        src="https://img.icons8.com/color/48/facebook-new.png" 
                        alt="facebook-new" 
                    />

                    <span 
                        className="text-sm text-white"
                    >Facebook</span>
                </div>

            </div>
            <p 
                className="text-white"
            >already have some?</p>

            <a 
                className="text-black hover:bg-orange-500 bg-orange-400 text-center rounded-2xl py-1.5 px-2.5 w-40"
                href="costumer-login"
            >login</a>
        </form>
        </div>
    );
}