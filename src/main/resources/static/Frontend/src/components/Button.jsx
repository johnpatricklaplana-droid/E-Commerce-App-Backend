export default function Button({
    children,
    variant = "primary",
    onClick,
    type = "button",
    disabled = false, 
    fullWidth,
    bg,
    color,
    classList
}) {

    const baseStyle = "px-4 py-2 rounded font-medium";

    const variants = {
        primary: "text-white",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-500 text-gray-700",
        ghost: "text-gray-700 hover:bg-gray-100",
    };

    const width = fullWidth ? "w-full": "w-auto";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${classList} ${bg} ${variants[variant]} ${width}`}
        >
            {children}
        </button>
    );

}