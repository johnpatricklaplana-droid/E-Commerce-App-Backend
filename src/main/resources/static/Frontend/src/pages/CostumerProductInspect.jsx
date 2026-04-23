import { useEffect, useState } from "react";
import AddToCartBox from "../components/AddToCartBox";
import CommonSvgIcon from "../components/CommonIcon";
import Text from "../components/Text";
import { GET, POST } from "../api/API";
import { toCategories, toProduct, toProductVariations } from "../hooks/ProductMapper";
import { toSeller, toSellerLocation } from "../hooks/SellerMappers";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useParams } from "react-router-dom";
import CostumerNavBar from "../components/CostumerNavBar";
import Button from "../components/Button";

export default function CostumerProductInspect () {

    const { productId } = useParams();

    const navigate = useNavigate();

    const [loading, setloading] = useState(true);
    const [product, setProduct] = useState({});
    const [productVariations, setProductVariations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [seller, setSeller] = useState({});
    const [sellerLocation, setSellerLocation] = useState([]);
    const [currentVariation, setCurrentVariation] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentVariationNearAddToCart, setCurrentVariationNearAddToCart] = useState({});

    useEffect(() => {
        
        const getProduct = async () => {
            const url = `http://localhost:8080/api/public/product/${productId}`;
            const result = await GET(url);

            setProduct(toProduct(result));

            const tempVariation = toProductVariations(result);

            setProductVariations(tempVariation);
            setCurrentVariation(tempVariation[0]);
            setCurrentVariationNearAddToCart(tempVariation[0]);

            const cats = toCategories(result);

            setCategories(cats);

            const url2 = `http://localhost:8080/api/public/seller/${productId}`;
            const result2 = await GET(url2);
        
            setSeller(toSeller(result2));

            setSellerLocation(toSellerLocation(result2));

            const url3 = `http://localhost:8080/api/public/product/${productId}`;
            const caty = cats.map(cat => 
                cat.categoryName
            );

            const body = {
                categories: caty
            }

            const fetchRelatedProducts = await POST(url3, body);
            setRelatedProducts(fetchRelatedProducts);
            console.log(fetchRelatedProducts);
            setloading(false);
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

    const changeProduct = (prodId) => {
        setloading(true);
        navigate(`/costumer-product-inspect/${prodId}`)
        window.scrollTo({top: 0, behavior: "auto"});
    }

    if(loading) {
        return (
            <div className="flex items-center flex-col justify-center h-screen w-screen">
                <h1 className="text-2xl">Loading please wait</h1>
                <p>TODO: create skeleton loading screen</p>
            </div>
        );
    }

    const changeCurrentVariationNearAddToCart = (variantId) => {
        const newCurrentVariantNearAddToCart = productVariations.find(prod => prod.variantId === variantId);

        setCurrentVariationNearAddToCart(newCurrentVariantNearAddToCart);
    };

    console.log(currentVariationNearAddToCart);

    return (
        <div className={`min-h-screen w-screen flex flex-col p-1.5 sm:pb-1.5 pb-24 gap-6`}>
            <CostumerNavBar></CostumerNavBar>
            {isOpen && <AddToCartBox variations={productVariations} closeOpen={closeOpen}></AddToCartBox>}
            <div className="sm:grid sm:grid-cols-2 w-full sm:gap-3">
                <div>
                    <div
                        className="h-96 w-full flex overflow-x-hidden"
                        {...swipeHandlers}
                    >
                        <div
                            className={`flex transition-transform duration-200`}
                            style={{ transform: `translateX(-${currentVariation?.index * 100}%)` }}
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
                    <div className=" overflow-x-auto sm:max-w-[80%] gap-1.5 p-1.5 flex h-[100px] w-full">
                        {productVariations.map(vary =>
                            <img
                                className="rounded-2xl shadow object-contain aspect-square h-full"
                                src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                            >

                            </img>
                        )}
                    </div>
                </div>
                <div className="relative space-y-3 p-1.5 sm:block hidden">
                    <div className="flex gap-1.5">
                        <img
                            className="aspect-square max-w-[122px]"
                            src={`http://localhost:8080/api/public/product-image/${currentVariationNearAddToCart.image}`}
                            alt=""
                        />
                        <div>
                            <p>{currentVariationNearAddToCart.variationName}</p>
                            <p className="text-2xl text-red-500 font-bold">${currentVariationNearAddToCart.price.toLocaleString()}</p>
                            <div className="flex gap-1.5 items-center">
                                <CommonSvgIcon classList={"w-6 h-6"} type={"star"}></CommonSvgIcon>
                                <p className="text-sm text-gray-400">todo: ratings</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1.5 max-h-[250px] flex-wrap overflow-y-scroll">
                        {
                            productVariations.map((vary, i, self) => {

                            const isFirst = self.findIndex(selfy => selfy.variantId === vary.variantId) === i;

                            if(!isFirst) {
                                return undefined;
                            }

                            return <button
                                        className="flex gap-1.5 hover:bg-gray-500 active:scale-95 transition cursor-pointer items-center border border-gray-400 hover:scale-101"
                                        key={vary.variantId}
                                        onClick={() => (changeCurrentVariationNearAddToCart(vary.variantId))}
                                    >
                                        <img
                                            src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                                            alt=""
                                            className="max-w-16 max-h-16 min-w-16 min-h-16"
                                        />
                                        <div>
                                            <p className=" px-1.5 text-sm text-gray-700">{vary.variationName}</p>
                                            <p className=" px-1.5 text-sm text-red-500">${vary.price.toLocaleString()}</p>
                                        </div>
                                    </button>
                                }
                            )
                        }
                    </div>
                    <div className="absolute bottom-0 p-3 flex justify-start w-full">
                        <Button bg={"bg-emerald-500"} classList={"mr-3 hover:scale-105 transition active:scale-95 cursor-pointer"} variant="primary">Add to cart</Button>
                        <Button bg={"bg-orange-500"} classList={"hover:scale-105 transition active:scale-95 cursor-pointer"} variant="primary">Buy now</Button>
                    </div>
                </div>
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
                    
            <div className="flex gap-1.5 p-3 border border-gray-400">
                <div className="flex gap-1.5 items-center">
                    <img
                        className="rounded-[50%] w-16 h-16"
                        src=" https://picsum.photos/200/300?random=20"
                    >

                    </img>
                    <p className="font-bold text-2xl">{seller.firstName + " " + seller.lastName}</p>
                </div>
                <p className="flex items-center gap-1.5">
                    <CommonSvgIcon type={"star"} classList={"w-[20px] h-[20px]"}></CommonSvgIcon> 
                    4.7
                </p>
            </div>

            <Text variant={"label"} classList={"p-3"}>Related pitch</Text>

            <div className="grid sm:grid-cols-6 grid-cols-2 gap-3">
                {relatedProducts?.map(relProd => 
                    <button 
                        onClick={() => (changeProduct(relProd.id))}
                        className="sm:space-y-3 space-y-1.5 hover:scale-101 transition duration-300 cursor-pointer p-1.5 sm:p-3 shadow rounded-2xl"
                        key={relProd.id}
                    >
                        <img 
                            className="object-cover w-full h-[150px] sm:h-[200px]  rounded-2xl" 
                            src={`http://localhost:8080/api/public/product-image/${relProd.thumbNailUrl}`} alt="" />
                        <div className="space-y-3">
                            <div>
                                <p className="text-start text-gray-700 font-semibold">{relProd.productName}</p>
                                <p className="text-start font-bold text-red-600">${relProd.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                                <p className="text-xs">{relProd.ratings.rating} rating {relProd.ratings.numberOfRaters} reviews</p>
                            </div>
                        </div>
                    </button>
                )}
            </div>

            <div className="fixed grid grid-cols-[1fr_1fr_50%] sm:hidden left-0 right-0 justify-end w-full bottom-0">
                <button className="py-3 px-5 text-4xl font-bold bg-blue-400">💬</button>
                <button onClick={open} className="py-3 px-5 font-bold  bg-emerald-500 text-white">Add to cart</button>
                <button className="py-3 px-5 bg-orange-500 text-white font-bold">Buy now</button>
            </div>
        </div>
    );
}