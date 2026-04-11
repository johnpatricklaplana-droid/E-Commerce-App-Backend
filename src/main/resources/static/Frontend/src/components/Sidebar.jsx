import { useState } from "react";
import CommonSvgIcon from "./CommonIcon";

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(true);

    const closeOpen = () => {
        setIsOpen(prev => prev ? false : true);
    };

    return (
        <div>
            <div className={`absolute transition-all duration-500 bg-slate-950 h-screen left-0 top-0 w-[50px] ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute z-50 top-3 right-3">
                    <CommonSvgIcon action={closeOpen} hover={"grow"} type={"menu"} color={"white"}></CommonSvgIcon>
                </div>
            </div>
            <aside className={`${isOpen ? 'opacity-100 w-[270px] translate-x-0' : '-traslate-x-full w-0 opacity-0 pointer-events-none'} transition-all duration-500 bg-slate-950 h-screen p-3 flex flex-col items-center gap-1.5`}>
                <div className="flex flex-col gap-3 items-center">
                    <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/50/50" alt="" />
                    <h1 className="text-white font-semibold text-base">Johny hey daddy</h1>
                    <p className="text-xs uppercase text-slate-400">Seller</p>
                </div>
                <div className="absolute z-50 top-3 right-3">
                    <CommonSvgIcon action={closeOpen} hover={"grow"} type={"menu"} color={"white"}></CommonSvgIcon>
                </div>
                <div className="border-t w-full border-slate-700 pt-5">
                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">MAIN NAVIGATION</p>
                    <nav className="space-y-2 p-4 overflow-auto h-100">
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="/seller-dashboard">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                            </svg>
                            Dashboard
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="/seller-orders">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <path
                                    d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.6 7 12 10.8 5.4 7 12 4.2zM5 8.7l6 3.4v7.7l-6-3.3V8.7zm8 11.1v-7.7l6-3.4v7.8l-6 3.3z" />
                            </svg>
                            Orders
                        </a>
                        <a className="flex text-slate-300 scale-105 bg-slate-800 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="/seller-products">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" stroke="currentColor" strokeWidth="2"
                                    strokeLinejoin="round" />
                                <path d="M3 7L12 11L21 7" stroke="currentColor" strokeWidth="2" />
                                <line x1="12" y1="11" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Products
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor"
                                aria-hidden="true">
                                <rect x="4" y="14" width="3" height="6" />
                                <rect x="10" y="10" width="3" height="10" />
                                <rect x="16" y="6" width="3" height="14" />
                            </svg>
                            Analytics
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 hover:scale-105 gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 5H20V15H7L4 18V5Z" stroke="currentColor" strokeWidth="2" stroke-linejoin="round" />
                            </svg>
                            Messages
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 gap-3 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 17L6 21L8 14L3 9L10 9L12 3L14 9L21 9L16 14L18 21L12 17Z" stroke="currentColor"
                                    strokeWidth="2" stroke-linejoin="round" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 gap-3 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 hover:scale-105 gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5A3.5 3.5 0 1 0 12 15.5Z" stroke="currentColor"
                                    strokeWidth="2" />

                                <path
                                    d="M19.4 15A7.9 7.9 0 0 0 20 12A7.9 7.9 0 0 0 19.4 9L21 7.5L19 4.5L17 5.3A8 8 0 0 0 15 4.6L14.5 2H9.5L9 4.6A8 8 0 0 0 7 5.3L5 4.5L3 7.5L4.6 9A7.9 7.9 0 0 0 4 12A7.9 7.9 0 0 0 4.6 15L3 16.5L5 19.5L7 18.7A8 8 0 0 0 9 19.4L9.5 22H14.5L15 19.4A8 8 0 0 0 17 18.7L19 19.5L21 16.5L19.4 15Z"
                                    stroke="currentColor" strokeWidth="1.5" stroke-linejoin="round" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center gap-3 duration-300 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl"
                            href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 12A8 8 0 0 1 20 12" stroke="currentColor" strokeWidth="2" stroke-linecap="round" />
                                <rect x="4" y="12" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
                                <rect x="17" y="12" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 20C13.5 20 14.5 19 14.5 17.5" stroke="currentColor" strokeWidth="2"
                                    stroke-linecap="round" />
                            </svg>
                            TODO
                        </a>
                    </nav>
                </div>
            </aside>
        </div>
    );
}