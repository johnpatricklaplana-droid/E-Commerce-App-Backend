export default function CommonSvgIcon ({
    type, 
    width="24", 
    height="24", 
    hover, 
    color,
    action,
    fill
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

    if(type === "heart") {
        return (
            <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 6 4 4 6.5 4
                8.24 4 9.91 5.01 10.6 6.5
                11.29 5.01 12.96 4 14.7 4
                17.2 4 19.2 6 19.2 8.5
                19.2 12.28 15.8 15.36 10.65 20.04
                L12 21.35z"/>
            </svg>
        );
    }

}