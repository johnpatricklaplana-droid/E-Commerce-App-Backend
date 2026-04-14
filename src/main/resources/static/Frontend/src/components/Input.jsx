import { Children } from "react";

export default function Input ({ 
    type="text", 
    children, 
    variant, 
    handleChange, 
    id, 
    fullWidth, 
    placeholder,
    height
}) {

    const variants = {
        default: "border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400",
        error: "border border-red-500 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400",
        success: "border border-green-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400",
        outline: "border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400",
        ghost: "border-0 border-b border-gray-300 rounded-none p-2 text-sm focus:outline-none focus:ring-0 focus:border-blue-400",
    };

    const width = fullWidth ? "w-full" : "w-auto";

    if(type === "text") {
        return (
            <input id={id} onChange={handleChange} placeholder={placeholder} className={`${variants[variant]} ${width}`} type={type} />
        );
    }

    if(type === "select") {
        return (
            <select id={id} onChange={handleChange} className={`${variants[variant]} ${width}`}>{children}</select>
        );
    }

    if(type === "textarea") {
        return (
            <textarea id={id} onChange={handleChange} className={`${variants[variant]} ${height} ${width}`}></textarea>
        );
    }

    if(type === "search") {
        return (
            <div className={`flex overflow-hidden gap-1.5 items-center border rounded border-slate-300 ${width}`}>
                <div className="px-3 py-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`${width} outline-0`}
                />
                <button className="hover:bg-blue-100 hover:scale-110 border-slate-400 px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        );
    }
}