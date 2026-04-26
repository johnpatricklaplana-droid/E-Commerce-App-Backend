import { useNavigate } from "react-router-dom";

export default function LogoutOrSignupPopup ({ onClick }) {

    const navigate  = useNavigate();

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black/50"
            onClick={onClick}
        >
            <div className="bg-white fixed shadow right-10 top-10 w-fit flex items-center flex-col gap-3 p-[2rem]"
            onClick={(e) => e.stopPropagation()}
        >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt=""
                    className="w-[64px] h-[64px]"
                />
                <h1 className="text-lg">Welcome!</h1>
                <p className="text-sm">Sign in to access your account and explore more</p>
                <div className="w-full">
                    <button 
                        className="w-full py-1.5 text-white font-bold cursor-pointer hover:bg-orange-600 mb-3 bg-orange-500"
                        onClick={() => (navigate("/costumer-login"))}
                    >
                        console.Log in
                    </button>
                    <button className="w-full py-1.5 text-white font-bold cursor-pointer hover:bg-green-600 bg-green-500">Create account</button>
                </div>
            </div>
        </div>
    );
}