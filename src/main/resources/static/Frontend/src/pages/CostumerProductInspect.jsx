import { useEffect, useRef, useState } from "react";
import AddToCartBox from "../components/AddToCartBox";
import CommonSvgIcon from "../components/CommonIcon";
import Text from "../components/Text";
import { GET } from "../api/API";
import { toCategories, toProduct, toProductVariations } from "../hooks/ProductMapper";
import { toSeller, toSellerLocation } from "../hooks/SellerMappers";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useParams } from "react-router-dom";

export default function CostumerProductInspect () {

    const { productId } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [productVariations, setProductVariations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [seller, setSeller] = useState({});
    const [sellerLocation, setSellerLocation] = useState([]);
    const [currentVariation, setCurrentVariation] = useState({});

    useEffect(() => {
        
        const getProduct = async () => {
            const url = `http://localhost:8080/api/public/product/${productId}`;
            const result = await GET(url);

            setProduct(toProduct(result));

            const tempVariation = toProductVariations(result);

            setProductVariations(tempVariation);
            setCurrentVariation(tempVariation[0]);

            setCategories(toCategories(result));

            const url2 = `http://localhost:8080/api/public/seller/${productId}`;
            const result2 = await GET(url2);
        
            setSeller(toSeller(result2));

            setSellerLocation(toSellerLocation(result2));

        };

        getProduct();

    }, [productId]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => prev(),
        trackMouse: true
    });

    const closeOpen = () => {
        setIsOpen(false);
    };

    const open = () => {
        setIsOpen(true);
    };

    const next = () => {
        let currentIndex = currentVariation.index;

        if(currentIndex + 1 > productVariations.length-1) {
            const newActiveVariation = productVariations.find(vary => vary.index === 0);
            setCurrentVariation(newActiveVariation);
        } else {
            const newActiveVariation = productVariations.find(vary => vary.index === currentIndex + 1);
            setCurrentVariation(newActiveVariation);
        }
    };

    const prev = () => {
        let currentIndex = currentVariation.index;

        if (currentIndex - 1 < 0) {
            const newActiveVariation = productVariations.find(vary => vary.index === productVariations.length - 1);
            setCurrentVariation(newActiveVariation);
        } else {
            const newActiveVariation = productVariations.find(vary => vary.index === currentIndex - 1);
            setCurrentVariation(newActiveVariation);
        }
    };

    console.log(productVariations);
    console.log(sellerLocation)

    return (
        <div className={`min-h-screen w-screen flex flex-col p-1.5 pb-24 gap-6`}>
            <button onClick={() => navigate(-1)} className="text-3xl z-50 fixed left-3 top-3">⬅️</button>
            <button className="text-3xl z-50 fixed right-3 top-3">🛒</button>
            {isOpen && <AddToCartBox variations={productVariations} closeOpen={closeOpen}></AddToCartBox>}
            <div 
                className="h-96 w-full flex overflow-x-hidden"
                {...swipeHandlers}
            >
                <div 
                    className={`flex transition-transform duration-200`}
                    style={{transform: `translateX(-${currentVariation?.index * 100}%)`}}
                >
                    {productVariations.map((vary, i) => 
                        <img
                            className="w-full object-contain shrink-0 aspect-auto h-full"
                            src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                        >
    
                        </img>
                    )}
                </div>
            </div>
            <div className=" overflow-x-auto gap-1.5 p-1.5 flex h-[100px] w-full">
                {productVariations.map(vary => 
                    <img
                        className="rounded-2xl shadow object-contain aspect-square h-full"
                        src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                    >
    
                    </img>
                )}
            </div>
            <div className="border-b p-3">
                <div>                                                        
                    <p className="text-[22px] leading-tight line-clamp-2 font-semibold">{currentVariation.variationName}</p>
                    <p className="text-[22px] font-bold text-red-500">${currentVariation?.price?.toLocaleString()}</p>
                </div>
            </div>
            <p className="text-gray-400 flex items-center pl-3 gap-1.5 mt-1.5">
                <CommonSvgIcon type={"star"} classList={"w-[32px] h-[32px]"}></CommonSvgIcon>
                4.7 ratings not bad
            </p>
            <div className="flex flex-wrap min-w-0 w-full gap-1.5 p-3">
                {
                    categories.map(cat => 
                        <div className="rounded-2xl p-3 bg-pink-100">
                            <p>{cat.categoryName}</p>
                        </div>
                    )
                }
            </div>
            <div className="p-3 space-y-1.5">
                <Text variant={"label"}>Location</Text>
                <p 
                    className="flex text-gray-400 items-center"
                >
                    <CommonSvgIcon 
                        height="34" 
                        width="34" 
                        type={"location"}
                    >

                    </CommonSvgIcon>
                    {sellerLocation[0]?.city + ", " + sellerLocation[0]?.province + ", " + sellerLocation[0]?.country + ", " + sellerLocation[0]?.street}
                </p>
            </div>
            <div className="p-3 space-y-1.5">
                <Text variant={"label"}>Description</Text>
                {<p className="text-gray-400">{product.productDescription}</p>}
            </div>

            <Text variant={"label"} classList={"p-3"}>Costumer reviews</Text>
            <div 
                className="space-y-3 px-3"
            >
                <div className="flex gap-1.5 items-center">
                    <img
                        className="rounded-[50%] w-8 h-8"
                        src=" https://picsum.photos/200/300?random=2"
                    >

                    </img>
                    <p>Your name</p>
                </div>
                <div>
                    <p className="text-gray-400">variation: 1 Pc chicken joy</p>
                    <p className="text-gray-400">comment: <span className="text-black">not bad pwede na</span></p>
                </div>
                <div className="flex gap-1.5 overflow-x-auto">
                    <img 
                        src="https://picsum.photos/200/300?random=2" 
                        alt="" 
                        className="h-32 shrink-0 w-32 rounded-2xl"
                    />
                    <img 
                        src="https://picsum.photos/200/300?random=1" 
                        alt="" 
                        className="h-32 shrink-0 w-32 rounded-2xl"
                    />
                    <img 
                        src="https://picsum.photos/200/300?random=3" 
                        alt="" 
                        className="h-32 shrink-0 w-32 rounded-2xl"
                    />
                    <img 
                        src="https://picsum.photos/200/300?random=4" 
                        alt="" 
                        className="h-32 shrink-0 w-32 rounded-2xl"
                    />
                    <img 
                        src="https://picsum.photos/200/300?random=5" 
                        alt="" 
                        className="h-32 shrink-0 w-32 rounded-2xl"
                    />
                </div>
            </div>
                    
            <div className="flex gap-1.5 p-3">
                <div className="flex gap-1.5 items-center">
                    <img
                        className="rounded-[50%] w-16 h-16"
                        src=" https://picsum.photos/200/300?random=20"
                    >

                    </img>
                    <p>{seller.firstName + " " + seller.lastName}</p>
                </div>
                <p className="flex items-center gap-1.5">
                    <CommonSvgIcon type={"star"} classList={"w-[20px] h-[20px]"}></CommonSvgIcon> 
                    4.7
                </p>
            </div>

            <Text variant={"label"} classList={"p-3"}>Related pitch</Text>

            <div className="grid grid-cols-2 gap-1.5">
                <div className="sm:space-y-6 space-y-1.5 hover:scale-105 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow rounded-2xl">
                    <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" src="https://picsum.photos/200/300?random=1" alt="" />
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold sm:text-2xl">prod.productName</p>
                            <p className="font-bold text-red-600 sm:text-2xl">$100,000</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                            <p className="text-xs">2.3 rating 100,000 reviews</p>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="font-bold text-xs sm:text-lg w-full hover:bg-amber-200 cursor-pointer hover:scale-105 transition duration-500 bg-amber-300 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-2xl">Add to cart</button>
                            <button className="hover:scale-105 transition duration-500 cursor-pointer">
                                <CommonSvgIcon type={"heart"} color={"gray"} width="36" height="36"></CommonSvgIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:space-y-6 space-y-1.5 hover:scale-105 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow rounded-2xl">
                    <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" src="https://picsum.photos/200/300?random=1" alt="" />
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold sm:text-2xl">prod.productName</p>
                            <p className="font-bold text-red-600 sm:text-2xl">$100,000</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                            <p className="text-xs">2.3 rating 100,000 reviews</p>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="font-bold text-xs sm:text-lg w-full hover:bg-amber-200 cursor-pointer hover:scale-105 transition duration-500 bg-amber-300 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-2xl">Add to cart</button>
                            <button className="hover:scale-105 transition duration-500 cursor-pointer">
                                <CommonSvgIcon type={"heart"} color={"gray"} width="36" height="36"></CommonSvgIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:space-y-6 space-y-1.5 hover:scale-105 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow rounded-2xl">
                    <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" src="https://picsum.photos/200/300?random=1" alt="" />
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold sm:text-2xl">prod.productName</p>
                            <p className="font-bold text-red-600 sm:text-2xl">$100,000</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                            <p className="text-xs">2.3 rating 100,000 reviews</p>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="font-bold text-xs sm:text-lg w-full hover:bg-amber-200 cursor-pointer hover:scale-105 transition duration-500 bg-amber-300 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-2xl">Add to cart</button>
                            <button className="hover:scale-105 transition duration-500 cursor-pointer">
                                <CommonSvgIcon type={"heart"} color={"gray"} width="36" height="36"></CommonSvgIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:space-y-6 space-y-1.5 hover:scale-105 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow rounded-2xl">
                    <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" src="https://picsum.photos/200/300?random=1" alt="" />
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold sm:text-2xl">prod.productName</p>
                            <p className="font-bold text-red-600 sm:text-2xl">$100,000</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                            <p className="text-xs">2.3 rating 100,000 reviews</p>
                        </div>
                        <div className="flex gap-1.5">
                            <button className="font-bold text-xs sm:text-lg w-full hover:bg-amber-200 cursor-pointer hover:scale-105 transition duration-500 bg-amber-300 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-2xl">Add to cart</button>
                            <button className="hover:scale-105 transition duration-500 cursor-pointer">
                                <CommonSvgIcon type={"heart"} color={"gray"} width="36" height="36"></CommonSvgIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed grid grid-cols-[1fr_1fr_50%] left-0 right-0 justify-end w-full bottom-0">
                <button className="py-3 px-5 text-4xl font-bold bg-blue-400">💬</button>
                <button onClick={open} className="py-3 px-5 font-bold  bg-emerald-500 text-white">Add to cart</button>
                <button className="py-3 px-5 bg-orange-500 text-white font-bold">Buy now</button>
            </div>
        </div>
    );
}