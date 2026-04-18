import { useState } from "react";
import CommonSvgIcon from "./CommonIcon";

export default function AddToCartBox ({ variations, closeOpen }) {

    const [activeVariation, setActiveVariation] = useState(variations[0]);

    const changeActiveVariation = (variantId) => {
        const newActiveVariation = variations.find(vary => vary.variantId === variantId);

        setActiveVariation(newActiveVariation);
    };

    return (
        <div 
            className={`fixed z-50 backdrop-blur-2xl pb-18 w-full min-h-1/2 bg-white/50 p-3 bottom-0`}
        >
            <div className="justify-end flex">
                <button onClick={closeOpen}>
                    <CommonSvgIcon type={"xbutton"}></CommonSvgIcon>
                </button>
            </div>
            <div className="space-y-6">
                <div className="flex items-center w-full gap-1.5">
                    <img
                        className="w-[124px] h-[124px] rounded-2xl"
                        src={`http://localhost:8080/api/public/product-image/${activeVariation.image}`}
                        alt=""
                    />
                    <div>
                        <p className="text-2xl">{activeVariation.variationName}</p>
                        <p className="text-2xl text-red-500 font-bold">${activeVariation.price.toLocaleString()}</p>
                    </div>
                </div>

                <h1>Variants</h1>

                <div
                    className="flex w-full min-h-0 shadow p-1.5 rounded-2xl overflow-y-auto max-h-[400px] h-auto justify-start flex-wrap gap-3"
                >

                    {variations.map((vary, i, self) => {

                        const isFirst = self.findIndex((variant) => variant.variantId === vary.variantId) === i;

                        if(!isFirst) return null;

                        return  <button 
                                    className=" flex hover:bg-blue-100 active:scale-95 transition max-w-full h-[64px] shadow gap-1.5 pr-1.5 items-center rounded-2xl overflow-hidden"
                                    key={vary.variantId}
                                    onClick={() => (changeActiveVariation(vary.variantId))}
                                >
                                    <img
                                        className="aspect-square h-full"
                                        src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                                    >

                                    </img>
                                    <div className="min-w-0">
                                        <p className="truncate">{vary.variationName}</p>
                                        <p className="text-red-500">${vary.price.toLocaleString()}</p>
                                    </div>
                                </button>
                        }
                    )}


                </div>
            </div>
            <button className="w-[90%] active:scale-95 transition py-3 mt-3 text-white fixed left-1/2 -translate-x-1/2 shadow bottom-3 bg-blue-400 font-bold rounded-2xl">Add to cart</button>
        </div>
    );
}