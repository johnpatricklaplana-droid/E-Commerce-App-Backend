import { useEffect, useState } from 'react';
import CostumerNavBar from '../components/CostumerNavBar';
import { PurchasesPage } from '../components/PurchasesPage';
import { GET } from '../api/API';

export default function CostumerOrder() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        
        const getOrders = async () => {
            const url = "http://localhost:8080/api/costumer/orders"

            const result = await GET(url);
            setOrders(result);
        }

        getOrders();

    }, []);

    console.log(orders);

    return (
        <div className="min-h-screen bg-gray-50">
            <CostumerNavBar />
            <PurchasesPage orders={orders} />
        </div>
    );
}