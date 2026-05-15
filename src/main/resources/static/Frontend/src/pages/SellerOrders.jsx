import { SellerOrderHeader } from '../components/SellerNavBar';
import { KPICards } from '../components/KPICards';
import { FiltersToolbar } from '../components/FiltersToolbar';
import { OrdersList } from '../components/OrderList';
import { OrderDetailsDrawer } from '../components/OrderDetailsDrawer';
import { useEffect, useState } from 'react';
import { GET } from '../api/API';

const mockOrders = [
    {
        id: '1',
        orderNumber: 'ORD-2024-0847',
        product: {
            name: 'Premium Wireless Headphones',
            description: 'Active noise cancellation with premium sound quality',
            variant: 'Pro Max Edition',
            color: 'Midnight Black',
            colorHex: '#1a1a1a',
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
            ],
            price: 349.99,
        },
        customer: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            avatar: 'https://i.pravatar.cc/150?img=1',
            location: 'San Francisco, CA',
        },
        date: 'May 9, 2026',
        time: '10:24 AM',
        orderStatus: 'pending',
        paymentStatus: 'paid',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 9, 2026 10:24 AM',
            paid: 'May 9, 2026 10:24 AM',
        },
    },
    {
        id: '2',
        orderNumber: 'ORD-2024-0846',
        product: {
            name: 'Minimalist Leather Backpack',
            description: 'Handcrafted genuine leather with laptop compartment',
            variant: 'Standard Size',
            color: 'Cognac Brown',
            colorHex: '#8B4513',
            images: [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400',
            ],
            price: 189.00,
        },
        customer: {
            name: 'Michael Chen',
            email: 'm.chen@example.com',
            avatar: 'https://i.pravatar.cc/150?img=12',
            location: 'New York, NY',
        },
        date: 'May 9, 2026',
        time: '09:15 AM',
        orderStatus: 'processing',
        paymentStatus: 'paid',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 9, 2026 09:15 AM',
            paid: 'May 9, 2026 09:15 AM',
            processing: 'May 9, 2026 09:30 AM',
        },
    },
    {
        id: '3',
        orderNumber: 'ORD-2024-0845',
        product: {
            name: 'Smart Fitness Watch',
            description: 'Advanced health tracking with GPS and heart rate monitor',
            variant: 'Sport Edition',
            color: 'Ocean Blue',
            colorHex: '#0077BE',
            images: [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
            ],
            price: 279.99,
        },
        customer: {
            name: 'Emma Rodriguez',
            email: 'emma.r@example.com',
            avatar: 'https://i.pravatar.cc/150?img=5',
            location: 'Austin, TX',
        },
        date: 'May 8, 2026',
        time: '04:32 PM',
        orderStatus: 'shipped',
        paymentStatus: 'paid',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 8, 2026 04:32 PM',
            paid: 'May 8, 2026 04:32 PM',
            processing: 'May 8, 2026 05:00 PM',
            shipped: 'May 9, 2026 08:00 AM',
        },
    },
    {
        id: '4',
        orderNumber: 'ORD-2024-0844',
        product: {
            name: 'Organic Cotton T-Shirt',
            description: 'Sustainable fashion with premium comfort',
            variant: 'Classic Fit',
            color: 'Forest Green',
            colorHex: '#228B22',
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
            ],
            price: 45.00,
        },
        customer: {
            name: 'David Park',
            email: 'david.park@example.com',
            avatar: 'https://i.pravatar.cc/150?img=14',
            location: 'Seattle, WA',
        },
        date: 'May 8, 2026',
        time: '02:18 PM',
        orderStatus: 'delivered',
        paymentStatus: 'paid',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 8, 2026 02:18 PM',
            paid: 'May 8, 2026 02:18 PM',
            processing: 'May 8, 2026 03:00 PM',
            shipped: 'May 8, 2026 06:00 PM',
            delivered: 'May 9, 2026 11:30 AM',
        },
    },
    {
        id: '5',
        orderNumber: 'ORD-2024-0843',
        product: {
            name: 'Ceramic Coffee Mug Set',
            description: 'Artisan handmade ceramic set of 4 mugs',
            variant: 'Set of 4',
            color: 'Matte White',
            colorHex: '#F5F5F5',
            images: [
                'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
                'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400',
            ],
            price: 68.00,
        },
        customer: {
            name: 'Jessica Williams',
            email: 'j.williams@example.com',
            avatar: 'https://i.pravatar.cc/150?img=9',
            location: 'Portland, OR',
        },
        date: 'May 8, 2026',
        time: '11:45 AM',
        orderStatus: 'pending',
        paymentStatus: 'pending',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 8, 2026 11:45 AM',
            paid: '',
        },
    },
    {
        id: '6',
        orderNumber: 'ORD-2024-0842',
        product: {
            name: 'Designer Sunglasses',
            description: 'UV protection with polarized lenses',
            variant: 'Aviator Style',
            color: 'Gold Frame',
            colorHex: '#FFD700',
            images: [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
            ],
            price: 159.99,
        },
        customer: {
            name: 'Alex Thompson',
            email: 'alex.t@example.com',
            avatar: 'https://i.pravatar.cc/150?img=7',
            location: 'Miami, FL',
        },
        date: 'May 7, 2026',
        time: '03:22 PM',
        orderStatus: 'delivered',
        paymentStatus: 'paid',
        returnStatus: 'requested',
        timeline: {
            ordered: 'May 7, 2026 03:22 PM',
            paid: 'May 7, 2026 03:22 PM',
            processing: 'May 7, 2026 04:00 PM',
            shipped: 'May 7, 2026 07:30 PM',
            delivered: 'May 8, 2026 02:15 PM',
        },
    },
    {
        id: '7',
        orderNumber: 'ORD-2024-0841',
        product: {
            name: 'Wireless Charging Pad',
            description: 'Fast charging for all Qi-enabled devices',
            variant: 'Dual Charger',
            color: 'Space Gray',
            colorHex: '#8E8E93',
            images: [
                'https://images.unsplash.com/photo-1591290619762-c588f0fc1d9e?w=400',
                'https://images.unsplash.com/photo-1635514569146-9a9607ecf303?w=400',
            ],
            price: 49.99,
        },
        customer: {
            name: 'Ryan Martinez',
            email: 'ryan.m@example.com',
            avatar: 'https://i.pravatar.cc/150?img=13',
            location: 'Denver, CO',
        },
        date: 'May 7, 2026',
        time: '10:08 AM',
        orderStatus: 'shipped',
        paymentStatus: 'paid',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 7, 2026 10:08 AM',
            paid: 'May 7, 2026 10:08 AM',
            processing: 'May 7, 2026 11:00 AM',
            shipped: 'May 7, 2026 03:00 PM',
        },
    },
    {
        id: '8',
        orderNumber: 'ORD-2024-0840',
        product: {
            name: 'Yoga Mat Premium',
            description: 'Extra thick non-slip exercise mat',
            variant: 'Extra Large',
            color: 'Purple',
            colorHex: '#800080',
            images: [
                'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
                'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400',
            ],
            price: 79.00,
        },
        customer: {
            name: 'Sophia Lee',
            email: 'sophia.lee@example.com',
            avatar: 'https://i.pravatar.cc/150?img=10',
            location: 'Los Angeles, CA',
        },
        date: 'May 6, 2026',
        time: '05:55 PM',
        orderStatus: 'cancelled',
        paymentStatus: 'refunded',
        returnStatus: 'none',
        timeline: {
            ordered: 'May 6, 2026 05:55 PM',
            paid: 'May 6, 2026 05:55 PM',
        },
    },
];

