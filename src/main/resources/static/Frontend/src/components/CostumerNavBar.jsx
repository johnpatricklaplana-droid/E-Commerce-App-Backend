import CommonSvgIcon from "./CommonIcon";
import { useNavigate } from "react-router-dom";

export default function CostumerNavBar() {

    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 hidden sm:flex z-40 bg-orange-500 left-0 justify-center">
            <button onClick={() => navigate(-1)} className="text-3xl cursor-pointer z-50 absolute left-2 -translate-y-1/2 top-[50%]">⬅️</button>
            <button className="flex justify-center text-white/80 items-center px-3 py-1.5 gap-1.5 border-b-2 border-white">
                <CommonSvgIcon type={"home"} width="32" height="32" fill={"currentColor"}></CommonSvgIcon>
                Home
            </button>
            <CommonSvgIcon classList={"flex justify-center items-center px-3 py-1.5 text-white/80 gap-1.5 hover:border-b-2 hover:border-white"} type={"addtocart"}></CommonSvgIcon>
            <button className="flex justify-center items-center px-3 text-white/80 py-1.5 gap-1.5 hover:border-b-2 hover:border-white">
                <CommonSvgIcon type={"home"} width="32" height="32" fill={"currentColor"}></CommonSvgIcon>
                TODO
            </button>
            <button className="flex justify-center items-center px-3 text-white/80 py-1.5 gap-1.5 hover:border-b-2 hover:border-white">
                <CommonSvgIcon type={"home"} width="32" height="32" fill={"currentColor"}></CommonSvgIcon>
                TODO
            </button>
            <button className="flex justify-center items-center text-white/80 px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-white">
                <CommonSvgIcon type={"home"} width="32" height="32" fill={"currentColor"}></CommonSvgIcon>
                TODO
            </button>
            <button className="flex justify-center items-center px-3 py-1.5 text-white/80 gap-1.5 hover:border-b-2 hover:border-white">
                <CommonSvgIcon type={"home"} width="32" height="32" fill={"currentColor"}></CommonSvgIcon>
                TODO
            </button>
        </nav>
    );
}