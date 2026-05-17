import { Star, Edit, Copy, Trash2, MoreVertical } from "lucide-react";

export default function ListOfSellerProducts ( {products} ) {
    return (
        <div className="w-full mt-8 shadow-sm overflow-x-auto ring-1 ring-black/5 rounded-2xl">
            <table
                className="w-full rounded-2xl overflow-hidden"
            >
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tBody>
                    {products.map(prod =>
                        <tr
                            className="px-6 py-4 hover:bg-gray-50"
                            key={prod.price}
                        >
                            <td className="text-start px-6 py-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </td>
                            <td className="text-start px-6 shrink-0 py-4 flex items-center gap-2">
                                <img
                                    src={`http://localhost:8080/api/public/product-image/${prod.thumbnail}`}
                                    className="w-16 h-16 shrink-0"
                                />
                                <div>
                                    <h1 className="font-medium">{prod.product}</h1>
                                    <div className="flex mt-1 gap-1 items-center">
                                        <Star className="text-yellow-500"></Star>
                                        <p className="text-sm text-gray-500">{prod.rating.rating} ({prod.rating.numberOfRaters})</p>
                                    </div>
                                </div>
                            </td>
                            <td className="text-start px-6 py-4">#{prod.id}</td>
                            <td className="text-start px-6 py-4">{prod.categories?.map((cat, i) => { if (prod.categories.length - 1 === i) {return cat.categoryName} if (prod.categories.length === 1) {return cat.categoryName} else {return cat.categoryName + ", "}})}</td>
                            <td className="text-start px-6 py-4 text-lg font-semibold">${prod.price.toLocaleString()}</td>
                            <td className="text-start px-6 py-4 text-green-500 font-medium">{prod.stock} units</td>
                            <td className="text-start px-6 py-4">
                                <p className="font-medium">{prod.sales} sold</p>
                                <p className="text-gray-500 text-sm">${prod.revenue.toLocaleString()}</p>
                            </td>
                            <td className="text-start px-6 py-4"><p className="text-emerald-700 font-bold bg-emerald-200 rounded-2xl px-4">Active</p></td>
                            <td className="text-start px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tBody>
            </table>
        </div>
    );
}