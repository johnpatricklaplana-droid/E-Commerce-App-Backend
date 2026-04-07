import React, { useEffect, useRef } from "react";

export default function SellerDashBoard () {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const c = canvas.getContext("2d");

        // Get canvas width/height from the container
        const canvasWidth = canvas.getBoundingClientRect().width;
        const canvasHeight = canvas.getBoundingClientRect().height;

        // Set internal resolution for crisp lines
        canvas.width = canvasWidth * window.devicePixelRatio;
        canvas.height = canvasHeight * window.devicePixelRatio;
        c.scale(window.devicePixelRatio, window.devicePixelRatio);

        const padding = 50; // padding from edges
        const numYLines = 5;
        const numXLines = 12;

        // Y-axis grid
        for (let i = 0; i <= numYLines; i++) {
            const y = padding + ((canvasHeight - 2 * padding) / numYLines) * i;
            c.beginPath();
            c.moveTo(padding, y);
            c.lineTo(canvasWidth - padding, y);
            c.strokeStyle = "#ccc";
            c.lineWidth = 1;
            c.stroke();

            // Optional: Y-axis labels
            const value = ((numYLines - i) * 100); // adjust scale
            c.fillStyle = "#000";
            c.font = "12px Arial";
            c.fillText(`$${value}`, 10, y + 4);
        }

        // X-axis grid
        for (let i = 0; i < numXLines; i++) {
            const x = padding + ((canvasWidth - 2 * padding) / (numXLines - 1)) * i;
            c.beginPath();
            c.moveTo(x, padding);
            c.lineTo(x, canvasHeight - padding);
            c.strokeStyle = "#eee";
            c.stroke();

            // Optional: X-axis labels
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            c.fillStyle = "#000";
            c.fillText(months[i], x - 10, canvasHeight - padding + 20)
        }
    }, []);

    return (
        <div className="flex bg-blue-100 h-screen w-screen">
            <aside id="sideBar" className="bg-blue-900 sm:flex hidden w-62.5 py-5 h-full flex-col items-center gap-1.5">
                <div className="flex flex-col items-center">
                    <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/50/50" alt="" />
                        <h1 className="text-white text-lg">Johny hey daddy</h1>
                        <p className="text-sm text-gray-400">Seller</p>
                </div>

                <div className="px-5 py-2 w-full hover:bg-blue-300 flex gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="8" height="8" rx="2" fill="#D1D5DB" />

                        <rect x="13" y="3" width="8" height="5" rx="2" fill="#D1D5DB" />

                        <rect x="3" y="13" width="8" height="8" rx="2" fill="#D1D5DB" />

                        <rect x="13" y="10" width="8" height="11" rx="2" fill="#D1D5DB" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Dashboard</label>
                </div>
                <div className="px-5 py-2 flex w-full hover:bg-blue-300 gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" stroke="#D1D5DB" strokeWidth="2" stroke-linejoin="round" />
                        <path d="M3 7L12 11L21 7" stroke="#D1D5DB" strokeWidth="2" />
                        <line x1="12" y1="11" x2="12" y2="21" stroke="#D1D5DB" strokeWidth="2" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Orders</label>
                </div>
                <div className="px-5 py-2 flex hover:bg-blue-300 w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#D1D5DB" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#D1D5DB" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#D1D5DB" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#D1D5DB" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Products</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="14" width="3" height="6" fill="#D1D5DB" />
                        <rect x="10" y="10" width="3" height="10" fill="#D1D5DB" />
                        <rect x="16" y="6" width="3" height="14" fill="#D1D5DB" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Analytics</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 5H20V15H7L4 18V5Z" stroke="#D1D5DB" strokeWidth="2" stroke-linejoin="round" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Messages</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17L6 21L8 14L3 9L10 9L12 3L14 9L21 9L16 14L18 21L12 17Z" stroke="#D1D5DB" strokeWidth="2"
                            strokeLinejoin="round" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Reviews</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#D1D5DB" strokeWidth="2" />
                        <circle cx="12" cy="12" r="2" fill="#D1D5DB" />
                    </svg>
                    <label className="text-gray-300 text-[12px]" for="">Payouts</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5A3.5 3.5 0 1 0 12 15.5Z" stroke="#D1D5DB" strokeWidth="2" />

                        <path
                            d="M19.4 15A7.9 7.9 0 0 0 20 12A7.9 7.9 0 0 0 19.4 9L21 7.5L19 4.5L17 5.3A8 8 0 0 0 15 4.6L14.5 2H9.5L9 4.6A8 8 0 0 0 7 5.3L5 4.5L3 7.5L4.6 9A7.9 7.9 0 0 0 4 12A7.9 7.9 0 0 0 4.6 15L3 16.5L5 19.5L7 18.7A8 8 0 0 0 9 19.4L9.5 22H14.5L15 19.4A8 8 0 0 0 17 18.7L19 19.5L21 16.5L19.4 15Z"
                            stroke="#D1D5DB" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <label className="text-[12px] text-gray-300" for="">Settings</label>
                </div>
                <div className="px-5 py-2 hover:bg-blue-300 flex w-full gap-1.5 items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12A8 8 0 0 1 20 12" stroke="#D1D5DB" strokeWidth="2" stroke-linecap="round" />

                        <rect x="4" y="12" width="3" height="6" rx="1.5" stroke="#D1D5DB" strokeWidth="2" />
                        <rect x="17" y="12" width="3" height="6" rx="1.5" stroke="#D1D5DB" strokeWidth="2" />

                        <path d="M12 20C13.5 20 14.5 19 14.5 17.5" stroke="#D1D5DB" strokeWidth="2" stroke-linecap="round" />
                    </svg>
                    <label className="text-[12px] text-gray-300" for="">Support</label>
                </div>
            </aside>
            <div className="flex flex-col overflow-auto items-baseline w-full">
                <div className="w-full flex px-4 items-center top-0 sticky py-3 shadow-2xs justify-between bg-white">
                    <h1 className="text-2xl">Seller Dashboard</h1>
                    <div className="flex gap-4">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2.5C9.5 2.5 7.5 4.5 7.5 7V11C7.5 11.9 7.1 12.7 6.5 13.3L5.2 14.6C4.4 15.4 5 17 6.3 17H17.7C19 17 19.6 15.4 18.8 14.6L17.5 13.3C16.9 12.7 16.5 11.9 16.5 11V7C16.5 4.5 14.5 2.5 12 2.5Z"
                                stroke="gray" strokeWidth="2" strokeLinejoin="round" />

                            <circle cx="12" cy="19" r="1.5" stroke="gray" strokeWidth="2" />
                        </svg>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" stroke="gray" r="10" />
                            <path d="M10 4H14V10H20V14H14V20H10V14H4V10H10V4Z" fill="gray" />
                        </svg>
                    </div>
                </div>
                <div className="flex p-7 gap-3.5 w-full">
                    <div className="w-full gap-3.5 flex flex-col items-start">
                        <div className="flex gap-4 w-full">
                            <div className="py-2.5 px-9 rounded shadow bg-white" id="totalSales">
                                <p className="text-[12px] w-full">Today's Sales</p>
                                <h1 className="text-2xl">$1,250</h1>
                            </div>
                            <div className="py-2.5 px-9 rounded shadow bg-white" id="ordersPending">
                                <p className="text-[12px] w-full">Orders Pending</p>
                                <h1 className="text-2xl">15</h1>
                            </div>
                            <div className="py-2.5 px-9 rounded shadow bg-white" id="productsInStock">
                                <p className="text-[12px] w-full">Products in Stock</p>
                                <h1 className="text-2xl">$1,250</h1>
                            </div>
                            <div className="py-2.5 px-9 rounded shadow bg-white" id="totalEarnings">
                                <p className="text-[12px] w-full">Total Earnings</p>
                                <h1 className="text-2xl">$100,250</h1>
                            </div>
                        </div>
                    <div/>
                <div/>
                <div>
                    <div className="flex flex-col gap-3.5">
                        <div className="flex bg-white flex-col shadow rounded p-3 items-center">
                            <div className="flex justify-between w-full">
                                <h1>Sales Overview</h1>
                                <select>
                                    <option value="Last 6 months">Last 6 months</option>
                                    <option value="Last 6 months">Last 6 months</option>
                                    <option value="Last 6 months">Last 6 months</option>
                                    <option value="Last 6 months">Last 6 months</option>
                                </select>
                            </div>
                                    <canvas 
                                        ref={canvasRef}
                                        className="sm:w-162.5 sm:h-50"
                                    ></canvas>
                            <div className="flex justify-around items-center w-[60%]">
                                <div className="flex items-center">
                                    <svg width="40" height="40" viewBox="0 0 40 40">
                                        <rect x="12.5" y="12.5" width="15" height="15" rx="5" ry="5" fill="green" />
                                    </svg>
                                    <span>Orders</span>
                                </div>
                                <div className="flex items-center">
                                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="12.5" y="12.5" width="15" height="15" rx="5" ry="5" fill="blue" />
                                    </svg>
                                    <span>Revenue</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col w-[50%] shadow rounded p-2.5 items-center bg-white gap-2">
                                <h1 className="text-lg text-start w-full">Inventory Status</h1>
                                <h1 className="text-lg text-start w-full">Inventory Status</h1>
                                <hr className="w-full text-gray-400" />
                                <div className="flex gap-2 w-full justify-around">
                                    <div className="p-3 w-[50%] rounded shadow bg-green-200">
                                        <h1 className="text-[14px]">Low Stocks</h1>
                                        <p className="text-[12px]">5 products</p>
                                    </div>
                                    <div className="p-3 w-[50%] rounded shadow bg-pink-200">
                                        <h1 className="text-[14px]">Out of Stock</h1>
                                        <p className="text-[12px]">5 Products</p>
                                    </div>
                                </div>
                                <hr className="w-full text-gray-400" />
                                <button className="rounded bg-blue-800 hover:bg-blue-900 px-5 py-1.5 text-white">Manage
                                    Inventory
                                </button>
                            </div>
                            <div className="flex w-[50%] flex-col shadow gap-2.5 p-2.5 bg-white rounded">
                                <h1 className="text-lg">Top Selling Products</h1>
                                <hr className="text-gray-400" />
                                <div className="flex gap-1.5 justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                        <span className="text-[14px]">Wireless Headphones</span>
                                    </div>
                                    <span className="font-bold">$1000</span>
                                </div>
                                <hr className="text-gray-400" />
                                <div className="flex gap-1.5 justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                            <span className="text-[14px]">Wireless Headphones</span>
                                    </div>
                                    <span className="font-bold">$1000</span>
                                </div>
                                <hr className="text-gray-400" />
                                <div className="flex gap-1.5 justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                        <span className="text-[14px]">Wireless Headphones</span>
                                    </div>
                                    <span className="font-bold">$1000</span>
                                </div>
                                <hr className="text-gray-400" />
                                <a className="text-blue-600 font-bold text-center" href="#">View all</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-3.5" />
                <div className="flex bg-white p-2.5 rounded shadow flex-col gap-1.5 h-96 overflow-auto">
                    <div className="flex justify-between">
                        <h1 className="text-lg">Recent Orders</h1>
                        <a className="text-blue-600" href="#">View All</a>
                    </div>
                    <hr className="text-gray-400" />
                    <div className="flex gap-1.5 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                <div>
                                    <span className="text-[14px]">Wireless Headphones</span>
                                    <p className="text-yellow-400 text-[12px]">Pending</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">$1000</span>
                            <p className="text-gray-400 text-[12px]">rasma</p>
                        </div>
                    </div>
                    <hr className="text-gray-400" />
                    <div className="flex gap-1.5 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                <div>
                                    <span className="text-[14px]">Wireless Headphones</span>
                                    <p className="text-[12px]">Shipped</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">$1000</span>
                            <p className="text-gray-400 text-[12px]">rasma</p>
                        </div>
                    </div>
                    <hr className="text-gray-400" />
                    <div className="flex gap-1.5 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                <div>
                                    <span className="text-[14px]">Wireless Headphones</span>
                                    <p className="text-green-400 text-[12px]">Completed</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">$1000</span>
                            <p className="text-gray-400 text-[12px]">rasma</p>
                        </div>
                    </div>
                    <hr className="text-gray-400" />
                    <div className="flex gap-1.5 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                <div>
                                    <span className="text-[14px]">Wireless Headphones</span>
                                    <p className="text-green-400 text-[12px]">Processing</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">$1000</span>
                            <p className="text-gray-400 text-[12px]">rasma</p>
                        </div>
                    </div>
                    <hr className="text-gray-400" />
                   {/* </div> */}
                    <div className="bg-white flex shadow flex-col gap-1.5 rounded p-2.5">
                        <h1 className="text-lg">Messages</h1>
                        <hr className="text-gray-400" />
                        <div className="flex gap-1.5 justify-between items-center">
                            <div className="flex items-center gap-1.5">
                                <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                <div>
                                    <h1 className="text-[14px]">Johny hey daddy</h1>
                                    <span className="text-[12px]">tagal nama beh?</span>
                                </div>
                            </div>
                            <span className="font-bold">TODO</span>
                        </div>
                        <hr className="text-gray-400" />
                            <div className="flex gap-1.5 justify-between items-center">
                                <div className="flex items-center gap-1.5">
                                    <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="" />
                                    <div>
                                        <h1 className="text-[14px]">Johny hey daddy</h1>
                                        <span className="text-[12px]">tagal nama beh?</span>
                                    </div>
                                </div>
                                <span className="font-bold">TODO</span>
                            </div>
                            <hr className="text-gray-400" />
                                <a className="text-blue-500 font-bold text-center" href="#">View All Message</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                                                    
                                                    
    );
}