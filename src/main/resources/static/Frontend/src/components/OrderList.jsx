import { Eye, Printer, MoreHorizontal, MapPin } from 'lucide-react';


export function OrdersList({ orders, onOrderClick }) {
    const getStatusColor = (status) => {
        const colors = {
            PENDING: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
            PROCESSING: 'bg-[#DBEAFE] text-[#1E3A8A] border-[#BFDBFE]',
            SHIPPED: 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]',
            DELIVERED: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]',
            CANCELLED: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
            paid: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]',
            FAILED: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
            REFUNDED: 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]',
            requested: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
            approved: 'bg-[#DBEAFE] text-[#1E3A8A] border-[#BFDBFE]',
            completed: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]',
            none: 'hidden',
        };
        return colors[status] || 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
    };

    return (
        <div className="px-8 pb-8 grid gap-8 sm:grid-cols-2 mt-8">
            {orders.map((order) => (
                <div
                    key={order.id}
                    onClick={() => onOrderClick(order.orderId)}
                    className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                    <div className="p-6 grid grid-cols-[1fr,200px,180px,140px,180px,auto] gap-6 items-center">
                        {/* Product Section */}
                        <div className="flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={`http://localhost:8080/api/public/product-image/${order.product.thumbnail}`}
                                    className="w-20 h-20 rounded-xl object-cover ring-1 ring-black/5"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-[16px] font-semibold text-[#111827] mb-1 truncate">
                                    {order.product.productName}
                                </h3>
                                <p className="text-[13px] text-[#6B7280] mb-2 line-clamp-1">
                                    {order.product.productDescription}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] text-[#9CA3AF]">{order.varaitions?.variationName}</span>
                                    <span className="text-[#D1D5DB]">•</span>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="w-3 h-3 rounded-full ring-1 ring-black/10"
                                            style={{ backgroundColor: order.varaitions?.color }}
                                        />
                                        <span className="text-[13px] text-[#9CA3AF]">{order.variations?.color}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Section */}
                        <div className="flex items-center gap-3">
                            <img
                                src="https://picsum.photos/200/300?random=1"
                                className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                            />
                            <div className="min-w-0">
                                <p className="text-[14px] font-medium text-[#111827] truncate">
                                    {order.costumer?.firstName + order.costumer?.lastName}
                                </p>
                                <p className="text-[12px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">TODO: philipinnes</span>
                                </p>
                            </div>
                        </div>

                        
                        <div>
                            <p className="text-[13px] font-medium text-[#6B7280] mb-1">
                                {order.orderId}{/* Order Info */}
                            </p>
                            <p className="text-[13px] text-[#9CA3AF]">{order.orderDate}</p>
                            {/* <p className="text-[12px] text-[#9CA3AF]">{order.time}</p> */}
                        </div>

                        {/* Pricing */}
                        <div>
                            <p className="text-[24px] font-semibold text-red-500">
                                ${order.variations?.price.toLocaleString()}
                            </p>
                        </div>

                        {/* Status Badges */}
                        <div className="space-y-2">
                            <div
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium border ${getStatusColor(
                                    order.orderStatus
                                )}`}
                            >
                                {order.orderStatus.toUpperCase()}
                            </div>
                            <div
                                className={`inline-flex ml-2 items-center px-3 py-1.5 rounded-full text-[12px] font-medium border ${getStatusColor(
                                    order.paymentStatus
                                )}`}
                            >
                                {order.paymentStatus}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="w-9 h-9 flex items-center justify-center bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-all"
                                title="Process Order"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="w-9 h-9 flex items-center justify-center bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] rounded-lg transition-all"
                                title="Print"
                            >
                                <Printer className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="w-9 h-9 flex items-center justify-center bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] rounded-lg transition-all"
                                title="More Options"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
