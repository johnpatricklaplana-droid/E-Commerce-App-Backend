import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Layers,
    Users,
    BarChart3,
    Megaphone,
    Wallet,
    Settings,
    Search,
    Bell,
    Plus,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';

export function SellerOrderHeader( {currentTab} ) {

    const navigation = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const navTabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigateTo: "" },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, navigateTo: "/seller-orders" },
        { id: 'products', label: 'Products', icon: Package, navigateTo: "" },
        { id: 'inventory', label: 'Inventory', icon: Layers, navigateTo: "" },
        { id: 'customers', label: 'Customers', icon: Users, navigateTo: "" },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, navigateTo: "" },
        { id: 'marketing', label: 'Marketing', icon: Megaphone, navigateTo: "" },
        { id: 'finance', label: 'Finance', icon: Wallet, navigateTo: "" },
        { id: 'settings', label: 'Settings', icon: Settings, navigateTo: "/seller-settings" },
    ];
    const [activeTab, setActiveTab] = useState(currentTab);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateABit = (navigateTo) => {
        navigation(navigateTo);
    };

    return (
        <nav 
            className={`sticky top-0 z-50 p-6 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'border-b border-[#E5E7EB]'}`}
        >
            <div className='flex items-center m-auto px-6'>
                <div className="flex items-center gap-6">
                    <div className='flex gap-3 items-center'>
                        <div className='bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-[8px]'>
                            <Package className='text-white w-5 w-5'></Package>
                        </div>
                        <span className='text-xl font-semibold text-gray-900'>SellerHub</span>
                    </div>
                    <div className="hidden lg:block w-px h-8 bg-gray-200" />
                </div>

                <div 
                    className="hidden shrink-0 sm:flex overflow-x-scroll border-r border-gray-200 cursor-pointer max-w-full items-center gap-2 flex-1"
                >
                    {navTabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => navigateABit(tab.navigateTo)}
                                className={`
                                    flex  items-center gap-2 px-4 py-2 rounded-2xl
                                    ${isActive ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                                `}
                            >
                            <Icon className='w-4 h-4' />
                            <span className='text-sm font-medium'>{tab.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center gap-4">  

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Quick Actions */}
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">New Product</span>
                    </button>

                    {/* Profile Menu */}
                    <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                            JS
                        </div>
                        <div className="hidden xl:flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">John Seller</span>
                            <span className="text-xs text-gray-500">John's Store</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 py-4 space-y-1">
                        {navTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                    `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
