import { useEffect, useState } from "react";
import { GET } from "../api/API";
import { useNavigate } from "react-router-dom";
import { SellerOrderHeader } from "../components/SellerNavBar";
import ListOfSellerProducts from "../components/ListOfSellerProducts";
import GridOfSellerProducts from "../components/GridOfSellerProducts";
import { List, Package, Clock, CheckCircle2, AlertCircle, Filter, TrendingUp, TrendingDown, Search, Grid3X3 } from "lucide-react";

export default function SellerProducts () {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [gridOrList, setGridOrList] = useState("list");

    const stats = [
        { label: 'Total Orders', value: '2,847', icon: Package, change: '+12.5%', trend: 'up' },
        { label: 'Pending', value: '156', icon: Clock, change: '+4.2%', trend: 'up' },
        { label: 'Completed', value: '2,534', icon: CheckCircle2, change: '+8.1%', trend: 'up' },
        { label: 'Cancelled', value: '157', icon: AlertCircle, change: '-2.3%', trend: 'down' },
    ];

    useEffect(() => {
        const url = "http://localhost:8080/api/seller/product";

        const fetchProduct = async () => {
           const result = await GET(url);
           const cleanResult  = result.map(res => {
            console.log(result);
                return {
                    id: res.id,
                    thumbnail: res.thumbNailUrl,
                    product: res.productName,
                    price: res.price,
                    rating: { rating: res.ratings.rating, numberOfRaters: res.ratings.numberOfRaters },
                    categories: res.categories || [],
                    stock: res.stock,
                    sales: res.sales,
                    status: "TODO",
                    revenue: res.productRevenue
                }
           });
           setProducts(prev => [...prev, ...cleanResult]);
        }   
        
        fetchProduct();
    }, []);

    console.log(products);

    return (
        <div className="h-screen w-screen">
            <SellerOrderHeader currentTab={"products"}></SellerOrderHeader>
            <div className="h-full p-8 overflow-auto w-full">
                <span>Dashboard / </span>
                <span>Products</span>   
                <div className="w-full">
                    <div className="mb-6 mt-4">
                        <h1 className="mb-2 text-2xl font-bold">Products</h1>
                        <p>Manage your products inventory and pricing.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {
                            stats.map(stat => {
                                return (
                                    <div
                                        key={stat.label}
                                        className="shadow-sm rounded-2xl flex justify-between items-start p-4 ring-1 ring-black/5 bg-white"
                                    >
                                        <div>
                                            <p className="mb-4">{stat.label}</p>
                                            <p className="font-semibold mb-2 text-2xl">{stat.value}</p>
                                            <div className="flex gap-1">
                                                {stat.trend === 'up' ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
                                                <p className={`text-sm`}>
                                                    <span className={`font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
                                                    <span className="text-black ml-2">this month</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-600/5 p-2 rounded-2xl">
                                            {<stat.icon className="text-indigo-600" />}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="mt-8 ring-1 pb-4 ring-black/5 rounded-2xl shadow-sm">
                        <div className="overflow-hidden p-4 flex items-start gap-2">
                            <div className="flex pl-4 items-center w-full ring-1 ring-black/15 gap-2 focus-within:outline-2 rounded-2xl focus-within:outline-indigo-600">
                                <Search className="text-gray-400"></Search>
                                <input
                                    type="search"
                                    placeholder="search some"
                                    className="w-full py-2 rounded-2xl rounded-l-none outline-none"
                                />
                            </div>
                            <select 
                                className="py-2 px-4 focus:outline-2 focus:outline-indigo-600 rounded-2xl ring-1 ring-black/15"
                            >
                                <option value="">fkjafka</option>
                                <option value="">fkjafka</option>
                                <option value="">fkjafka</option>
                                <option value="">fkjafka</option>
                            </select>
                            <button className="hover:bg-gray-50 flex gap-1 ring-1 ring-black/15 px-4 py-2 rounded-2xl">
                                <Filter className=""></Filter>
                                <span className="">Filters</span>
                            </button>
                            <div className="flex items-center ring-1 gap-2 p-1 ring-black/15 bg-gray-100 rounded-lg">
                                <button 
                                    className={`p-1 ${gridOrList === "list" && 'shadow-sm bg-white'} cursor-pointer rounded-lg`}
                                    onClick={() => setGridOrList("list")}
                                >
                                    <List></List>
                                </button>
                                <button 
                                    className={`p-1 rounded-2xl ${gridOrList === "grid" && 'bg-white shadow-sm'} rounded-lg cursor-pointer`}
                                    onClick={() => setGridOrList("grid")}
                                >
                                    <Grid3X3></Grid3X3>
                                </button>
                            </div>
                        </div>
                        <div className="border-t mt-4 border-gray-200 grid grid-cols-3">
                            <div className="px-4 py-2 flex flex-col gap-2">
                                <label className="font-medium">Category</label>
                                <select className="ring-1 outline-0 ring-black/15 focus:ring-indigo-600 focus:ring-2 rounded-2xl px-4 py-2">
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                </select>
                            </div>
                            <div className="px-4 py-2 flex flex-col gap-2">
                                <label className="font-medium">Price range</label>
                                <select className="ring-1 outline-0 ring-black/15 focus:ring-indigo-600 focus:ring-2 rounded-2xl px-4 py-2">
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                </select>
                            </div>
                            <div className="px-4 py-2 flex flex-col gap-2">
                                <label className="font-medium">Stock status</label>
                                <select className="ring-1 outline-0 ring-black/15 focus:ring-indigo-600 focus:ring-2 rounded-2xl px-4 py-2">
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                    <option value="klfjaf">fafjksa</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {gridOrList === "list" && <ListOfSellerProducts products={products} />}
                    {gridOrList === "grid" && <GridOfSellerProducts products={products} /> }
                </div>
            </div>
        </div>
    );
}