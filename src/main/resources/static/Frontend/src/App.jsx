import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerAddProduct from "./components/seller_add_product";
import SellerBusinessRegistrationFile from "./components/sellerBusinessRegistrationFIle";
import SellerRegistrationFileStorage from "./components/AdminSellerRegistrationFileStorage";
import SellerDashBoard from "./components/SellerDashboard";
import Orders from "./components/SellerOrders";
import SellerProducts from "./components/SellerProducts";
import CostumerSignup from "./components/CostumerSignup";
import AdminLogin from "./components/AdminLogin";
import SellerAddProfilePic from "./components/SellerAddProfilePic";
import SellerLogin from "./components/SellerLogin";
import SellerSignup from "./components/SellerSignup";
import CostumerLogin from "./components/CostumerLogin";
import AddSellerBankAccount from "./components/AddSellerBankAccount";

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
            </Routes>
        </BrowserRouter>
    );
}