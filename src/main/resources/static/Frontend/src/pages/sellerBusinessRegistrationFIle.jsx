import { useState } from "react";
import Button from "../components/Button";

export default function SellerBusinessRegistrationFile() {

    const [file, setFile] = useState([]);
 
    const holdFile = (e) => {
        const newFile = e.target.files;
        
        setFile((prevFile) => [...prevFile, ...newFile])
        console.log(file);
    };

    return (
        <div 
            className="h-screen bg-blue-100 w-screen flex items-center justify-center"
        >
            <div 
                className="flex gap-5 h-150 justify-center items-center py-5 sm:bg-white px-8 rounded sm:shadow-2xl flex-col"
            >
                <svg width="200" height="200" viewBox="0 0 150 200">
                    <circle cx="90" fill="aliceblue" cy="130" r="100" />

                    <rect y="175" x="0" rx="20" ry="20" className="fill-blue-200" width="160" height="8" />

                    <rect x="25" y="25" width="100" height="150" rx="10" ry="10" className="stroke-blue-800" strokeWidth="8" fill="white" />

                    <rect x="45" y="60" width="60" height="8" rx="5" ry="5" fill="aliceblue" />
                    <rect x="45" y="85" width="60" height="8" rx="5" ry="5" fill="aliceblue" />
                    <rect x="45" y="100" width="60" height="8" rx="5" ry="5" fill="aliceblue" />
                    <rect x="45" y="115" width="60" height="8" rx="5" ry="5" fill="aliceblue" />
                    <rect x="60" y="140" width="30" height="8" rx="5" ry="5" fill="aliceblue" />

                    <rect x="100" y="60" width="50" height="30" rx="10" fill="red" />
                    <text x="110" y="80" fontSize="18" fill="white">
                        PDF
                    </text>

                    <circle cx="70" transform="translate(5, -10)" cy="25" r="10" fill="none" stroke="lightgray" strokeWidth="5" />
                    <rect x="25" transform="translate(25, -10)" y="25" width="50" height="20" rx="4" ry="4" stroke="lightgray" fill="aliceblue" strokeWidth="5" />
                </svg>
                <h1 className="sm:text-2xl text-center font-bold">Upload Business Registration</h1>
                <div>
                    <p className="text-sm sm:text-lg text-center">Please upload you business registration document</p>
                    <p className="text-sm sm:text-lg text-center">(PDF, JPG, or PNG)</p>
                </div>

                <div 
                    className="w-full relative border-2 flex justify-center h-40 border-dashed border-gray-400 rounded group"
                >
                    {file.length > 0 && <img src={URL.createObjectURL(file[file.length-1])} className="max-h-full pointer-events-none max-w-full z-40" alt="" />}
                    <div 
                        id="label" 
                        className="w-full absolute top-0 bottom-0 max-h-40 backdrop-blur flex justify-center gap-1.5 p-2.5 flex-col items-center group-hover:z-50"
                    >
                        <svg 
                            width="200" 
                            height="120" 
                            viewBox="0 0 200 120"
                        >
                            <path 
                                d="M100 20 C60 20 60 20 60 60 C10 60 10 100 60 100
                                C70 120 100 120 100 100 C110 120 130 120 140 100
                                C160 90 150 70 140 60 C150 40 130 0 100 20" stroke="black" fill="lightgray" 
                            />
                        </svg>
                        <p 
                            className="text-gray-500">Drag & drop or
                        </p>
                        <label
                            className="cursor-pointer py-1 w-1/2 text-center border bg-blue-800 text-white font-semibold hover:bg-blue-900 rounded shadow-2xl"
                            htmlFor="business_registration_file_input">Browse file
                        </label>
                    </div>
                </div>

                <input onChange={holdFile} className="hidden" type="file" id="business_registration_file_input" />

                <p 
                    className="text-sm"
                >
                    Supported formats:PDF, JPG, PNG
                </p>
                <div 
                    className="w-full flex gap-2.5"
                >
                    <Button fullWidth={true} variant="secondary">Cancel</Button>
                    <Button fullWidth={true}>Upload</Button>
                </div>
            </div>
        </div>
    );
}