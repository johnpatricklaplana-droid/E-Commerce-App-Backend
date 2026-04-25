import { useNavigate } from "react-router-dom";

export default function CostumerLoginPopup ({ noWay }) {

    const navigate = useNavigate();

    const login = () => {
        navigate("/costumer-login");
    };

    return (
        <div 
            className="absolute top-0 left-0 z-40 h-full w-screen bg-black/50"
            onClick={noWay}
        >
            <div 
                className="fixed left-1/2 w-full z-50 bg-white p-7 rounded-2xl flex flex-col items-center sm:w-[360px] top-1/2 space-y-3 -translate-1/2"
                onClick={(e) => e.stopPropagation()}
            >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" fill="#FCE7EF" />

                    <path d="M35 45H40L45 70H75L85 50H48" stroke="#EC4899" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

                    <circle cx="50" cy="80" r="4" fill="#EC4899" />
                    <circle cx="72" cy="80" r="4" fill="#EC4899" />

                    <rect x="68" y="52" width="20" height="18" rx="4" fill="#EC4899" />

                    <path d="M72 52V48C72 44.7 74.7 42 78 42C81.3 42 84 44.7 84 48V52"
                        stroke="#EC4899" stroke-width="3" stroke-linecap="round" />

                    <circle cx="78" cy="61" r="2" fill="white" />
                    <rect x="77" y="61" width="2" height="5" fill="white" />
                </svg>
                <div>
                    <h1 className="text-2xl text-center font-bold">Please log in to</h1>
                    <h1 className="text-2xl text-center font-bold">add items to your cart</h1>
                </div>
                <p className="text-gray-400 text-center text-sm max-w-[70%]">Looks like you're not logged in yet. Log in to continue shopping and add items to your cart.</p>
                <button onClick={login} className="p-1.5 hover:bg-pink-600 bg-pink-500 active:scale-95 transition cursor-pointer text-white font-bold w-full rounded-[0.8rem]">Login</button>
                <button className="p-1.5 border-gray-400 active:scale-95 cursor-pointer transition border-2 w-full font-bold text-pink-500 rounded-[0.8rem]">Create account</button>
                <button onClick={noWay} className="cursor-pointer">No way</button>
            </div>
        </div>
    );
}