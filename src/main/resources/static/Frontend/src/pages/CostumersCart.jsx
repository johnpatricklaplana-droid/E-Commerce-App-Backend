import CostumerNavBar from "../components/CostumerNavBar";
import CommonSvgIcon from "../components/CommonIcon";
import { useEffect, useState } from "react";
import { DELETE, GET, PATCH } from "../api/API";
import DeleteConfimationPopup from "../components/DeleteConfirmationPopup";
import SuccessOrFailureMessagePopup from "../components/SuccessOrFailureMessagePopup";
import { getCartItemsCount } from "../api/API";
import { useNavigate } from "react-router-dom";

export default function Cart () {

    const navigate = useNavigate();
    const [user, setUser] = useState("todo");
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState({items: 0, total: 0});
    const [deleteConfirmationPopup, setDeleteConfimationPopup] = useState(false);
    const [cartItemIdToDelete, setCartItemIdToDelete] = useState(null);
    const [deleteCartSuccess, setDeleteCartSuccess] = useState({message: "", isOpen: false});
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {

        const getCount = async () => {

            const result = await getCartItemsCount();

            setCartItemsCount(result);
        };

        getCount();

    }, [cartItems]);
    
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

    const openDeleteConfirmationPopup = (cartItemId) => {
        setCartItemIdToDelete(cartItemId);
        setDeleteConfimationPopup(true);
    }; 

    const closeDeleteConfimationPopu = () => {
        setDeleteConfimationPopup(false);
    };

    const confirmDelete = async () => {
        
        setDeleteConfimationPopup(false);

        setCartItems(prev => prev.filter(pre => pre.cartItemId !== cartItemIdToDelete));

        const url = `http://localhost:8080/api/costumer/cart/items/${cartItemIdToDelete}`;

        const result = await DELETE(url);

        if(result.status === 200) {
            setDeleteCartSuccess({message: "deleted one", isOpen: true});

            setTimeout(() => {
                setDeleteCartSuccess({message: "deleted one", isOpen: false});
            }, 3000);
        } else {
            setDeleteCartSuccess({message: "delete failed for some reason", isOpen: false});
        }

    };

    console.log(selected);

    return (
        <div className="h-screen">
            <SuccessOrFailureMessagePopup open={deleteCartSuccess.isOpen} message={deleteCartSuccess.message}></SuccessOrFailureMessagePopup>
            <DeleteConfimationPopup confirm={confirmDelete} cancel={closeDeleteConfimationPopu} open={deleteConfirmationPopup}></DeleteConfimationPopup>
            <CostumerNavBar cartItemsCount={cartItemsCount}></CostumerNavBar>
            <div className="flex flex-col h-full">
                <div className="p-6 h-full overflow-auto">
                    <div className={`h-full w-full flex flex-col gap-6 items-center justify-center ${cartItems.length === 0 ? "block" : "hidden"}`}>
                        <h1 className={`text-4xl max-w-[60%] text-center`}>Looks like you haven’t added anything yet. Start shopping to fill your cart.</h1>
                        <button 
                            className="w-fit bg-emerald-500 py-3 px-6 hover:bg-emerald-600 cursor-pointer active:scale-95 transition text-white font-bold rounded"
                            onClick={() => (navigate("/costumer-feed"))}
                        >
                            Shop now like a pro
                        </button>
                    </div>
                    <table className={`w-full ${cartItems.length === 0 ? "hidden" : "table"}`}>
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
                                                disabled={quntity?.quantity === 1 ? true : false}
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
                                <td className="">
                                    <button 
                                        className="text-center p-1.5 rounded hover:scale-105 transition cursor-pointer active:scale-95 hover:bg-red-700 text-sm hover:text-white text-red-500 justify-center border border-red-500 items-center flex gap-1.5"
                                        onClick={() => (openDeleteConfirmationPopup(item.cartItemId))}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M8 6V4h8v2" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <line x1="10" y1="11" x2="10" y2="17" />
                                            <line x1="14" y1="11" x2="14" y2="17" />
                                        </svg>
                                        Remove
                                    </button>
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