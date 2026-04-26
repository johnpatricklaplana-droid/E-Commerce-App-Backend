import CostumerNavBar from "../components/CostumerNavBar";
import CommonSvgIcon from "../components/CommonIcon";
import { useEffect, useState } from "react";
import { GET } from "../api/API";

export default function Cart () {

    const [user, setUser] = useState("todo");
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        
        const getCartItems = async () => {
            const url = "http://localhost:8080/api/costumer/cart"

            const result = await GET(url);
            console.log(result);
            setCartItems(result);
        };

        getCartItems();

    }, [user]);

    return (
        <div>
            <CostumerNavBar></CostumerNavBar>
            <div className="">
                <h1 className="font-bold font-serif m-6 text-2xl">Super Cart</h1>
                <div className="p-6">
                    <table className="w-full">
                        <tr className="border-b">
                            <th className="p-3 text-sm">Product</th>
                            <th className="p-3 text-sm">Price</th>
                            <th className="p-3 text-sm">Quantity</th>
                            <th className="p-3 text-sm">Subtotal</th>
                            <th className="p-3 text-sm">Action</th>
                        </tr>
                        {cartItems?.map(item => 
                            <tr 
                                className="border-b"
                                key={item.cartId}
                            >
                                <td className="flex w-[450px] items-center gap-1.5 p-3">
                                    <input type="checkbox" name="" id="" />
                                    <img
                                        src={`http://localhost:8080/api/public/product-image/${item.variations.imagesUrl?.[0]}`} alt=""
                                        className="min-w-[124px] h-[136px] object-cover rounded-2xl"
                                    />
                                    <div className="space-y-1.5 w-full">
                                        <h1 className="text-lg font-semibold">{item.product?.productName}</h1>
                                        <p className="text-sm">Variant: <span className="text-gray-400">{item.variations?.variationName}</span></p>
                                        <p className="text-sm">color: <span className="text-gray-400">{item.variations.color}</span></p>
                                        <p className="text-sm">seller: <span className="text-gray-400">{item.seller.firstName + " " + item.seller.lastName}</span></p>
                                        <p className="text-sm flex gap-1.5"><CommonSvgIcon type={"location"}></CommonSvgIcon>location: 
                                            <span className="text-gray-400">{item.location[0].city + " " + item.location[0].province + " " + item.location[0].country + " " + item.location[0].street}</span>
                                        </p>
                                        <p className="text-sm text-gray-400 truncate">{item.product.productDescription}</p>
                                    </div>
                                </td>
                                <td className="text-center text-red-500 text-sm font-bold p-3">${item.variations.price.toLocaleString()}</td>
                                <td
                                    className="text-center flex gap-3 p-3"
                                >
                                    <button className="border px-1.5 active:scale-95 transition cursor-pointer">-</button>
                                    {item.quantity}
                                    <button className="border px-1.5 active:scale-95 transition cursor-pointer">+</button>
                                </td>
                                <td className="text-center text-red-500 text-sm font-bold p-3">$TODO</td>
                                <td className="text-center p-3 text-sm items-center flex gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="red" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M8 6V4h8v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                    Remove
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
                <div className="flex items-center bg-white w-full shadow gap-3 sticky bottom-0 p-3 justify-end">
                    <h1 className="">TOTAL (0 items): $0</h1>
                    <button className="bg-orange-500 w-[240px] py-3">Check out</button>
                </div>
            </div>
        </div>
    );
}