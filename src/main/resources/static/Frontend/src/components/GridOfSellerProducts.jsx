import { Image, Star, MoreVerticalIcon } from "lucide-react";

export default function GridOfSellerProducts ( { products } ) {
    return (
        <div className="grid lg:grid-cols-3 gap-6 grid-cols-2 mt-8">
            {products.map(prod =>
                <div
                    className="relative hover:shadow-lg shadow-sm rounded-2xl overflow-hidden ring-1 ring-black/5 h-fit"
                    key={prod.price}
                >
                    <div className="absolute top-2 right-2 shadow-sm rounded-2xl">
                        <p className="text-emerald-500 bg-emerald-200 px-4 rounded-2xl">{prod.status}</p>
                    </div>
                    {prod.thumbnail === null 
                    ? <Image className="w-full bg-gray-200 text-gray-400 max-h-[60%] min-h-[60%]" />
                    : <img
                        className="w-full bg-gray-200 text-gray-400 max-h-91 object-cover h-91"
                        src={`http://localhost:8080/api/public/product-image/${prod.thumbnail}`}
                        alt={prod.thumbnail}
                    />
                    }
                    <div className="p-4">
                        <h1 className="text-lg mb-2 font-semibold">{prod.product}</h1>
                        <p className="text-gray-500 text-sm">#{prod.id}</p>
                        <div className="flex gap-1 mb-4 items-center mt-2">
                            <Star className="text-yellow-500"></Star>
                            <span className="text-sm text-gray-500">{prod.rating.rating} ({prod.rating.numberOfRaters})</span>
                        </div>
                        <div className="flex gap-2 mb-2 items-center">
                            <h2 className="text-lg font-semibold">${prod.price}</h2>
                            <p className="text-gray-500 text-sm line-through">$400,400</p>
                        </div>
                        <div className="flex mb-2 items-center justify-between">
                            <p>Stock:</p>
                            <p className="text-green-500 font-semibold">{prod.stock} units</p>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <p>Sales:</p>
                            <p className="font-semibold">{prod.sales} sold</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold rounded-2xl w-full">
                                Edit Product
                            </button>
                            <button className="ring-1 p-2 hover:bg-gray-100 cursor-pointer ring-black/15 rounded-2xl">
                                <MoreVerticalIcon></MoreVerticalIcon>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}