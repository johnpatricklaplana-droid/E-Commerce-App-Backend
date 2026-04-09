import { Children } from "react";

export default function Input ({ type="text", children, variant, handleChange, id, fullWidth, placeholder}) {

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
            <textarea id={id} onChange={handleChange} className={`${variants[variant]} ${width}`}></textarea>
        );
    }
}