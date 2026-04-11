export default function CommonSvgIcon ({
    type, 
    width="24", 
    height="24", 
    hover, 
    color,
    action 
}) {
    
    const hovers = {
        grow: "hover:scale-110 transition duration-500"
    };

    if(type === "threeDot") {
        return (
            <button className={`${hovers[hover]}`}>
                <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                </svg>
            </button>
        );
    }

    if(type === "menu") {
        return (
            <button onClick={action} className={`cursor-pointer ${hovers[hover]}`}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill={color} viewBox="0 0 24 24" stroke={color}
                    width={width}
                    height={height}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        );
    }

}