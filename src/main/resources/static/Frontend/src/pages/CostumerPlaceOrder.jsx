import CostumerNavBar from "../components/CostumerNavBar";

export default function CostumerPlaceOrder () {
    return (
        <div>
            <CostumerNavBar></CostumerNavBar>
            <div className="grid p-7 gap-6 grid-cols-[700px_1fr]">
                <div className="space-y-7">
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    <p>Almost there! Please review your information and place your order.</p>
                    <div className="space-y-6">
                        <div className="ring-gray-400/50 ring-1 rounded space-y-3 p-8 border-gray-400">
                            <h1 className="text-lg font-semibold">Shipping address</h1>
                            <div className="ring-gray-400/50 ring-1 flex items-center justify-between p-3 rounded">
                                <div>
                                    <p className="font-semibold">Johny hey daddy</p>
                                    <p className="text-gray-400 text-sm">+29929323923</p>
                                    <p className="text-gray-400 text-sm">palina north national elementary university of tarlac city</p>
                                    <p className="text-gray-400 text-sm">new york</p>
                                    <p className="text-gray-400 text-sm">philippines</p>
                                </div>
                                <button className="text-gray-400 font-bold transition cursor-pointer px-3 py-1.5 ring-2 rounded ring-gray-400/50">Edit</button>
                            </div>
                            <button className="text-green-500 font-semibold cursor-pointer">+ Add new address</button>
                        </div>
                        <div className="ring-gray-400/50 ring-1 rounded space-y-3 p-8 border-gray-400">
                            <h1 className="text-lg font-semibold">Payment method</h1>
                            <div className="flex flex-wrap ring-1 ring-gray-400/50 p-3 items-center justify-start gap-3">
                                <div className="flex gap-3 ring-1 ring-gray-400/50 w-fit p-3 rounded items-center">
                                    <button className="ring-1 ring-gray-400/50 w-[24px] p-0.5 h-[24px] cursor-pointer rounded-[50%]">
                                        <div className="w-full h-full bg-green-500 rounded-[50%]"></div>
                                    </button>
                                    <img
                                        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal"
                                        className="w-[64px]"
                                    ></img>
                                    <p className="font-semibold"></p>
                                </div>
                                <div className="flex gap-3 ring-1 ring-gray-400/50 w-fit p-3 rounded items-center">
                                    <button className="ring-1 ring-gray-400/50 w-[24px] p-0.5 h-[24px] cursor-pointer rounded-[50%]">
                                        <div className="w-full h-full bg-green-500 rounded-[50%]"></div>
                                    </button>
                                    <img
                                        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal"
                                        className="w-[64px]"
                                    ></img>
                                    <p className="font-semibold"></p>
                                </div>
                                <div className="flex gap-3 ring-1 ring-gray-400/50 w-fit p-3 rounded items-center">
                                    <button className="ring-1 ring-gray-400/50 w-[24px] p-0.5 h-[24px] cursor-pointer rounded-[50%]">
                                        <div className="w-full h-full bg-green-500 rounded-[50%]"></div>
                                    </button>
                                    <img
                                        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal"
                                        className="w-[64px]"
                                    ></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 ring-gray-400/50 shadow ring-1 h-fit rounded space-y-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Order Summary</h1>
                        <p className="text-gray-400">3 items</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://picsum.photos/200/300?random=3"
                                className="w-[64px] h-[64px]"
                            ></img>
                            <div>
                                <h1>Ribbedd knit sweater</h1>
                                <p className="text-sm text-gray-400">Beige/M</p>
                                <p className="text-sm text-gray-400">Qty:1</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm text-red-500">$49.99</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://picsum.photos/200/300?random=2"
                                className="w-[64px] h-[64px]"
                            ></img>
                            <div>
                                <h1>Ribbedd knit sweater</h1>
                                <p className="text-sm text-gray-400">Beige/M</p>
                                <p className="text-sm text-gray-400">Qty:1</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm text-red-500">$49.99</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://picsum.photos/200/300?random=1"
                                className="w-[64px] h-[64px]"
                            ></img>
                            <div>
                                <h1>Ribbedd knit sweater</h1>
                                <p className="text-sm text-gray-400">Beige/M</p>
                                <p className="text-sm text-gray-400">Qty:1</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm text-red-500">$49.99</p>
                    </div>
                    <hr className="text-gray-400" />
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">Shipping</p>
                        <p className="text-sm text-green-500">FREE</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-sm text-red-500">$100,000</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-red-500">$100,000</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between items-center bg-green-50 p-6 sticky bottom-0">
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
                <button className="p-3 hover:bg-green-600 flex gap-6 bg-green-500"><span className="font-semibold">Place Order</span> <span className="font-bold text-white">$100,000</span></button>
            </div>
        </div>
    );
}