import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { POST, PostFile } from "../api/API";
import Button from "../components/Button";
import LeftArrow from "../components/LeftArrow";
import Text from "../components/Text";
import Input from "../components/Input";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
    { value: "js", label: "JavaScript" },
    { value: "py", label: "Python" },
    { value: "react", label: "React" },
    { value: "java", label: "java" },
    { value: "css", label: "css" },
    { value: "spring", label: "spring" },
    { value: "vague", label: "vague" },
    { value: "tailwind", label: "tailwind" }
];

export default function SellerAddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        categories: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const submit = async () => {
        const url = "http://localhost:8080/api/seller/product";
        const body = formData;
    
        const result = await POST(url, body);

        navigate(`/todo/${result}`);

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

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <Text variant="label">Quick summary</Text>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                      Required fields
                                    </span>
                                </div>
                                <div className="mt-6 space-y-4 text-sm text-slate-600">
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-slate-500">Product name</p>
                                        <p className="mt-2 text-slate-900 font-semibold">What customers will see first</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-slate-500">Price</p>
                                        <p className="mt-2 text-slate-900 font-semibold">Set the selling price</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-slate-500">Category</p>
                                        <p className="mt-2 text-slate-900 font-semibold">Organize your listing</p>
                                    </div>
                                </div>
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




