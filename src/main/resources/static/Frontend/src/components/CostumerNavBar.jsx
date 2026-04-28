import CommonSvgIcon from "./CommonIcon";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { useEffect, useState } from "react";
import { GET } from "../api/API";
import LogoutOrSignupPopup from "./LogouOrSIgnupPopup";

export default function CostumerNavBar({ cartItemsCount }) {

    const [loginPopup, setLoginPopup] = useState(false);

    const navigate = useNavigate();

    const home = () => {
        navigate("/costumer-feed");
    }

    const close = () => {
        setLoginPopup(false);
    };

    const open = () => {
        setLoginPopup(true);
    };

    return (
        <div className="top-0 sticky p-3 space-y-3 z-50 bg-orange-500 left-0 w-full">
            {loginPopup && <LogoutOrSignupPopup onClick={close}></LogoutOrSignupPopup>}
            <div className="flex w-full justify-between items-center gap-3">
                <button 
                    className="text-blue-400 text-2xl font-bold tracking-wide cursor-pointer hover:text-blue-300 transition"
                    onClick={home}
                >
                    ShopEase
                </button>
                <div className="w-full hidden sm:block">
                    <Input placeholder={"search some products"} fullWidth={true} type={"search"}></Input>
                </div>
                <div className="flex gap-1.5">
                    <button 
                        className="relative"
                        onClick={() => (navigate("/costumer-cart"))}
                    >
                        <div className={`h-6 w-6 ${cartItemsCount === 0 ? "opacity-0" : "opacity-100"} bg-emerald-500 absolute right-0 rounded-[50%]`}>
                            {cartItemsCount === 0 ? "" : cartItemsCount}
                        </div>
                        <CommonSvgIcon width="22" height="22" classList={"flex justify-center items-center px-3 py-1.5 text-black gap-1.5 hover:border-b-2 hover:border-white"} type={"addtocart"}></CommonSvgIcon>
                    </button>
                    <CommonSvgIcon type={"search"} classList={"w-[24px] h-[24px] mr-3.5 block sm:hidden"}></CommonSvgIcon>
                    <button className="flex items-center gap-1.5 rounded hover:bg-blue-100 sm:px-3 sm:py-1.5">
                        <CommonSvgIcon type={"home"}></CommonSvgIcon>
                        <span className="sm:inline hidden">home</span>
                    </button>
                    <button 
                        className="rounded-[50%] hover:bg-blue-100 sm:p-1.5"
                        onClick={open}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}