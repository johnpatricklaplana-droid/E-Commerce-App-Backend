import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerAddProduct from "./pages/seller_add_product";
import SellerBusinessRegistrationFile from "./pages/sellerBusinessRegistrationFIle";
import SellerRegistrationFileStorage from "./pages/AdminSellerRegistrationFileStorage";
import SellerDashBoard from "./pages/SellerDashboard";
import Orders from "./pages/SellerOrders";
import SellerProducts from "./pages/SellerProducts";
import CostumerSignup from "./pages/CostumerSignup";
import AdminLogin from "./pages/AdminLogin";
import SellerAddProfilePic from "./pages/SellerAddProfilePic";
import SellerLogin from "./pages/SellerLogin";
import SellerSignup from "./pages/SellerSignup";
import CostumerLogin from "./pages/CostumerLogin";
import AddSellerBankAccount from "./pages/AddSellerBankAccount";
import ProductInspect from "./pages/ProductInspect";
import SellerProductInspect from "./pages/SellerProduct";
import CostumerFeed from "./pages/CostumerFeed";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/add-product" element={<SellerAddProduct/>} />
                <Route path="/add-business-registration-file" element={<SellerBusinessRegistrationFile/>} />
                <Route path="/business-registration-file-storage" element={<SellerRegistrationFileStorage/>} />
                <Route path="/seller-dashboard" element={<SellerDashBoard/>} />
                <Route path="/seller-orders" element={<Orders/>} />
                <Route path="/seller-products" element={<SellerProducts/>} />
                <Route path="/costumer-signup" element={<CostumerSignup/>} />
                <Route path="/admin-login" element={<AdminLogin/>} />
                <Route path="/seller-profile-picture" element={<SellerAddProfilePic/>} />
                <Route path="/seller-login" element={<SellerLogin/>} />
                <Route path="/seller-signup" element={<SellerSignup/>} />
                <Route path="/costumer-login" element={<CostumerLogin/>} />
                <Route path="/seller-bank-account" element={<AddSellerBankAccount/>} />
                <Route path="/costumer-product" element={<ProductInspect/>} />
                <Route path="/seller-product/:id" element={<SellerProductInspect/>} />
                <Route path="/costumer-feed" element={<CostumerFeed/>} />
            </Routes>
        </BrowserRouter>
    );
}