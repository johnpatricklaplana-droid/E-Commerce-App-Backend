import React, { useEffect, useRef } from "react";
import Sidebar from "./AddProductSidebar";

export default function SellerDashBoard() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const c = canvas.getContext("2d");
        const canvasWidth = canvas.getBoundingClientRect().width;
        const canvasHeight = canvas.getBoundingClientRect().height;

        canvas.width = canvasWidth * window.devicePixelRatio;
        canvas.height = canvasHeight * window.devicePixelRatio;
        c.scale(window.devicePixelRatio, window.devicePixelRatio);

        const padding = 50;
        const numYLines = 5;
        const numXLines = 12;

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let i = 0; i <= numYLines; i++) {
            const y = padding + ((canvasHeight - 2 * padding) / numYLines) * i;
            c.beginPath();
            c.moveTo(padding, y);
            c.lineTo(canvasWidth - padding, y);
            c.strokeStyle = "#ccc";
            c.lineWidth = 1;
            c.stroke();

            const value = (numYLines - i) * 100;
            c.fillStyle = "#000";
            c.font = "12px Arial";
            c.fillText(`$${value}`, 10, y + 4);
        }

        for (let i = 0; i < numXLines; i++) {
            const x = padding + ((canvasWidth - 2 * padding) / (numXLines - 1)) * i;
            c.beginPath();
            c.moveTo(x, padding);
            c.lineTo(x, canvasHeight - padding);
            c.strokeStyle = "#eee";
            c.stroke();

            c.fillStyle = "#000";
            c.fillText(months[i], x - 10, canvasHeight - padding + 20);
        }
    }, []);

    return (
        <div className="grid grid-cols-[270px_1fr] bg-blue-100 h-screen w-screen">

            <Sidebar/>

            <main className="flex flex-col overflow-auto items-baseline w-full">
                <header className="w-full flex px-4 items-center top-0 sticky py-3 shadow-2xs justify-between bg-white">
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
                </header>

                <section className="flex p-7 gap-3.5 w-full">
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

                        <div className="flex flex-col gap-3.5 w-full">
                            <div className="flex bg-white flex-col shadow rounded p-3 items-center w-full">
                                <div className="flex justify-between w-full mb-4">
                                    <h1>Sales Overview</h1>
                                    <select>
                                        <option value="Last 6 months">Last 6 months</option>
                                        <option value="Last 3 months">Last 3 months</option>
                                        <option value="Last month">Last month</option>
                                        <option value="This year">This year</option>
                                    </select>
                                </div>
                                <canvas ref={canvasRef} className="w-full h-64" />
                                <div className="flex justify-around items-center w-[60%] mt-4">
                                    <div className="flex items-center gap-2">
                                        <svg width="40" height="40" viewBox="0 0 40 40">
                                            <rect x="12.5" y="12.5" width="15" height="15" rx="5" ry="5" fill="green" />
                                        </svg>
                                        <span>Orders</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="12.5" y="12.5" width="15" height="15" rx="5" ry="5" fill="blue" />
                                        </svg>
                                        <span>Revenue</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 w-full">
                                <div className="flex flex-col w-[50%] shadow rounded p-2.5 items-start bg-white gap-2">
                                    <h1 className="text-lg">Inventory Status</h1>
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
                                    <button className="rounded bg-blue-800 hover:bg-blue-900 px-5 py-1.5 text-white">Manage Inventory</button>
                                </div>
                                <div className="flex w-[50%] flex-col shadow gap-2.5 p-2.5 bg-white rounded">
                                    <h1 className="text-lg">Top Selling Products</h1>
                                    <hr className="text-gray-400" />
                                    <div className="flex gap-1.5 justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="Product" />
                                            <span className="text-[14px]">Wireless Headphones</span>
                                        </div>
                                        <span className="font-bold">$1000</span>
                                    </div>
                                    <hr className="text-gray-400" />
                                    <div className="flex gap-1.5 justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="Product" />
                                            <span className="text-[14px]">Wireless Headphones</span>
                                        </div>
                                        <span className="font-bold">$1000</span>
                                    </div>
                                    <hr className="text-gray-400" />
                                    <div className="flex gap-1.5 justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <img className="rounded-[50%]" src="https://picsum.photos/seed/picsum/40/40" alt="Product" />
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
                </section>
            </main>
        </div>
    );
}

