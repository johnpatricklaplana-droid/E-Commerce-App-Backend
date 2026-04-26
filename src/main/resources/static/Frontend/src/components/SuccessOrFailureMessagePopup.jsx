export default function SuccessOrFailureMessagePopup ({ message , open = true }) {
    return (
        <div className={`fixed ${open ? "opacity-100" : "opacity-0 -translate-y-1/6"} transition top-1/2 left-1/2 bg-black/80 px-8 py-4 rounded-2xl -translate-1/2 z-50`}>
            <h1 className="text-lg font-bold text-white">{message}</h1>
        </div>
    );
}