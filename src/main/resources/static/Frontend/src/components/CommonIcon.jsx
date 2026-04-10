export default function CommonSvgIcon ({ type, width="24", height="24", hover }) {
    
    const hovers = {
        grow: "hover:scale-110 transition duration-500"
    };

    if(type === "threeDot") {
        return (
            <button className={`${hovers[hover]}`}>
                <svg width={width} height={height} viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                </svg>
            </button>
        );
    }

}