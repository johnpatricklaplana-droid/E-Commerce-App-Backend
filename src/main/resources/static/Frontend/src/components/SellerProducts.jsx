export default function SellerProducts () {
    return (
        <div className="bg-blue-100 flex h-screen">
            <aside id="sideBar" className="bg-slate-950 h-full flex w-72 p-3 flex-col items-center gap-1.5">
                <div className="flex flex-col gap-3 items-center">
                    <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/50/50" alt="" />
                        <h1 className="text-white font-semibold text-base">Johny hey daddy</h1>
                        <p className="text-xs uppercase text-slate-400">Seller</p>
                </div>

                <div className="border-t w-full border-slate-700 pt-5">
                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">MAIN NAVIGATION</p>
                    <nav className="space-y-2 p-4 overflow-auto h-100">
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                            </svg>
                            Dashboard
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.6 7 12 10.8 5.4 7 12 4.2zM5 8.7l6 3.4v7.7l-6-3.3V8.7zm8 11.1v-7.7l6-3.4v7.8l-6 3.3z" />
                            </svg>
                            Orders
                        </a>
                        <a className="flex text-slate-300 scale-105 bg-slate-800 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                                <path d="M3 7L12 11L21 7" stroke="currentColor" stroke-width="2" />
                                <line x1="12" y1="11" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
                            </svg>
                            Products
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 hover:scale-105 duration-300 items-center gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <rect x="4" y="14" width="3" height="6" />
                                <rect x="10" y="10" width="3" height="10" />
                                <rect x="16" y="6" width="3" height="14" />
                            </svg>
                            Analytics
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 hover:scale-105 gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 5H20V15H7L4 18V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                            Messages
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 gap-3 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 17L6 21L8 14L3 9L10 9L12 3L14 9L21 9L16 14L18 21L12 17Z" stroke="currentColor" stroke-width="2"
                                    stroke-linejoin="round" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 gap-3 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" />
                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center duration-300 hover:scale-105 gap-3 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5A3.5 3.5 0 1 0 12 15.5Z" stroke="currentColor" stroke-width="2" />

                                <path
                                    d="M19.4 15A7.9 7.9 0 0 0 20 12A7.9 7.9 0 0 0 19.4 9L21 7.5L19 4.5L17 5.3A8 8 0 0 0 15 4.6L14.5 2H9.5L9 4.6A8 8 0 0 0 7 5.3L5 4.5L3 7.5L4.6 9A7.9 7.9 0 0 0 4 12A7.9 7.9 0 0 0 4.6 15L3 16.5L5 19.5L7 18.7A8 8 0 0 0 9 19.4L9.5 22H14.5L15 19.4A8 8 0 0 0 17 18.7L19 19.5L21 16.5L19.4 15Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                            TODO
                        </a>
                        <a className="flex text-slate-300 items-center gap-3 duration-300 hover:scale-105 hover:bg-slate-800 px-4 py-3 text-sm font-medium transition rounded-2xl" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M4 12A8 8 0 0 1 20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <rect x="4" y="12" width="3" height="6" rx="1.5" stroke="currentColor" stroke-width="2" />
                                <rect x="17" y="12" width="3" height="6" rx="1.5" stroke="currentColor" stroke-width="2" />
                                <path d="M12 20C13.5 20 14.5 19 14.5 17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            TODO
                        </a>
                    </nav>
                </div>
            </aside>
            <div className="h-full overflow-auto w-full">
                <div className="flex p-4 bg-white z-50 sticky top-0 items-center justify-between w-full">
                    <h1 className="text-2xl font-semibold font-sans">Manage Products</h1>
                    <a href="" className="bg-slate-900 cursor-pointer transition-transform duration-500 hover:-translate-y-1.5 hover:bg-slate-700 font-sans text-slate-300 flex py-1.5 px-3 rounded-[10px]">
                        <svg className="h-6 w-6 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        Add New Product
                    </a>
                </div>
                <div className="p-7 flex flex-col gap-10">
                    <div className="flex gap-4">
                        <div className="w-60 border-2 bg-white rounded-2xl shadow-2xl p-4 border-slate-800">
                            <div className="flex items-center gap-1.5">
                                <svg className="h-6 w-6 flex-none mb-2 text-slate-800" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M6 6H21L20 14H7L6 6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                                    <path d="M6 6L5 3H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                                    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                                </svg>
                                <p className="font-semibold">Active Products</p>
                            </div>
                            <p className="font-bold text-2xl">100</p>
                        </div>
                        <div className="w-60 border-2 bg-white rounded-2xl shadow-2xl p-4 border-slate-800">
                            <div className="flex items-center gap-1.5">
                                <svg className="h-6 w-6 flex-none text-slate-800" viewBox="0 0 24 24" fill="none" aria-hidden="true">

                                    <path d="M4 7L12 3L20 7V17L12 21L4 17V7Z" stroke="currentColor" stroke-width="2"
                                        stroke-linejoin="round" />

                                    <path d="M8 9L16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M16 9L8 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <p className="font-semibold">Out of Stock</p>
                            </div>
                            <p className="font-bold text-2xl">8</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-sans font-semibold">Product List</h1>
                            <div>
                                <select className="outline-0 border-2 px-3 py-1 rounded border-slate-300 bg-white">
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                </select>
                                <select className="outline-0 border-2 px-3 py-1 rounded border-slate-300 bg-white">
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                    <option value="TODO">TODO</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex mt-2.5">
                            <input className="w-full px-3 py-1.5 outline-none bg-white rounded flex-1" type="search" placeholder="search some product" />
                                <button className="px-3 py-1.5 bg-slate-800 text-white font-bold">Search</button>
                        </div>
                        <div className="grid grid-cols-3 mt-10 gap-4">
                            <div className="bg-red-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-orange-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-blue-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-green-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-pink-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                            <div className="bg-yellow-600 rounded-2xl h-[350px] transition duration-500 hover:scale-105 shadow-2xl">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}