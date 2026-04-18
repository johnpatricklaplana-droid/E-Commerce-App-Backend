import { useEffect, useRef, useState } from "react";
import AddToCartBox from "../components/AddToCartBox";
import CommonSvgIcon from "../components/CommonIcon";
import Text from "../components/Text";
import { GET } from "../api/API";
import { toCategories, toProduct, toProductVariations } from "../hooks/mappers";

export default function CostumerProductInspect () {

    const productId = 36;

    const [product, setProduct] = useState({});
    const [productVariations, setProductVariations] = useState([]);
    const [categories, setCategories] = useState([]);
    const containerRef = useRef(null);
    const itemsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        const getProduct = async () => {
            const url = `http://localhost:8080/api/public/product/${productId}`;
            const result = await GET(url);
            console.log(result);

            setProduct(toProduct(result));

            setProductVariations(toProductVariations(result));

            setCategories(toCategories(result));

        };

        getProduct();

    }, [productId]);

    useEffect(() => {
        
        const observer = new IntersectionObserver(
            (entries) => {

                let mostVisibleIndex = 0;
                let highestIntersectionRation = 0;

                entries.forEach(el => {
                    if(el.intersectionRatio > highestIntersectionRation) {
                        mostVisibleIndex = itemsRef.current.indexOf(el.target);
                        highestIntersectionRation = el.intersectionRatio;
                    }
                });

                setActiveIndex(mostVisibleIndex);

            },
            {
                root: containerRef.current,
                threshold: [0.5, 0.7, 0.9]
            }
        );

        itemsRef.current.forEach(el => {
            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        }

    }, [productVariations]);

    const closeOpen = () => {
        setIsOpen(false);
    };

    const open = () => {
        setIsOpen(true);
    };

    

    return (
        <div className={`min-h-screen w-screen flex flex-col gap-6`}>
            {isOpen && <AddToCartBox closeOpen={closeOpen}></AddToCartBox>}
            <div 
                className="h-96 w-full flex overflow-x-auto"
                ref={containerRef}
            >
                {productVariations.map((vary, i) => 
                    <img
                        ref={(el) => itemsRef.current[i] = el}
                        className="w-full object-contain shrink-0 aspect-auto h-full"
                        src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                    >

                    </img>
                )}
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
                {productVariations.map((vary, i) => 
                    i === activeIndex 
                        ? <div>                                                        
                            <p className="text-[22px] leading-tight line-clamp-2 font-semibold">{vary.variationName}</p>
                            <p className="text-[22px] font-bold text-red-500">${vary.price.toLocaleString()}</p>
                        </div>
                        : ""
                )}
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
            <Text variant={"label"} classList={"p-3"}>Description</Text>
            {<p className="p-3">{product.productDescription}</p>}

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
                    <p>Your name is the highest |</p>
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
                <button className="py-3 px-5 font-bold bg-slate-200">web socket</button>
                <button onClick={open} className="py-3 px-5 font-bold  bg-emerald-500 text-white">Add to cart</button>
                <button className="py-3 px-5 bg-orange-500 text-white font-bold">Buy now</button>
            </div>
        </div>
    );
}