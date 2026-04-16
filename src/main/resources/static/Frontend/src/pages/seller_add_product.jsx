import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { PostFile } from "../api/API";
import Button from "../components/Button";
import LeftArrow from "../components/LeftArrow";
import Text from "../components/Text";
import Input from "../components/Input";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home_kitchen", label: "Home & Kitchen" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "toys", label: "Toys & Games" },
    { value: "automotive", label: "Automotive" },
    { value: "books", label: "Books" },
    { value: "grocery", label: "Grocery & Food" },
    { value: "health", label: "Health & Wellness" }
];

export default function SellerAddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        categories: ""
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const submit = async () => {
        const url = "http://localhost:8080/api/seller/product";
        const formFields = formData;

        const body = new FormData();
        body.append(
            "product",
            new Blob([JSON.stringify(formFields)], {
                type: "application/json"
            })
        );
        body.append("thumbnail", thumbnail);
    
        const result = await PostFile(url, body);

        if(Number(result.status) === 201) {
            navigate(`/add-product-variants/${result.message}`);
        } else {
            // TODO
        }

    };

    const changeImage = (e) => {
        const imageFile = e.target.files[0];

        setThumbnail(imageFile);
        setThumbnailPreview(URL.createObjectURL(imageFile));
    };

    return (
        <div className="h-screen grid grid-cols-[280px_1fr] bg-slate-100 w-screen">
            <Sidebar />

            <div className="p-6 w-full flex min-h-0">
                <div className="bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] p-6 min-h-0 h-full flex overflow-auto flex-col gap-6 w-full rounded-[2rem]">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <LeftArrow hover="grow" className="w-9 h-9" label="Back to products" />
                            <div>
                                <Text position="left" variant="heading1">
                                  Add Product
                                </Text>
                                <Text position="left" variant="small">
                                  Only the fields needed to publish your item.
                                </Text>
                          </div>
                        </div>
                    </div>

                    <main className="w-full rounded-[1.75rem] bg-slate-50 p-8 shadow-sm">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Text variant="label">Product name</Text>
                                    <Input
                                        id="productName"
                                        handleChange={handleChange}
                                        placeholder="Enter product name"
                                        variant="default"
                                        fullWidth={true}
                                        value={formData.productName}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Text variant="label">Category</Text>
                                    <Select
                                        options={categoryOptions}
                                        isMulti
                                        placeholder="Select skills..."
                                        onChange={(selected) => {
                                            const value = selected.map(elected => ({categoryName: elected.value}));
                                            setFormData(prev => ({
                                                ...prev,
                                                categories: value
                                            }))
                                        }}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Text variant="label">Description</Text>
                                    <Input
                                        type="textarea"
                                        placeholder={"$10000"}
                                        variant={"default"}
                                        id={"description"}
                                        fullWidth={true}
                                        handleChange={handleChange}
                                        height={"h-full max-h-[100px]"}
                                    ></Input>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] min-h-[320px] group relative border border-slate-200 bg-white p-6 shadow-sm">
                               <img className="w-full h-full" src={thumbnailPreview} alt="" />
                                <label 
                                    className={`w-full group-hover:opacity-100 ${thumbnailPreview === null ? "opacity-100 hover:bg-blue-50" : "opacity-0"} absolute z-50 top-0 left-0 border-0 flex-col hover:backdrop-blur-2xl rounded-2xl cursor-pointer flex items-center justify-center h-full`}
                                    htmlFor="thumbnail"
                                >
                                    <div className="w-1/2">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 18H17C19.2 18 21 16.4 21 14.2C21 12.4 19.7 10.9 18 10.5C17.6 7.4 15.1 5 12 5C9.2 5 6.8 7 6.2 9.7C4.4 10.1 3 11.7 3 13.6C3 16 4.8 18 7 18Z"
                                                stroke="#3B82F6" strokeWidth="1.8" strokeLinejoin="round" />

                                            <path d="M12 12V8" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
                                            <path d="M10 10L12 8L14 10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

                                            <path d="M9 18H15" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p className="font-bold">Image only. I said image only!</p>
                                </label>
                                <input onChange={changeImage} className="hidden" type="file" name="" id="thumbnail" />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Button variant="secondary">Cancel</Button>
                            <Button onClick={submit}>Publish product</Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}




