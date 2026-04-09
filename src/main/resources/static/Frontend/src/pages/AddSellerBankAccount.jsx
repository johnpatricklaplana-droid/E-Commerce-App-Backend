import { useState } from "react";
import { POST } from "../api/API";
import Button  from "../components/Button";
import Text from "../components/Text";
import Input from "../components/Input";

export default function AddSellerBankAccount () {

    const [formData, setFormData] = useState({
        bank_account_number: "",
        account_type: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(formData => ({...formData, [id]: value}));
    };

    const submit = (e) => {
        e.preventDefault();
        
        const url = "http://localhost:8080/api/seller/bank-account";
        const body = formData;

        POST(url, body);
    };

    return (
        <div className="h-screen flex bg-blue-100 w-screen justify-center items-center">
            <form onSubmit={submit} className="rounded-2xl sm:w-96 shadow-2xl flex flex-col gap-2.5 bg-white p-6" action="">
                <div className="flex items-center gap-2.5">
                    <svg width="40" height="50" viewBox="0 0 35 45">
                        <path d="M2 2 L22 2 L32 12 L32 42 L2 42 L2 2 Z M22 2 L22 12 L31 12 Z" stroke="#93c5fd" fill="none"
                            strokeWidth="3" />
                        <rect x="5" ry="2" rx="2" y="15" width="24" height="3" fill="#93c5fd" />
                        <rect x="5" ry="2" rx="2" y="20" width="24" height="3" fill="#93c5fd" />
                    </svg>
                    <Text variant={"heading3"}>Bank Account Details</Text>
                </div>
                <div className="flex gap-1 flex-col">
                    <Text variant={"label"}>Bank Account Number</Text>
                    <Input handleChange={handleChange} variant={"default"} id="bank_account_number" type={"text"} />
                </div>
                <div className="flex gap-1 flex-col">
                    <Text variant={"label"}>Account type</Text>
                    <Input handleChange={handleChange} id="account_type" variant={"default"} type={"select"}>
                        <option value="">choose some</option>
                        <option value="Savings Account">Savings</option>
                        <option value="Money Market Account">Money Market Account</option>
                        <option value="Certificates of Deposit">Certificates of Deposit</option>
                        <option value="Retirement Accounts">Retirement Accounts</option>
                    </Input>
                </div>
                <Button onClick={submit}>Submit</Button>
            </form>
        </div>
    );
}