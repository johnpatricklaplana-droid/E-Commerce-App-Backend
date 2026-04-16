import Input from "../components/Input";
import CommonSvgIcon from "../components/CommonIcon";
import { useEffect, useState } from "react";
import { GET } from "../api/API.js"

export default function CostumerFeed() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const url = "http://localhost:8080/api/public/costumer/product"
            const result = await GET(url);
            setProducts(prev => [...prev, ...result])
            console.log(result);
        }
        getProducts();
    }, []);   

    return (
        <div className="w-screen h-screen">
            <div className="sm:px-16 px-3 space-y-10 sm:py-6 h-full w-full">
                <div className="flex w-full justify-between items-center gap-3 py-1.5">
                    <h1 className="text-blue-400 text-2xl font-bold tracking-wide cursor-pointer hover:text-blue-300 transition">
                        ShopEase
                    </h1>
                    <div className="w-full hidden sm:block">
                        <Input placeholder={"search some products"} fullWidth={true} type={"search"}></Input>
                    </div>
                    <div className="flex gap-1.5">
                        <CommonSvgIcon type={"search"} classList={"w-[24px] h-[24px] mr-3.5 block sm:hidden"}></CommonSvgIcon>
                        <button className="flex items-center gap-1.5 rounded hover:bg-blue-100 sm:px-3 sm:py-1.5">
                            <CommonSvgIcon type={"home"}></CommonSvgIcon>
                            <span className="sm:inline hidden">home</span>
                        </button>
                        <button className="rounded-[50%] hover:bg-blue-100 sm:p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="8" r="4" />

                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="h-full">
                    <nav className="sm:flex hidden justify-start items-center">
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 border-b-2 border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            Home
                        </button>
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            TODO
                        </button>
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            TODO
                        </button>
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            TODO
                        </button>
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            TODO
                        </button>
                        <button className="flex justify-center items-center px-3 py-1.5 gap-1.5 hover:border-b-2 hover:border-amber-400">
                            <CommonSvgIcon type={"home"} width="32" height="32" fill={"orange"}></CommonSvgIcon>
                            TODO
                        </button>
                    </nav>
                    <div className="grid sm:w-[60%] sm:mt-10 w-full grid-cols-2 sm:grid-cols-4 gap-1.5">
                        <div className="bg-orange-400/30 flex items-center p-1.5 gap-1.5 rounded-2xl">
                            <img className="object-cover w-[50px] h-[50px] rounded-2xl" src="https://picsum.photos/200/300?random=1" alt="" />
                            <p>jonas sam</p>
                        </div>
                        <div className="bg-green-400/30 flex items-center p-1.5 gap-1.5 rounded-2xl">
                            <img className="object-cover w-[50px] h-[50px] rounded-2xl" src="https://picsum.photos/200/300?random=22" alt="" />
                            <p>jonas sam</p>
                        </div>
                        <div className="bg-violet-400/30 flex items-center p-1.5 gap-1.5 rounded-2xl">
                            <img className="object-cover w-[50px] h-[50px] rounded-2xl" src="https://picsum.photos/200/300?random=21" alt="" />
                            <p>jonas sam</p>
                        </div>
                        <div className="bg-pink-400/30 flex items-center p-1.5 gap-1.5 rounded-2xl">
                            <img className="object-cover w-[50px] h-[50px] rounded-2xl" src="https://picsum.photos/200/300?random=20" alt="" />
                            <p>jonas sam</p>
                        </div>
                    </div>
                    <div className="py-6 space-y-6">
                        <h1 className="sm:text-3xl text-lg font-sans">GOAT</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {
                                products?.map(prod => 
                                    <div key={prod.id} className="sm:space-y-6 space-y-1.5 hover:scale-105 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow-[0_3px_10px_rgba(0,0,0,0.25)] rounded-2xl">
                                        <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" src={`http://localhost:8080/api/public/product-image/${prod.thumbNailUrl}`} alt="" />
                                        <div className="space-y-3">
                                            <div>
                                                <p className="font-bold sm:text-2xl">{prod.productName}</p>
                                                <p className="font-bold text-red-600 sm:text-2xl">${prod.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                                                <p className="text-xs">{prod.ratings.rating} rating {prod.ratings.numberOfRaters} reviews</p>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <button className="font-bold text-xs sm:text-lg w-full hover:bg-amber-200 cursor-pointer hover:scale-105 transition duration-500 bg-amber-300 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-2xl">Add to cart</button>
                                                <button className="hover:scale-105 transition duration-500 cursor-pointer">
                                                    <CommonSvgIcon type={"heart"} color={"gray"} width="36" height="36"></CommonSvgIcon>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}