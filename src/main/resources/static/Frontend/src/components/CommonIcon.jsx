export default function CommonSvgIcon ({
    type, 
    width="24", 
    height="24", 
    hover, 
    color,
    action,
    fill,
    classList
}) {
    
    const hovers = {
        grow: "hover:scale-110 transition duration-500"
    };

    if(type === "location") {
        return (
            <div>
                <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z" fill="#FF3B30" />
                    <circle cx="12" cy="10" r="3" fill="white" />
                </svg>
            </div>
        );
    }

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

    if(type === "home") {
        return (
            <svg 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                fill={fill}
                width={width}
                height={height}
            >
                <path d="M12 3l10 9h-3v9h-5v-6H10v6H5v-9H2z" />
            </svg>
        )
    }

    if(type === "search") {
        return (
            <button className={classList}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        )
    }

    if(type === "star") {
        return (
            <div className={classList}>
                <svg width="full" height="full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fff7b0" />
                            <stop offset="35%" stop-color="#ffd700" />
                            <stop offset="70%" stop-color="#ffb800" />
                            <stop offset="100%" stop-color="#ff8c00" />
                        </linearGradient>

                        <linearGradient id="shine" x1="0%" y1="0%" x2="200%" y2="0%">
                            <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                            <stop offset="45%" stop-color="rgba(255,255,255,0.6)" />
                            <stop offset="55%" stop-color="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                            <animateTransform
                                attributeName="gradientTransform"
                                type="translate"
                                from="-1 0"
                                to="1 0"
                                dur="2.2s"
                                repeatCount="indefinite" />
                        </linearGradient>

                        <filter id="glow">
                            <feGaussianBlur stdDeviation="0.8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <path d="M12 2
           L15 9
           L22 9.5
           L17 14
           L18.5 21.5
           L12 17.8
           L5.5 21.5
           L7 14
           L2 9.5
           L9 9"
                        fill="url(#goldGrad)"
                        stroke="#ffcc33"
                        strokeWidth="0.6"
                        filter="url(#glow)" />

                    <path d="M12 2
           L15 9
           L22 9.5
           L17 14
           L18.5 21.5
           L12 17.8
           L5.5 21.5
           L7 14
           L2 9.5
           L9 9"
                        fill="url(#shine)"
                        opacity="0.6" />
                </svg>
            </div>
        );
    }

    if(type === "xbutton") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
                <path
                    d="M5 5 L19 19 M19 5 L5 19"
                    stroke="currentColor"
                    fill={fill}
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
        );
    }

}