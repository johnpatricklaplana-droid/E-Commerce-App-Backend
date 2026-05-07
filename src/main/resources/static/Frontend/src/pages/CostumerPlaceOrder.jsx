import { useEffect, useState } from "react";
import CostumerNavBar from "../components/CostumerNavBar";
import { useLocation } from "react-router-dom";
import { GET, POST } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function CostumerPlaceOrder () {

    const navigate = useNavigate();

    const location = useLocation();

    const cartItemIds = location.state?.cartItemIds || [];
    
    const [userLocation, setUserLocation] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [variations, setVariations] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
       
        const getCartItemsToPlaceOrder = async () => {
            const url = "http://localhost:8080/api/costumer/cart/items";
            const body = {
                cartItemId: cartItemIds
            };

            const result = await POST(url, body);
            
            const varys = result.map(res => 
                ({...res.variations, quantity: res.quantity, productName: res.product.productName})
            );

            const varies = varys.map(vary => 
                ({
                    quantity: vary.quantity,
                    productName: vary.productName,
                    id: vary.variantId,
                    color: vary.color,
                    image: vary.imagesUrl[0],
                    price: vary.price,
                    name: vary.variationName
                })
            );

            const total = varies.reduce((vary, item) => {
                return vary + item.price * item.quantity;
            }, 0);

            setVariations(varies);
            setTotalPrice(total);
        };

        getCartItemsToPlaceOrder();

    }, [cartItemIds]);

    useEffect(() => {
        const getUserLocation = async () => {
            const url = "http://localhost:8080/api/costumer/location";
            const result = await GET(url);

            setUserLocation(result);
            console.log(result);
        };

        getUserLocation();
    }, []);

    const placeOrder = async () => {

        const url = "http://localhost:8080/api/costumer/orders";
        const body = {
            cartItemId: cartItemIds
        };

        console.log(JSON.stringify(body));

        const result = await POST(url, body);

        const clientSecret = result.client_secret;

        navigate(`/costumer-payment-confirmation?client-secret=${clientSecret}`);
    };

    console.log(variations);

    return (
        <div className="space-y-8">
            <CostumerNavBar></CostumerNavBar>
            <div className="p-7">
                <div className="mb-8">
                    <h1 className="text-2xl mb-4 font-bold">Checkout</h1>
                    <p className="mb-6">Almost there! Please review your information and place your order.</p>
                    <div className="">
                        <div className="ring-gray-400/50 ring-1 rounded p-6 border-gray-400">
                            <div className="flex mb-4 justify-between items-center">
                                <h1 className="text-lg font-semibold">Shipping address</h1>
                                <button className="text-gray-400 font-bold transition cursor-pointer px-3 py-1.5 ring-2 rounded ring-gray-400/50">Edit</button>
                            </div>
                            <div className="">
                                <div  className="space-y-2">
                                    <p className="text-gray-400 text-xs">{userLocation.province}</p>
                                    <p className="text-gray-400 text-xs">{userLocation.street}</p>
                                    <p className="text-gray-400 text-xs">{userLocation.city}</p>
                                    <p className="text-gray-400 text-xs">{userLocation.country}</p>
                                </div>
                            </div>
                            <button className="text-green-500 mt-2 font-semibold cursor-pointer">+ Add new address</button>
                        </div>
                    </div>
                </div>
                <div className="p-6 ring-gray-400/50 shadow ring-1 h-fit rounded space-y-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Order Summary</h1>
                        <p className="text-gray-400">{variations.length} items</p>
                    </div>
                    {
                        variations.map(vary => 
                            <div 
                                className="flex items-end justify-between"
                                key={vary.id}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                                        className="w-[64px] h-[64px]"
                                    ></img>
                                    <div>
                                        <h1>{vary.productName}</h1>
                                        <p className="text-sm text-gray-400">variation: {vary.name}</p>
                                        <p className="text-sm text-gray-400">quantity: {vary.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold text-sm text-red-500">${vary.price.toLocaleString()}</p>
                            </div>
                        )
                    }
                    <hr className="text-gray-400" />
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">Shipping</p>
                        <p className="text-sm text-green-500">FREE</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-sm text-red-500">$TODO</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-red-500">${totalPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="w-full sm:flex justify-between items-center bg-green-50 p-6 sticky bottom-0">
                <div className="flex items-center gap-6">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="12" fill="#BBF7D0" />

                        <rect x="14" y="22" width="20" height="14" rx="3" fill="#166534" />

                        <path d="M18 22V18C18 14.6863 20.6863 12 24 12C27.3137 12 30 14.6863 30 18V22"
                            stroke="#166534"
                            stroke-width="2"
                            stroke-linecap="round" />

                        <circle cx="24" cy="29" r="2" fill="#BBF7D0" />
                    </svg>
                    <div>
                        <h1 className="text-2xl font-bold">let's go</h1>
                        <p className="text-gray-400">Please review details above and click the button to confrim your order.</p>
                    </div>
                </div>
                <button 
                    className="p-3 ml-auto mt-6 cursor-pointer hover:bg-green-600 flex gap-6 bg-green-500"
                    onClick={placeOrder}
                >
                    <span className="font-semibold">Place Order</span>
                    <span className="font-bold text-white">${totalPrice.toLocaleString()}</span>
                </button>
            </div>
        </div>
    );
}