import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function SellerProducts () {

    return (
        <div className="bg-blue-100 grid grid-cols-[270px_1fr] h-screen">
            <Sidebar />
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
                            <Input variant={"default"} placeholder={"Search some products"} fullWidth={true}></Input>
                            <Button>Search</Button>
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