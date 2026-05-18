import CommonSvgIcon from "./CommonIcon";

export default function ProductBoxInFeed ( { product, onClick } ) {
    return (
        <button 
            key={product.id} 
            className="transition duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg rounded-2xl"
            onClick={() => (onClick(product.id))}
        >
            <img className="object-cover w-full h-[150px] sm:h-[200px]  rounded" src={`http://localhost:8080/api/public/product-image/${product.thumbNailUrl}`} alt="" />
            <div className="p-2">
                <div>
                    <p className="text-start truncate">{product.productName}</p>
                    <p className="text-start mt-2 mb-4 text-indigo-600 font-semibold">${product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <CommonSvgIcon type={"star"} classList={"h-[18px] width-[18px]"}></CommonSvgIcon>
                    <p className="text-xs">{product.ratings.rating} rating {product.ratings.numberOfRaters} reviews</p>
                </div>
            </div>
        </button>
    );
}