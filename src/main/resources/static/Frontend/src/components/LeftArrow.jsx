export default function LeftArrow ({className = "w-7 h-7", label, hover}) {

    const hovers = {
        grow: "hover:scale-110 transition duration-400"
    };

    return (

        <button 
            className={`flex items-center ${hovers[hover]}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={className}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            <span>{label}</span>
        </button>
    );
}