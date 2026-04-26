import CostumerNavBar from "../components/CostumerNavBar";
import CommonSvgIcon from "../components/CommonIcon";
import { useEffect, useState } from "react";
import { GET, PATCH } from "../api/API";

export default function Cart () {

    const [user, setUser] = useState("todo");
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState({items: 0, total: 0});

    useEffect(() => {
        
        const getCartItems = async () => {
            const url = "http://localhost:8080/api/costumer/cart"

            const result = await GET(url);

            setSelected(result.map(res => 
                ({
                    "cartItemId": res.cartItemId, 
                    "selected": false,
                    "price": res.variations.price
                })
            ));
            
            setQuantities(result.map(qunt => 
                ({"cartItemId": qunt.cartItemId, "quantity": qunt.quantity})
            ));

            setCartItems(result);
        };

        getCartItems();

    }, [user]);

    const descreaseQuantity = (quantity) => {
        const newQuantity = quantity.quantity - 1;

        const url = `http://localhost:8080/api/costumer/cart/items/${quantity.cartItemId}`;
        const body = {
            quantity: newQuantity
        };

        PATCH(url, body);

        setQuantities(prev => 
            prev.map(qunt => 
                qunt.cartItemId === quantity.cartItemId
                ? {"cartItemId": qunt.cartItemId, "quantity": newQuantity}
                : qunt
            )
        );
        
        console.log(newQuantity);
    };

    const addQuantity = (quantity) => {
        const newQuantity = quantity.quantity + 1;
 
        const url = `http://localhost:8080/api/costumer/cart/items/${quantity.cartItemId}`;
        const body = {
            quantity: newQuantity
        };
        
        PATCH(url, body);

        setQuantities(prev =>
            prev.map(qunt =>
                qunt.cartItemId === quantity.cartItemId
                    ? { "cartItemId": qunt.cartItemId, "quantity": newQuantity }
                    : qunt
            )
        );
    };

    const selectIt = (cartItemId) => {
        const newSelected = selected.map(pre => {
                if(pre.cartItemId === cartItemId) {
                    if(pre.selected === false) {
                        return {...pre, "selected": true };
                    } else {
                        return {...pre ,"selected": false };
                    }
                } else {
                    return pre;
                }
            }
        )

        setSelected(newSelected);

        let total = 0;
        let item = 0;

        newSelected.forEach(sel => {
            if(sel.selected) {
                total = total + sel.price;
                item = item + 1;
            }
        });
        setTotalPrice({"items": item, "total": total});
    };

    console.log(selected);

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
                        {cartItems?.map(item => {

                            const isSelected = selected.find(sel => sel.cartItemId === item.cartItemId);

                            return <tr
                                className={`border-b ${isSelected.selected ? "bg-green-100" : ""}`}
                                key={item.cartItemId}
                            >
                                <td className="flex w-[450px] items-center gap-1.5 p-3">
                                    <p 
                                        className="border rounded border-green-500 cursor-pointer"
                                        onClick={() => (selectIt(item.cartItemId))}
                                    >
                                        <span 
                                            className={`${isSelected.selected ? "opacity-100" : "opacity-0"}`}
                                        >
                                            ✅
                                        </span>
                                    </p>

                                    <img
                                        src={`http://localhost:8080/api/public/product-image/${item.variations.imagesUrl?.[0]}`} alt=""
                                        className="min-w-[124px] h-[136px] object-cover rounded-2xl"
                                    />
                                    <div className="space-y-1.5 w-full">
                                        <h1 className="text-lg text-green-500 font-bold">{item.product?.productName}</h1>
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
                                {
                                    (() => {
                                        const quntity = quantities.find(qunt => qunt.cartItemId === item.cartItemId);
                                        return <td
                                            className="text-center flex gap-3 p-3"
                                        >
                                            <button
                                                className="border px-1.5 active:scale-95 transition cursor-pointer"
                                                onClick={() => (descreaseQuantity(quntity))}
                                            >
                                                -
                                            </button>

                                            {quntity?.quantity}
                                            <button
                                                className="border px-1.5 active:scale-95 transition cursor-pointer"
                                                onClick={() => (addQuantity(quntity))}
                                            >
                                                +
                                            </button>
                                        </td>
                                    })()
                                }
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
                        }
                        )}
                    </table>
                </div>
                <div className="flex items-center bg-white w-full shadow gap-3 sticky bottom-0 p-3 justify-end">
                    <h1 className="">TOTAL ({totalPrice.items} items): <span className="text-red-500 font-bold">${totalPrice.total.toLocaleString()}</span></h1>
                    <button className="bg-orange-500 w-[240px] py-3">Check out</button>
                </div>
            </div>
        </div>
    );
}