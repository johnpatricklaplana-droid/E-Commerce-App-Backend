import CommonSvgIcon from "./CommonIcon";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { useEffect, useState } from "react";
import { GET } from "../api/API";
import LogoutOrSignupPopup from "./LogouOrSIgnupPopup";
import { Search, ShoppingCart, User, Package } from 'lucide-react';
import { IconButton, Avatar, Menu, MenuItem, Badge, InputBase } from '@mui/material';

export default function CostumerNavBar({ cartItemsCount }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const [loginPopup, setLoginPopup] = useState(false);

    const navigate = useNavigate();

    const home = () => {
        navigate("/costumer-feed");
    }

    const close = () => {
        setLoginPopup(false);
    };

    const open = () => {
        setLoginPopup(true);
        handleClose();
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {loginPopup === true && <LogoutOrSignupPopup onClick={close}></LogoutOrSignupPopup>}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Package className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">ShopHub</span>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <a href="/costumer-feed" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Shop
                            </a>
                            <a href="/costumer-orders" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-[22px] -mb-[1px]">
                                My Purchases
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Support
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
                            <Search className="w-4 h-4 text-gray-500" />
                            <InputBase
                                placeholder="Search products or orders..."
                                value="kljfklasf"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 text-sm"
                                sx={{ fontSize: '14px' }}
                            />
                        </div>

                        <IconButton onClick={() => (navigate("/costumer-cart"))} size="medium">
                            <Badge badgeContent={cartItemsCount} color="primary">
                                <ShoppingCart className="w-5 h-5 text-gray-700" />
                            </Badge>
                        </IconButton>

                        <IconButton onClick={handleProfileClick} size="medium">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                                <User className="w-4 h-4" />
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={open}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </nav>
    );
}