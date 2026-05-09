import { X, ChevronLeft, ChevronRight, Package, Mail, Phone, MapPin, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

export function OrderDetailsDrawer({ position, overlayHide, order, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!order) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === order.product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? order.product.images.length - 1 : prev - 1
        );
    };

    const timelineSteps = [
        { key: 'ordered', label: 'Order Placed', time: order.timeline.ordered, completed: !!order.timeline.ordered },
        { key: 'paid', label: 'Payment Confirmed', time: order.timeline.paid, completed: !!order.timeline.paid },
        { key: 'processing', label: 'Processing', time: order.timeline.processing, completed: !!order.timeline.processing },
        { key: 'shipped', label: 'Shipped', time: order.timeline.shipped, completed: !!order.timeline.shipped },
        { key: 'delivered', label: 'Delivered', time: order.timeline.delivered, completed: !!order.timeline.delivered },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 ${overlayHide} backdrop-blur-sm z-40`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed right-0 top-0 bottom-0 w-[600px] ${position} bg-white shadow-2xl z-50 overflow-y-auto`}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-8 py-6 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-[24px] font-semibold text-[#111827]">Order Details</h2>
                            <p className="text-[14px] text-[#6B7280] mt-1">{order.orderNumber}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center hover:bg-[#F3F4F6] rounded-lg transition-all"
                        >
                            <X className="w-5 h-5 text-[#6B7280]" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 py-6 space-y-8">
                    {/* Product Gallery */}
                    <div>
                        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Product</h3>
                        <div className="relative rounded-2xl overflow-hidden bg-[#F9FAFB]">
                            <img
                                src={order.product.images[currentImageIndex]}
                                alt={order.product.name}
                                className="w-full h-[320px] object-cover"
                            />

                            {order.product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-[#111827]" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5 text-[#111827]" />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {order.product.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                        ? 'bg-white w-6'
                                                        : 'bg-white/50 hover:bg-white/75'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {order.product.images.length > 1 && (
                            <div className="flex gap-3 mt-4">
                                {order.product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                ? 'border-[#6366F1] ring-2 ring-[#6366F1]/20'
                                                : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${order.product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div>
                        <h3 className="text-[20px] font-semibold text-[#111827] mb-2">
                            {order.product.name}
                        </h3>
                        <p className="text-[15px] text-[#6B7280] mb-4">
                            {order.product.description}
                        </p>

                        <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#6B7280]">Variant</span>
                                <span className="text-[14px] font-medium text-[#111827]">{order.product.variant}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#6B7280]">Color</span>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full ring-1 ring-black/10"
                                        style={{ backgroundColor: order.product.colorHex }}
                                    />
                                    <span className="text-[14px] font-medium text-[#111827]">{order.product.color}</span>
                                </div>
                            </div>
                            <div className="h-px bg-[#E5E7EB]" />
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#6B7280]">Price</span>
                                <span className="text-[20px] font-semibold text-[#111827]">
                                    ${order.product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div>
                        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Customer</h3>
                        <div className="bg-[#F9FAFB] rounded-xl p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={order.customer.avatar}
                                    alt={order.customer.name}
                                    className="w-14 h-14 rounded-full ring-2 ring-white shadow-sm"
                                />
                                <div>
                                    <p className="text-[16px] font-semibold text-[#111827]">
                                        {order.customer.name}
                                    </p>
                                    <p className="text-[13px] text-[#6B7280]">{order.customer.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2.5 pt-3 border-t border-[#E5E7EB]">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#9CA3AF]" />
                                    <span className="text-[14px] text-[#6B7280]">{order.customer.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-[#9CA3AF]" />
                                    <span className="text-[14px] text-[#6B7280]">{order.customer.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div>
                        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Order Timeline</h3>
                        <div className="relative space-y-6">
                            {timelineSteps.map((step, index) => (
                                <div key={step.key} className="relative flex gap-4">
                                    {/* Line connector */}
                                    {index < timelineSteps.length - 1 && (
                                        <div
                                            className={`absolute left-4 top-10 w-0.5 h-full ${step.completed ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                                                }`}
                                        />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                                ? 'bg-[#10B981] text-white'
                                                : 'bg-[#F3F4F6] text-[#9CA3AF]'
                                            }`}
                                    >
                                        {step.completed ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <Circle className="w-4 h-4" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-2">
                                        <p className={`text-[15px] font-medium ${step.completed ? 'text-[#111827]' : 'text-[#9CA3AF]'
                                            }`}>
                                            {step.label}
                                        </p>
                                        {step.time && (
                                            <p className="text-[13px] text-[#6B7280] mt-0.5">{step.time}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-8 py-6">
                    <div className="grid grid-cols-2 gap-3">
                        <button className="h-12 px-6 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                            <Package className="w-4 h-4" />
                            Mark as Shipped
                        </button>
                        <button className="h-12 px-6 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Contact Customer
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <button className="h-12 px-6 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-xl font-medium transition-all">
                            Cancel Order
                        </button>
                        <button className="h-12 px-6 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#EF4444] rounded-xl font-medium transition-all">
                            Refund
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
