import { ShoppingBag, Clock, CheckCircle, DollarSign, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

// const Order = {
//     id: "string",
//     orderNumber: "string",
//     product: {
//         name: "string",
//         description: "string",
//         variant: "string",
//         color: "string",
//         colorHex: "string",
//         images: "string",
//         price: "number"
//     },
//     customer: {
//         name: "string",
//         email: "string",
//         avatar: "string",
//         location: "string"
//     },
//     date: "string",
//     time: "string",
//     orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
//     paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded',
//     returnStatus: 'none' | 'requested' | 'approved' | 'completed',
//     timeline: {
//         ordered: "string",
//         paid: "string",
//         processing: "string",
//         shipped?: "string",
//         delivered?: "string"
//     }
// }

export function KPICards({ orders }) {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    const paidOrders = orders.filter(o => o.paymentStatus === 'paid').length;
    const revenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.product.price, 0);
    const returns = orders.filter(o => o.returnStatus !== 'none').length;

    const kpis = [
        {
            label: 'Total Orders',
            value: totalOrders.toString(),
            icon: ShoppingBag,
            trend: '+12%',
            trendUp: true,
            color: 'bg-[#6366F1]',
        },
        {
            label: 'Pending Orders',
            value: pendingOrders.toString(),
            icon: Clock,
            trend: '+5%',
            trendUp: true,
            color: 'bg-[#F59E0B]',
        },
        {
            label: 'Paid Orders',
            value: paidOrders.toString(),
            icon: CheckCircle,
            trend: '+18%',
            trendUp: true,
            color: 'bg-[#10B981]',
        },
        {
            label: 'Revenue',
            value: `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            trend: '+24%',
            trendUp: true,
            color: 'bg-[#6366F1]',
        },
        {
            label: 'Returns',
            value: returns.toString(),
            icon: RotateCcw,
            trend: '-8%',
            trendUp: false,
            color: 'bg-[#EF4444]',
        },
    ];

    return (
        <div className="px-8 py-6">
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-6">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[13px] font-medium text-[#6B7280] uppercase tracking-wide">
                                    {kpi.label}
                                </p>
                                <p className="text-[32px] font-semibold text-[#111827] tracking-tight">
                                    {kpi.value}
                                </p>
                                <div className="flex items-center gap-1.5 mt-2">
                                    <TrendIcon
                                        className={`w-4 h-4 ${kpi.trendUp ? 'text-[#10B981]' : 'text-[#EF4444]'
                                            }`}
                                    />
                                    <span
                                        className={`text-[13px] font-medium ${kpi.trendUp ? 'text-[#10B981]' : 'text-[#EF4444]'
                                            }`}
                                    >
                                        {kpi.trend}
                                    </span>
                                    <span className="text-[13px] text-[#9CA3AF]">vs last week</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
