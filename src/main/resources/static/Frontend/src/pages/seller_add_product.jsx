import Sidebar from "../components/Sidebar";
import ImageUploader from "./ImageUploader";
import { useState } from "react";
import { PostFile } from "../api/API"
import Button from "../components/Button";
import LeftArrow from "../components/LeftArrow";
import Text from "../components/Text";
import Input from "../components/Input";

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
        const url = "http://localhost:8080/api/seller/product"
        const body = new FormData();
        
        formData.images.forEach(image => {
            body.append("files", image);
        });
        
        body.append(
            "productData",
            new Blob([JSON.stringify({
                "productName": formData.productName,
                "price": formData.price,
                "color": formData.color,
                "variant": formData.variant,
                "categories": formData.categories,
                "description": formData.description
            })], { type: "application/json" })
        );
     console.log(formData);
        PostFile(url, body);
    };

    return (
        <div className="h-screen grid grid-cols-[280px_1fr] bg-blue-100 w-screen">
            
            <Sidebar/>

            <div className="p-5 w-full flex min-h-0">
                <div className="bg-white/50 p-5 min-h-0 h-full flex overflow-auto flex-col gap-4 w-full rounded-2xl">
                    <div className="relative">
                        <LeftArrow hover={"grow"} className="w-8 h-8" label={"Back to products"} />
                        <div>
                            <Text position={"center"} variant={"heading1"}>Add New Product</Text>
                            <Text position={"center"} variant={"small"}>Fill in the details below to add new product to your store</Text>
                        </div>
                    </div>
                    <main className="bg-white p-5 rounded-2xl">
                        <div>
                            <div className="p-2.5 flex gap-4 flex-col">
                                <div className="grid gap-3 sm:grid-cols-[550px_1fr]">
                                    <div className="flex p-3 border-r border-slate-400 flex-col gap-3">
                                        <div className="">
                                            <Text variant={"label"}>Product Name</Text>
                                            <Input id={"productName"} variant={"default"} placeholder={"Enter product name"} fullWidth={true}></Input>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Text variant={"label"}>Price</Text>
                                                <div className="flex">
                                                    <span className="bg-gray-200 rounded-l-[10px] flex items-center px-2">$</span>
                                                    <Input id={"price"} handleChange={handleChange} placeholder={"Enter price"} fullWidth={true} variant={"default"}>Price</Input>
                                                </div>
                                            </div>
                                            <div>
                                                <Text variant={"label"}>Color</Text>
                                                <Input id={"color"} handleChange={handleChange} placeholder={"Enter color"} variant={"default"} fullWidth={true}></Input>
                                            </div>
                                        </div>
                                        <div>
                                            <Text variant={"label"}>Variant</Text>
                                            <div>
                                                <Input id={"variant"} placeholder={"Enter some"} fullWidth={true} handleChange={handleChange} variant={"default"}></Input>
                                                <Text variant={"muted"}>Examples Size, Storage, Style, etc.</Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Text variant={"label"}>categories</Text>
                                            <Text variant={"muted"}>Select one or more categories that apply to this product.</Text>
                                            <Input id={"categories"} variant={"default"} fullWidth={true} type={"select"}>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                            </Input>
                                            <div className="mt-3 flex gap-1">
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
                                    <Text variant={"label"}>description</Text>
                                    <Input id={"description"} type={"textarea"} handleChange={handleChange} variant={"default"} fullWidth={true}></Input>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <Button variant="secondary">Cancel</Button>
                                    <Button onClick={submit}>Submit</Button>
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




