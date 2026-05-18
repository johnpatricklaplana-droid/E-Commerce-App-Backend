import { useEffect, useState } from "react";
import AddToCartBox from "../components/AddToCartBox";
import CommonSvgIcon from "../components/CommonIcon";
import Text from "../components/Text";
import { GET, getCartItemsCount, POST } from "../api/API";
import { toCategories, toProduct, toProductVariations } from "../hooks/ProductMapper";
import { toSeller, toSellerLocation } from "../hooks/SellerMappers";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useParams } from "react-router-dom";
import CostumerNavBar from "../components/CostumerNavBar";
import Button from "../components/Button";
import CostumerLoginPopup from "../components/CostumerLoginPopup";
import SuccessOrFailureMessagePopup from "../components/SuccessOrFailureMessagePopup";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";
import ProductBoxInFeed from "../components/ProductBoxInFeed";

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
    const [quantity, setQuatity] = useState(1);
    const [openLoginPopup, setOpenLoginPopup] = useState(false);
    const [openSuccessOrFailureMessage, setOpenSuccessOrFailureMessage] = useState(false);
    const [changeCartItemCount, setChangeCartItemCount] = useState(0);
    const [addedToCartMessage, setAddedToCartMessage] = useState("");
    const [activeLittleImage, setActiveLittleImage] = useState();

    // TODO: cartItemsCount is partially backend-sourced and partially locally incremented.
    // Initial value is fetched from API (getCartItemsCount),
    // but after adding to cart, it is optimistically updated in the frontend using +1.
    // This can lead to desync if multiple tabs or failed requests occur.
    // Consider refactoring to a single source of truth (always refetch).
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        
        const getProduct = async () => {
            const url = `http://localhost:8080/api/public/product/${productId}`;
            const result = await GET(url);

            setProduct(toProduct(result));

            const tempVariation = toProductVariations(result);
           console.log(tempVariation);
            setProductVariations(tempVariation);
            setCurrentVariation(tempVariation[0]);
            setCurrentVariationNearAddToCart(tempVariation[0]);
            setActiveLittleImage(tempVariation[0].index);

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

    const addToCart = async () => {
    
        const result = await fetch(`http://localhost:8080/api/costumer/cart/${productId}/${currentVariationNearAddToCart.variantId}/${quantity}`, {
            method: "POST",
            credentials: "include"
        });
       
        let response;
        try {
            response = await result.json();
        } catch (error) {
            console.error(error);
        }
      
        if(result.status === 403) {
            setOpenLoginPopup(true);
        } 

        if(result.status === 201) {
            setAddedToCartMessage(response.message);
            setOpenSuccessOrFailureMessage(true);
            setChangeCartItemCount(changeCartItemCount + 1);
            setCartItemsCount(prev => prev + 1);

            setTimeout(() => {
                setOpenSuccessOrFailureMessage(false);
            }, 3000);
        }
        
    };

    useEffect(() => {

        const getCount = async () => {
            const result = await getCartItemsCount();

            setCartItemsCount(result)
        }
      
        getCount();

    }, []);

    const nowWayToLogin = () => {
        setOpenLoginPopup(false);
    };

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
            setActiveLittleImage(newActiveVariation.index);
        } else {
            const newActiveVariation = productVariations.find(vary => vary.index === currentIndex + 1);
            setCurrentVariation(newActiveVariation);
            setActiveLittleImage(newActiveVariation.index);
        }
    };

    const prev = () => {
        let currentIndex = currentVariation.index;

        if (currentIndex - 1 < 0) {
            const newActiveVariation = productVariations.find(vary => vary.index === productVariations.length - 1);
            setCurrentVariation(newActiveVariation);
            setActiveLittleImage(newActiveVariation.index);
        } else {
            const newActiveVariation = productVariations.find(vary => vary.index === currentIndex - 1);
            setCurrentVariation(newActiveVariation);
            setActiveLittleImage(newActiveVariation.index);
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

    const changeQuantity = (newQuantity) => {
        setQuatity(newQuantity);
    };

    return (
        <div className="">
        <SuccessOrFailureMessagePopup open={openSuccessOrFailureMessage ? true : false} message={addedToCartMessage}></SuccessOrFailureMessagePopup>
        <CostumerNavBar cartItemsCount={cartItemsCount}></CostumerNavBar>
        <div className={`min-h-screen relative w-screen flex flex-col sm:pb-1.5 pb-24 gap-6`}>
            {openLoginPopup === true && <CostumerLoginPopup noWay={nowWayToLogin}></CostumerLoginPopup>}
            {isOpen && <AddToCartBox variations={productVariations} closeOpen={closeOpen}></AddToCartBox>}
            <div className="sm:grid sm:grid-cols-2 w-full gap-8">
                <div className="">
                    <div
                        className="h-96 w-full flex relative group overflow-x-hidden"
                        {...swipeHandlers}
                    >
                        <button onClick={prev} className="absolute group-hover:block hidden left-1.5 top-1/2 rounded-[50%] bg-white font-bold p-2 -translate-y-1/2 cursor-pointer z-50"><ArrowLeftIcon className="text-indigo-600"></ArrowLeftIcon></button>
                        <div
                            className={`flex transition-transform duration-200`}
                            style={{ transform: `translateX(-${currentVariation?.index * 100}%)` }}
                        >
                            {productVariations.map((vary, i) =>
                                <img
                                    className="w-full object-cover shrink-0 aspect-video h-full"
                                    src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                                >

                                </img>
                            )}
                        </div>
                            <button onClick={next} className="absolute right-1.5 top-1/2 group-hover:block hidden rounded-[50%] bg-white p-2 font-bold -translate-y-1/2 cursor-pointer"><ArrowRightIcon className="text-indigo-600"></ArrowRightIcon></button>
                    </div>
                    <div className="mt-4 overflow-x-auto gap-2 p-1.5 flex h-[100px] w-full">
                        {productVariations.map(vary =>
                            <img
                                className={`rounded-2xl ${activeLittleImage === vary.index && 'ring-indigo-600 ring-2' } shadow object-contain aspect-square h-full`}
                                src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                            >

                            </img>
                        )}
                    </div>
                </div>
                <div className="p-1.5 sm:block hidden">
                    <div className="flex gap-2 mb-6">
                        <img
                            className="aspect-square max-w-[122px]"
                            src={`http://localhost:8080/api/public/product-image/${currentVariationNearAddToCart.image}`}
                            alt=""
                        />
                        <div>
                            <p className="font-medium text-lg mb-2">{currentVariationNearAddToCart.variationName}</p>
                            <p className="text-2xl text-indigo-600 mb-4 font-bold">${currentVariationNearAddToCart.price.toLocaleString()}</p>
                            <div className="flex gap-1.5 items-center">
                                <CommonSvgIcon classList={"w-6 h-6"} type={"star"}></CommonSvgIcon>
                                <p className="text-sm text-gray-400">todo: ratings</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-4 max-h-[250px] flex-wrap overflow-y-scroll">
                        {
                            productVariations.map((vary, i, self) => {

                            const isFirst = self.findIndex(selfy => selfy.variantId === vary.variantId) === i;

                            if(!isFirst) {
                                return null;
                            }

                            return <button
                                        className="flex relative gap-1.5 hover:bg-indigo-100 active:scale-95 transition cursor-pointer items-center ring-2 ring-black/5 hover:scale-101"
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
                                            <p className=" px-1.5 text-sm text-indigo-600">${vary.price.toLocaleString()}</p>
                                        </div>
                                {currentVariationNearAddToCart.variantId === vary.variantId && <p className="absolute text-2xl bottom-0 right-0">✅</p>}
                                    </button>
                                }
                            )
                        }
                    </div>
                    <p className="font-semibold mb-2">Quantity</p>
                    <div className="flex gap-7 items-center mb-4">
                        <button onClick={() => (changeQuantity(quantity - 1))} disabled={quantity === 0} className="hover:bg-gray-300 active:scale-95 transition cursor-pointer border px-1.5 rounded">-</button>
                        <p>{quantity}</p>
                        <button onClick={() => (changeQuantity(quantity + 1))} className="hover:bg-gray-300 active:scale-95 transition cursor-pointer border px-1.5 rounded">+</button>
                    </div>
                    <div className="flex justify-start w-full">
                        <button onClick={addToCart} className={"mr-3 hover:scale-105 bg-indigo-600 px-4 py-2 rounded-2xl text-white font-semibold transition active:scale-95 cursor-pointer"}>Add to cart</button>
                        <Button bg={"bg-orange-500"} classList={"hover:scale-105 transition active:scale-95 cursor-pointer"} variant="primary">Buy now</Button>
                    </div>
                </div>
            </div>
            <div className="border-b p-3">
                <div>                                                        
                    <p className="text-[22px] leading-tight line-clamp-2 font-semibold">{currentVariation.variationName}</p>
                    <p className="text-[22px] font-bold text-indigo-600">${currentVariation?.price?.toLocaleString()}</p>
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
                    
            <div className="flex gap-1.5 p-3 shadow">
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

            <div className="grid sm:grid-cols-6 p-1.5 grid-cols-2 gap-3">
                {relatedProducts?.map(relProd => 
                    <ProductBoxInFeed product={relProd} onClick={changeProduct} />
                )}
            </div>

            <div className="fixed grid grid-cols-[1fr_1fr_50%] sm:hidden left-0 right-0 justify-end w-full bottom-0">
                <button className="py-3 px-5 text-4xl font-bold bg-blue-400">💬</button>
                <button onClick={open} className="py-3 px-5 font-bold  bg-emerald-500 text-white">Add to cart</button>
                <button className="py-3 px-5 bg-orange-500 text-white font-bold">Buy now</button>
            </div>
        </div>
        </div>
    );
}