export default function SellerOrders () {

    const [orders, setOrders] = useState([]);

    const [drawerPosition, setDrawerPosition] = useState("translate-x-[100%]");
    const [hideOverlay, setHideOverlay] = useState("opacity-0 pointer-events-none");
    const [selectedOrderRealone, setSelectedOrderRealone] = useState({});
    const [statsPercent, setStatsPercent] = useState({});

    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        paidOrders: 0,
        revenue: 0,
        returns: 0
    });

    useEffect(() => {
        
        const getOrder = async () => {
            const url = "http://localhost:8080/api/seller/orders";

            const result = await GET(url);
            console.log(result);

            const paidOne = result.filter(res => res.paymentStatus === "paid");

            const totalOrders = result.length;
            const pendingOrders = result.filter(res => res.orderStatus === "PENDING").length;
            const paidOrders = paidOne.length;
            const revenue = paidOne.map(res => res.variations.price * res.quantity).reduce((acc, item) => {return Number(acc) + Number(item)}, [0]);
            const returns = result.filter(res => res.returnStatus === "RETURNED").length;
        
            setStats({
                totalOrders: totalOrders,
                pendingOrders: pendingOrders,
                paidOrders: paidOrders,
                revenue: revenue,
                returns: returns
            });

            setOrders(result);
        }

        const getSellerOrderStats = async () => {
            const url = "http://localhost:8080/api/seller/orders/stats";

            const result = await GET(url);
            console.log(result);
            setStatsPercent(result);
        }

        getOrder();
        getSellerOrderStats();
        
    }, []);

    console.log(stats);

    const openDrawer = (orderId) => {

        const orderOpenInDrawer = orders.find(ord => ord.orderId === orderId);

        setSelectedOrderRealone(orderOpenInDrawer);

        setDrawerPosition("translate-x-0");
        setHideOverlay("opacity-100 pointer-events-auto");

    };

    const closeDrawer = () => {
        setDrawerPosition("translate-x-[100%]");
        setHideOverlay("opacity-0 pointer-events-none");
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <SellerOrderHeader currentTab={"orders"} />
            <KPICards stats={statsPercent} orders={stats} />
            <FiltersToolbar />
            <OrdersList onOrderClick={openDrawer} orders={orders} />
            <OrderDetailsDrawer onClose={closeDrawer} overlayHide={hideOverlay} position={drawerPosition} order={selectedOrderRealone} />
        </div>
    );
}