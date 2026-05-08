import { useState } from 'react';
import { Search, Filter, Package } from 'lucide-react';
import { InputBase, Select, MenuItem, FormControl } from '@mui/material';
import CostumerOrderBox from '../pages/CostumersOrderBox';

export function PurchasesPage({orders}) {

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All orders');


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Purchases</h1>
                    <p className="text-gray-600">Track and manage your order history</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Search */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md">
                            <Search className="w-4 h-4 text-gray-500" />
                            <InputBase
                                placeholder="Search by product name or order ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 text-sm"
                                sx={{ fontSize: '14px' }}
                            />
                        </div>

                        {/* Filter */}
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <Select
                                value={statusFilter}
                                displayEmpty
                                startAdornment={<Filter className="w-4 h-4 text-gray-500 mr-2" />}
                                sx={{ fontSize: '14px' }}
                            >
                                <MenuItem value="All orders">All orders</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length > 0 ? (
                    <div className="space-y-4 mb-8">
                        {orders.map((order) => (
                            <CostumerOrderBox key={"kfljaf"} order={order}></CostumerOrderBox>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No purchases yet</h3>
                        <p className="text-gray-600 mb-6">When you make a purchase, it will appear here.</p>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Start Shopping
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-center gap-2">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors 'bg-blue-600 text-white' 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {2}
                        </button>
                    </div>
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
