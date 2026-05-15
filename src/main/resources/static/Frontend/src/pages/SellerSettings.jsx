import { useEffect, useState } from "react";
import { SellerOrderHeader } from "../components/SellerNavBar";
import {
    User,
    Store,
    Shield,
    CreditCard,
    Bell,
    Truck,
    Settings as SettingsIcon,
    Upload,
    Globe,
    Camera,
    Briefcase,
    Share2,
    // MapPin,
    Mail,
    Phone,
    Clock,
    Building,
    // Building2,
    FileText,
    Badge,
    // X,
    Check
} from 'lucide-react';
import { GET } from "../api/API";

export default function SellerSettings () {

    const [activeTab, setActiveTab] = useState("");
    const [seller, setSeller] = useState({});

    const [formData, setFormData] = useState({}); 

    const settingsTabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'store', label: 'Store Information', icon: Store },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'payment', label: 'Payment & Payouts', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'shipping', label: 'Shipping Settings', icon: Truck },
        { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    ];

    useEffect(() => {

        async function getSellerInfo() {
            const url = "http://localhost:8080/api/seller";

            const result = await GET(url);
            console.log(result);
            setSeller(result);
            setFormData(result);
        };

        getSellerInfo();

    }, []);

    const handleChange = (e) => {
        const { value, id } = e.target;

        setFormData(prev => ({...prev, [id]: value}));
    };

    console.log(formData);

    return (
        <div>
            <SellerOrderHeader currentTab={"settings"} />
            <div className="p-12">
                <div>
                    <span>Settings / </span>
                    <span>Profile</span>
                </div>

                <h1 className="font-semibold mt-6 text-[32px]">Profile Settings</h1>
                <p className="text-base">Manage your personal and store information</p>

                <div
                    className="grid grid-cols-1 ring-1 ring-gray-200 mt-8 gap-4 shadow-sm border-gray-200 rounded-2xl sm:grid-cols-2 p-8"
                >
                    {settingsTabs.map(setTab => {
                        const isActive = setTab.id === activeTab;
                        const Icon = setTab.icon;
                        return (
                            <button
                                key={setTab.id}
                                className={`${isActive 
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } flex gap-2 items-center p-4 rounded-2xl`}
                                onClick={() => setActiveTab(setTab.id)}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{setTab.id}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="mt-8 mb-8 ring-1 p-8 ring-gray-200 shadow-sm rounded-[16px]">
                    <h1 className="text-lg font-semibold mb-6">Personal profile</h1>
                    <label className="font-medium text-gray-600">Profile picture</label>
                    <div className="flex mt-2 mb-4 items-center gap-4">
                        <img className="w-24 h-24 rounded-[50%]" src="https://picsum.photos/200/300?random=1" />
                        <div className="space-x-2">
                            <button className="bg-gradient-to-br ring-1 ring-blue-500 cursor-pointer rounded-2xl px-4 py-2 from-indigo-500 to-indigo-600 text-white font-semibold">Upload</button>
                            <button className="ring-1 ring-gray-200 cursor-pointer px-4 py-2 rounded-2xl">Change</button>
                        </div>
                    </div>
                    <div className="w-full grid gap-4 grid-cols-2">
                        <div className="flex gap-2 flex-col">
                            <label className="font-medium text-gray-600">Full name</label>
                            <div className="grid relative gap-4 grid-cols-2">
                                <div className="w-full gap-2 focus-within:ring-blue-600 focus-within:ring-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                    <User className="text-gray-400" />
                                    <input 
                                        className="outline-none pl-0 p-4" 
                                        type="text" 
                                        value={formData.firstName} 
                                        placeholder="first name"
                                        id="firstName"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                    <User className="text-gray-400" />
                                    <input 
                                        className="outline-none pl-0 p-4" 
                                        type="text" 
                                        value={formData.lastName} 
                                        placeholder="last name" 
                                        onChange={handleChange}
                                        id="lastName"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 relative  flex-col">
                            <label htmlFor="">Email address</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Mail className="text-gray-400" />
                                <input className="outline-none w-full pl-0 p-4" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">Phone number</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Phone className="text-gray-400" />
                                <input className="outline-none w-full pl-0 p-4" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">Timezone</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Clock className="text-gray-400" />
                                <input className="outline-none w-full p-4 pl-0" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="flex col-span-2 gap-2 flex-col">
                            <label className="font-medium text-gray-600">About seller</label>
                            <textarea className="outline-blue-600 p-4 ring-1 ring-gray-400 rounded-2xl" name="" id=""></textarea>
                        </div>
                    </div>
                </div>
                <div className="p-8 shadow-sm rounded-2xl ring-1 ring-gray-200">
                    <h1 className="text-lg mb-6 font-semibold">Store Information</h1>
                    <p className="mb-4">store logo</p>
                    <div 
                        className="border-2 rounded-2xl flex mb-8 items-center flex-col p-8 w-full h-full border-gray-400 border-dashed"
                    >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-center text-gray-600">Drag and drop your logo here, or click bo browse</p>
                        <p className="text-center text-gray-400">PNG, JPG up to 5mb</p>
                        <label className="bg-gradient-to-br mt-4 from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-2xl font-medium" htmlFor="storeLogoInput">Choose file</label>
                    </div>
                    <input type="file" hidden id="storeLogoInput" />
                    <div className="w-full grid gap-4 grid-cols-2">
                        <div className="flex gap-2 flex-col">
                            <label className="font-medium text-gray-600">Store name</label>
                            <div className="w-full gap-2 focus-within:ring-blue-600 focus-within:ring-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Store className="text-gray-400" />
                                <input className="outline-none w-full p-4 pl-0" type="text" placeholder="johny hey daddy store" />
                            </div>
                        </div>
                        <div className="flex gap-2 relative  flex-col">
                            <label htmlFor="">Store URL</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Globe className="text-gray-400" />
                                <input className="outline-none p-4 pl-0 w-full" type="text" placeholder="Store URl" />
                            </div>
                        </div>
                        <div className="flex col-span-2 gap-2 flex-col">
                            <label className="font-medium text-gray-600">Store description</label>
                            <textarea className="outline-blue-600 p-4 ring-1 ring-gray-400 rounded-2xl" name="" id=""></textarea>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">Business Category</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 ring-gray-400 rounded-2xl flex">
                                <Building className="text-gray-400 ml-4 absolute" />
                                <select className="pl-12 outline-none w-full p-4 appearance-none" type="text" placeholder="last name">
                                    <option value="fkjakls">klajflks</option>
                                    <option value="hola">hola</option>
                                    <option value="fkjakls">klajflks</option>
                                    <option value="fkjakls">klajflks</option>
                                    <option value="fkjakls">klajflks</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">Business registration number</label>
                            <div className="w-full pl-4 focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 ring-gray-400 rounded-2xl flex">
                                <FileText className="text-gray-400" />
                                <input className="outline-none pl-0 w-full p-4" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="mb-4">
                                <span className="font-medium">Seller badge / </span>
                                <span className="font-medium">status</span>
                            </div>
                            <div className="flex p-6 items-center gap-4 bg-emerald-200/30 ring-1 sm:w-[700px] w-full ring-emerald-200 rounded-2xl">
                                <Badge className="text-emerald-600" />
                                <div>
                                    <h1 className="font-medium text-emerald-900 text-lg">Verified Seller</h1>
                                    <p className="text-emerald-600">Your store has been Verified and is in good standing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 ring-1 ring-gray-200 rounded-2xl mt-8">
                    <h1 className="mb-6 text-lg font-semibold">Social & Contact Links</h1>
                    <div className="w-full grid gap-4 grid-cols-2">
                        <div className="flex gap-2 flex-col">
                            <label className="font-medium text-gray-600">Website</label>
                            <div className="w-full gap-2 focus-within:ring-blue-600 focus-within:ring-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Globe className="text-gray-400" />
                                <input className="outline-none w-full p-4 pl-0" type="text" placeholder="https://yourwebsite.com" />
                            </div>
                        </div>
                        <div className="flex gap-2 relative  flex-col">
                            <label htmlFor="">Instagram</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 pl-4 ring-gray-400 rounded-2xl flex">
                                <Camera className="text-gray-400" />
                                <input className="outline-none p-4 pl-0 w-full" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">Facebook</label>
                            <div className="w-full focus-within:ring-blue-600 focus-within:ring-2 pl-4 gap-2 items-center ring-1 ring-gray-400 rounded-2xl flex">
                                <Share2 className="text-gray-400" />
                                <input className="outline-none w-full pl-0 p-4" type="text" placeholder="last name" />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="">LinkedIn</label>
                            <div className="w-full pl-4 focus-within:ring-blue-600 focus-within:ring-2 gap-2 items-center ring-1 ring-gray-400 rounded-2xl flex">
                                <Briefcase className="text-gray-400" />
                                <input className="outline-none pl-0 w-full p-4" type="text" placeholder="last name" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="flex justify-between ring-1 ring-gray-200 p-6 bg-white items-center sticky bottom-0">
                <p>Last updated 2 minutes ago</p>
                <div className="flex gap-2">
                    <button className="ring-1 cursor-pointer ring-gray-200 rounded-2xl px-4 py-2">Cancel</button>
                    <button className="flex items-center gap-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer ring-1 ring-gray-200 px-4 py-2 rounded-2xl">
                        <Check className="w-5 h-5"></Check>
                        Save Changes
                    </button>
                </div>
            </footer>
        </div>
    );
}