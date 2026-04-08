import Sidebar from "./AddProductSidebar";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

export default function SellerAddProduct() {

    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        color: "",
        variant: "",
        categories: [],
        description: "",
        images: []
    });
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const handleImageChange = (newImages) => {
        setFormData(prev => ({...prev, images: newImages}))
    };
    
    const submit = () => {
        console.log(formData);
    };

    return (
        <div className="h-screen grid grid-cols-[280px_1fr] bg-blue-100 w-screen">
            
            <Sidebar/>

            <div className="p-5 w-full flex min-h-0">
                <div className="bg-white/50 p-5 min-h-0 h-full flex overflow-auto flex-col gap-4 w-full rounded-2xl">
                    <div className="relative">
                        <button
                            className="flex bg-white transition hover:scale-105 duration-300 hover:bg-blue-100 cursor-pointer absolute text-[14px] items-center text-slate-800 border-slate-400 rounded-2xl px-4 py-1.5 border gap-1.5"
                            onclick="history.back()">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Products
                        </button>
                        <div>
                            <h1 className="text-center font-bold font-sans text-slate-800 text-[24px]">Add New Product</h1>
                            <p className="text-center text-sm">Fill in the details below to add new product to your store</p>
                        </div>
                    </div>
                    <main className="bg-white p-5 rounded-2xl">
                        <div>
                            <div className="p-2.5 flex gap-4 flex-col">
                                <div className="grid gap-3 sm:grid-cols-[550px_1fr]">
                                    <div className="flex p-3 border-r border-slate-400 flex-col gap-3">
                                        <div className="">
                                            <label className="text-[14px] font-semibold" htmlFor="">Product Name<span className="text-red-600">*</span></label>
                                            <input id="productName" onChange={handleChange} className="w-full border-slate-400 border text-sm p-1.5 rounded-[10px] outline-0" type="text"
                                                placeholder="Enter product name" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[14px] font-semibold" htmlFor="">Price <span className="text-red-600">*</span></label>
                                                <div className="flex">
                                                    <span className="bg-gray-200 rounded-l-[10px] flex items-center px-2">$</span>
                                                    <input id="price" onChange={handleChange} className="w-full border-slate-400 text-sm border-l-0 p-1.5 rounded-r-[10px] outline-0 border"
                                                        type="text" placeholder="0.00" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[14px] font-semibold" htmlFor="">Color</label>
                                                <input id="color" onChange={handleChange} className="w-full border-slate-400 text-sm outline-0 p-1.5 rounded-[10px] border" type="text"
                                                    placeholder="Enter color (e.g.., Red, Blue)" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[14px] font-semibold" htmlFor="">Variant</label>
                                            <div>
                                                <input id="variant" onChange={handleChange} className="w-full border-slate-400 text-sm outline-0 p-1.5 rounded-[10px] border" type="text"
                                                    placeholder="Enter variant (e.g.., Small, 32gb)" />
                                                    <p className="text-[12px] font-extralight">Examples Size, Storage, Style, etc.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[14px] font-semibold" htmlFor="">Categories <span className="text-red-600">*</span></label>
                                            <p className="text-[12px] font-extralight">Select one or more categories that apply to this product.</p>
                                            <select id="categories" onChange={handleChange} className="w-full text-sm border-slate-400 outline-0 p-1.5 rounded-[10px] border">
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                            </select>
                                            <div className="mt-3">
                                                <span className="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Electronics
                                                    <span>X</span></span>
                                                <span className="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Clothing
                                                    <span>X</span></span>
                                                <span className="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Accessories
                                                    <span>X</span></span>
                                            </div>
                                        </div>
                                    </div>

                                <ImageUploader images={formData.images} setImages={handleImageChange} />

                                </div>
                                <div>
                                    <label htmlFor="">Description</label>
                                    <textarea id="description" onChange={handleChange} className="border-slate-400 rounded-[10px] p-3 text-sm border w-full h-32 resize-none outline-0" placeholder="Enter product description, features, and other important details..." maxlength="500"></textarea>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button className="cursor-pointer shadow-2xl hover:bg-blue-100 border-slate-400 border-2 rounded-[10px] transition hover:scale-105 duration-300 px-4 py-2">Cancel</button>
                                    <button onClick={submit} className="cursor-pointer shadow-2xl hover:bg-black border-slate-400 bg-slate-900 text-white transition hover:scale-105 duration-300 border-2 rounded-[10px] px-4 py-2">Save Product</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="bg-blue-200/80 border border-blue-400 p-4 rounded-2xl flex gap-3 items-center">
                        <svg className="text-blue-500 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="7" x2="12" y2="13" />
                            <circle cx="12" cy="17" r="1" />
                        </svg>
                        <p className="text-[14px]"><span className="font-bold">Tip:</span> Add accurate details to attract more costumers</p>
                    </footer>
                </div>
            </div> 
        </div>
    );
}




