export default function DeleteConfimationPopup ({ open, cancel, confirm }) {
    return (
        <div className={`fixed h-screen w-screen ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition duration-500 bg-black/60 z-1000`}>
            <div className={`fixed flex rounded-2xl flex-col items-center justify-center gap-3 ${open ? "opacity-100 top-1/2 pointer-events-auto" : "opacity-0 top-[-10%] pointer-events-none"} left-1/2 transition-all duration-500 -translate-1/2 px-16 py-8 bg-orange-500`}>
                <h1 className="text-2xl text-white font-semibold">Are you sure about this??</h1>
                <div className="flex gap-3">
                    <button onClick={cancel} className="px-3 font-bold hover:bg-blue-400 cursor-pointer py-1.5 bg-blue-300">No way</button>
                    <button onClick={confirm} className="px-3 font-bold hover:bg-red-600 cursor-pointer py-1.5 bg-green-500">Super sure</button>
                </div>
            </div>
        </div>
    );
}