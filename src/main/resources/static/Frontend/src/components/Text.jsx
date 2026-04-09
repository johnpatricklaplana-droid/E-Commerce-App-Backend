export default function Text ({variant, children, position, color}) {
    const variants = {
        heading1: "text-4xl font-bold text-gray-900",
        heading2: "text-3xl font-semibold text-gray-800",
        heading3: "text-2xl font-semibold text-gray-700",
        body: "text-base text-gray-700",
        bold: "text-lg font-bold",
        small: "text-sm text-gray-600",
        semiSmall: "text-[14px] font-semibold",
        label: "text-sm font-medium text-gray-800 uppercase",
        muted: "text-sm text-gray-500",
        error: "text-sm text-red-600 font-medium",
        info: "text-sm text-blue-600 font-medium",
    };

    const colors = {
        orange: "text-orange-700"
    }

    const positions = {
        center: "text-center",
        start: "text-start",
        end: "text-end"
    };

    return (
        <p className={`${variants[variant]} ${colors[color]} ${positions[position]}`}>{children}</p>
    );
}