import Input from "../components/Input";
import CommonSvgIcon from "../components/CommonIcon";
import { useEffect, useState } from "react";
import { GET } from "../api/API.js"
import { useNavigate } from "react-router-dom";
import CostumerNavBar from "../components/CostumerNavBar.jsx";

export default function CostumerFeed() {

    const navigate = useNavigate();
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
    
    const inspectProduct = (productId) => {
        navigate(`/costumer-product-inspect/${productId}`);
    };

    return (
        <div className="w-screen h-screen">
            <CostumerNavBar></CostumerNavBar>
            <div className="sm:px-16 px-3 space-y-10 sm:py-6 h-full w-full">
                <div className="h-full">
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
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                            {
                                products?.map(prod => 
                                    <button 
                                        key={prod.id} 
                                        className="hover:scale-101 hover:border border-orange-500 transition duration-300 cursor-pointer p-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.25)] rounded"
                                        onClick={() => (inspectProduct(prod.id))}
                                    >
                                        <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded" src={`http://localhost:8080/api/public/product-image/${prod.thumbNailUrl}`} alt="" />
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-start truncate">{prod.productName}</p>
                                                <p className="text-start text-red-600">${prod.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                                                <p className="text-xs">{prod.ratings.rating} rating {prod.ratings.numberOfRaters} reviews</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}