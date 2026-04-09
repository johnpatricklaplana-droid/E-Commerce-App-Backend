import Text from "../components/Text";

export default function ImageUploader({images, setImages}) {

    const handleChange = (e) => {
        const newFiles = Array.from(e.target.files);

        setImages([...images, ...newFiles]);
    };  

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, i) => i !== indexToRemove));
    };

    return (
        <div className="p-3 overflow-hidden flex flex-col items-start gap-1.5">
            <div>
                <Text variant={"heading3"}>Product Image</Text>
                <Text variant={"muted"}>Upload a clear image of your product</Text>
            </div>
            <label htmlFor="imageInput" className="border cursor-pointer border-dashed flex flex-col items-center p-3 rounded-2xl w-full border-gray-400">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />


                    <path d="M4 16L9 11L13 15L16 12L20 16" stroke="currentColor" strokeWidth="1.5" fill="none" />


                    <path d="M12 14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9.5 8.5L12 6L14.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
                <Text variant={"info"}>Click me to browse file</Text>
                <Text variant={"muted"}>PNG, JPG up to 5mb</Text>
            </label>
            <input id="imageInput" onChange={handleChange} className="hidden" type="file" multiple />
            <div id="imagesPreviewContainer" className="flex gap-1.5 p-1.5 rounded-2xl border-dashed sm:w-62.5 border border-gray-400 sm:h-25 items-center overflow-x-auto justify-start">
                
                {images.length === 0 && <Text position={"center"} variant={"muted"}>Selected images will appear here</Text>}

                {Array.from(images).map((file, index) => (
                    <div 
                        key={index}
                        id="imagePreview" 
                        data-image-id={index} 
                        className="h-full opacity-100 scale-100 transition-all duration-300 rounded-2xl relative bg-blue-100 sm:w-25 shrink-0"
                    >
                        <button 
                            onClick={() => removeImage(index)}
                            className="absolute cursor-pointer p-1 hover:bg-red-600 rounded-[50%] hover:scale-125 transition duration-300 top-1 right-1"
                        >
                            <svg 
                                width="12" height="12"
                                viewBox="0 0 24 24"
                                fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </button>
                        <img 
                            className="h-full w-full object-cover rounded-2xl" 
                            src={URL.createObjectURL(file)} alt="" 
                        />
                    </div>
                ))}
                
            </div>
        </div>
    );

}

