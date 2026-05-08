import { StatusBadge } from "../components/OrderStatusBadge";

export default function CostumerOrderBox ( {order} ) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={`http://localhost:8080/api/public/product-image/${order.productDTO.thumbnail}`}
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{order.productDTO.productName}</h3>
                            <p className="text-sm text-gray-500">{order.variationsDTO.variationName}</p>
                        </div>
                        <StatusBadge status={order.orderStatus} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Quantity</p>
                            <p className="text-sm font-medium text-gray-900">{order.quantity}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Price</p>
                            <p className="text-sm font-medium text-gray-900">${order.variationsDTO.price.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Order Date</p>
                            <p className="text-sm font-medium text-gray-900">{order.orderDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Order ID</p>
                            <p className="text-sm font-medium text-gray-900">#{order.orderId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}