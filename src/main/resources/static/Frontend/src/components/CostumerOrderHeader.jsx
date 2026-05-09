import { Search, Bell, ChevronDown } from 'lucide-react';

export function SellerOrderHeader() {
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[32px] font-semibold text-[#111827] tracking-tight">Orders</h1>
                    <p className="text-[15px] text-[#6B7280] mt-1">Manage incoming customer purchases</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Global Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                            type="text"
                            placeholder="Search orders, products, customers..."
                            className="w-[400px] h-11 pl-12 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[15px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative w-11 h-11 flex items-center justify-center bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl transition-all">
                        <Bell className="w-5 h-5 text-[#6B7280]" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <button className="flex items-center gap-3 h-11 px-4 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl transition-all">
                        <img
                            src="https://i.pravatar.cc/150?img=33"
                            alt="Profile"
                            className="w-7 h-7 rounded-full ring-2 ring-white"
                        />
                        <span className="text-[15px] font-medium text-[#111827]">John Seller</span>
                        <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                </div>
            </div>
        </header>
    );
}
