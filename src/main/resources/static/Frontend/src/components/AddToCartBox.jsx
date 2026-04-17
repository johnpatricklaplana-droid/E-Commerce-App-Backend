import { useState } from "react";
import CommonSvgIcon from "./CommonIcon";

export default function AddToCartBox () {

    const [isOpen, setIsOpen] = useState(false);

    const closeOpen = () => {
        setIsOpen(prev => prev ? false : true);
    };

    return (
        <div 
            className={`absolute ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} space-y-3 p-3 bottom-0 left-0 w-full`}
        >
            <div className="justify-end flex">
                <button
                    onClick={closeOpen}
                >
                    <CommonSvgIcon type={"xbutton"}></CommonSvgIcon>
                </button>
            </div>
            <div className="flex items-center w-full gap-1.5">
                <img 
                    className="w-[124px] h-[124px] rounded-2xl"
                    src="https://picsum.photos/seed/picsum/200/300" 
                    alt="" 
                />
                <div>
                    <p>lorem ipsum</p>
                    <p className="text-red-500 font-bold">$100101</p>
                </div>
            </div>

            <h1>Variants</h1>

            <div 
                className="flex w-full min-h-0 shadow p-1.5 rounded-2xl overflow-y-auto max-h-[500px] h-auto justify-start flex-wrap gap-3"
            >
                
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                    <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                        <img 
                            className="aspect-square h-full" 
                            src="https://picsum.photos/200/300?random=1"
                        >

                        </img>
                        <div className="min-w-0">
                            <p className="truncate">kjakfjaf</p>
                            <p className="text-red-500">$100000000</p>
                        </div>
                    </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=1"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=2"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf kajf jklafj</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=3"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf</p>
                        <p className="text-red-500">$1212</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=4"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjak jklafj</p>
                        <p className="text-red-500">$1000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=5"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf kajf</p>
                        <p className="text-red-500">$10000</p>
                    </div>
                </div>
                <div className=" flex max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden">
                    <img 
                        className="aspect-square h-full" 
                        src="https://picsum.photos/200/300?random=6"
                    >

                    </img>
                    <div className="min-w-0">
                        <p className="truncate">kjakfjaf kajf jklafj</p>
                        <p className="text-red-500">$100000000</p>
                    </div>
                </div>
                
                
            </div>
            <button className="w-full py-3 mt-3 text-white bg-blue-400 font-bold rounded-2xl">Add to cart</button>
        </div>
    );
}