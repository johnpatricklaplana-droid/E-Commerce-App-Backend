import { Search, Filter, Calendar, ArrowUpDown, Download } from 'lucide-react';

export function FiltersToolbar() {
    return (
        <div className="sticky top-0 z-10 bg-[#F8FAFC] border-b border-[#E5E7EB] px-8 py-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                    {/* Search Orders */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-[280px] h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Order Status Filter */}
                    <select className="h-10 px-4 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208.825L1.175%204%202%203.175%206%207.175%2010%203.175%2010.825%204z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat">
                        <option>All Order Status</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>

                    {/* Payment Status Filter */}
                    <select className="h-10 px-4 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208.825L1.175%204%202%203.175%206%207.175%2010%203.175%2010.825%204z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat">
                        <option>All Payment Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Failed</option>
                        <option>Refunded</option>
                    </select>

                    {/* Return Status Filter */}
                    <select className="h-10 px-4 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208.825L1.175%204%202%203.175%206%207.175%2010%203.175%2010.825%204z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat">
                        <option>All Returns</option>
                        <option>No Returns</option>
                        <option>Requested</option>
                        <option>Approved</option>
                        <option>Completed</option>
                    </select>

                    {/* Date Range */}
                    <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] hover:bg-[#F9FAFB] transition-all flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#6B7280]" />
                        <span>Last 7 days</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Sort */}
                    <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] hover:bg-[#F9FAFB] transition-all flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4 text-[#6B7280]" />
                        <span>Sort by Date</span>
                    </button>

                    {/* Export */}
                    <button className="h-10 px-4 bg-[#111827] hover:bg-[#1F2937] text-white rounded-lg text-[14px] font-medium transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
