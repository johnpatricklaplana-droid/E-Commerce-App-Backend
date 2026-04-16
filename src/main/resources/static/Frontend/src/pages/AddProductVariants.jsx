import Input from "../components/Input";
import Text from "../components/Text";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET, POST, PostFile } from "../api/API";
import CommonSvgIcon from "../components/CommonIcon";

export default function AddProductVariants () {

    const { productId } = useParams();

    useEffect(() => {
        
        const fetchProduct = async () => {
            const url = `http://localhost:8080/api/seller/product/${productId}`
            const result = await GET(url);

            const variants = result[0]?.variations?.flatMap((vary, i) =>
                vary.imagesUrl.map(image =>
                    ({ ...vary, index: i, image: image })
                )
            );
            variants.forEach(vary => {
                delete vary.imagesUrl;
            });

            setVariations(prev => [...prev, ...variants]);
        };

        fetchProduct();

    }, [productId]);

    const trueColors = {
        default: "bg-blue-100",

        red: "bg-red-500",
        orange: "bg-orange-500",
        amber: "bg-amber-500",
        yellow: "bg-yellow-500",
        lime: "bg-lime-500",
        green: "bg-green-500",
        emerald: "bg-emerald-500",
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        sky: "bg-sky-500",
        blue: "bg-blue-500",
        indigo: "bg-indigo-500",
        violet: "bg-violet-500",
        purple: "bg-purple-500",
        fuchsia: "bg-fuchsia-500",
        pink: "bg-pink-500",
        rose: "bg-rose-500",

        // neutrals
        slate: "bg-slate-500",
        gray: "bg-gray-500",
        zinc: "bg-zinc-500",
        neutral: "bg-neutral-500",
        stone: "bg-stone-500",

        // extras
        black: "bg-black",
        white: "bg-white",
    };

    const [variations, setVariations] = useState([]);
    const [fields, setFields] = useState({variationName: "", color: "", price: ""});
    const [images, setImages] = useState([]);
    const [currentColor, setCurrentColor] = useState("#dbeafe");
    const [adding, setAdding] = useState(true);
    const [variantPreviewInspectVersion, setVariantPreviewInspectVersion] = useState(null);

    const inspecting = (variationId) => {
        setAdding(false);

        const varys = variations.filter(vars => vars.variantId === variationId);

        setVariantPreviewInspectVersion(varys);
    };

    const addingvariant = () => {
        setAdding(true);
    };

    console.log(fields);


    const changeColor = (e) => {
        const color = globalThis.getComputedStyle(e.target).backgroundColor;
        setCurrentColor(color);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFields(prev => ({...prev, [id]: value}));
    };
    
    const fileChange = (e) => {
        const image = Array.from(e.target.files);

        const mappedImage = image.map(img => ({
            key: crypto.randomUUID(),
            url: URL.createObjectURL(img),
            img
        })
        );

        setImages(prev => [...prev, ...mappedImage]);
    };

    const removeImageAddingVersion = (key) => {

        setImages(prev => prev.filter(img => img.key !== key));

    };

    console.log(variations);

    const save = async () => {
        
        const url = `http://localhost:8080/api/seller/product-variant/${productId}`;
        const body = new FormData();
        body.append("productVariation", 
            new Blob([JSON.stringify(fields)], { type: "application/json" })
        );

        images.forEach(img => {
            body.append("images", 
                img.img
            )
        });
        
        const result = await PostFile(url, body);

        if(result) {
            const newVariation = result.imagesUrl.map(img => 
                ({
                    variationName: result.variationName,
                    variantId: result.variantId,
                    price: result.price,
                    color: result.color,
                    index: "whatever",
                    sku: result.sku,
                    image: img
                })
            );
            console.log(newVariation);
            setVariations(prev => [...prev, ...newVariation])
            setFields({ variationName: "", color: "", price: "" });
            setImages([]);
        }

    };

    return (
        <div 
            className={`h-screen flex flex-col gap-3 justify-center items-center w-screen`}
            style={{ backgroundColor: currentColor }}
        >
            <div className="flex gap-1.5 p-1.5 overflow-auto w-[500px] mx-auto">
                {Object.entries(trueColors).map(([key, value]) => 
                    <button 
                        key={value}
                        onClick={changeColor} 
                        className={`h-[44px] transition duration-300 cursor-pointer hover:scale-105 shrink-0 rounded shadow ${value} w-[44px]`}
                    >
                    </button>
                )}
            </div>
            <div 
                className="sm:w-[900px] bg-blue-50 p-6 grid sm:grid-cols-[1fr_1fr_100px] gap-3 rounded-2xl shadow" 
                action=""
            >
                <div className="space-y-3 relative">
                    <div>
                        <Text variant={"label"}>Variant</Text>
                        <Input handleChange={handleChange} id={"variationName"} variant={"default"} placeholder={"Enter variant name"} fullWidth={true}></Input>
                    </div>
                    <div>
                        <Text variant={"label"}>Color</Text>
                        <Input handleChange={handleChange} id={"color"} variant={"default"} placeholder={"Enter color"} fullWidth={true}></Input>
                    </div>
                    <div>
                        <Text variant={"label"}>Price</Text>
                        <Input handleChange={handleChange} id={"price"} variant={"default"} placeholder={"Enter price"} fullWidth={true}></Input>
                    </div>
                    <div className={`w-full transition duration-500 flex flex-col ${!adding ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} justify-center items-center h-full top-0 left-0 rounded-2xl bg-blue-400 absolute`}>
                        <p className="text-[18px] font-serif">{variantPreviewInspectVersion?.[0]?.variationName}</p>
                        <p className="text-[18px] font-serif font-bold text-yellow-400">${variantPreviewInspectVersion?.[0]?.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="rounded-2xl bg-white overflow-hidden relative shadow sm:h-[300px]">
                    <img 
                        src={adding ? images?.[0]?.url : `http://localhost:8080/api/public/product-image/${variantPreviewInspectVersion[0]?.image}`} 
                        className={`w-full h-full`} alt="" />
                    <label
                        className={`w-full ${adding ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition duration-300 absolute z-50 top-0 left-0 border-0 flex-col hover:backdrop-blur-2xl rounded-2xl cursor-pointer flex items-center justify-center h-full`}
                        htmlFor="thumbnail"
                    >
                        <div className="w-1/2">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 18H17C19.2 18 21 16.4 21 14.2C21 12.4 19.7 10.9 18 10.5C17.6 7.4 15.1 5 12 5C9.2 5 6.8 7 6.2 9.7C4.4 10.1 3 11.7 3 13.6C3 16 4.8 18 7 18Z"
                                    stroke="#3B82F6" strokeWidth="1.8" strokeLinejoin="round" />

                                <path d="M12 12V8" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M10 10L12 8L14 10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

                                <path d="M9 18H15" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p className="font-bold">Image only. I said image only!</p>
                    </label>
                    <input id="thumbnail" onChange={fileChange} className="hidden" type="file" />
                </div>
                <div className="rounded-2xl bg-white h-[300px] overflow-auto space-y-1.5 p-1.5 shadow">
                    {variantPreviewInspectVersion?.map(vary => 
                        {
                            if(!adding) {
                                return <img
                                    className={`rounded-2xl shadow w-full h-auto aspect-square`}
                                    src={`http://localhost:8080/api/public/product-image/${vary.image}`}
                                >

                                </img>
                            } 
                        }
                    )} 
                    {
                        adding ? images?.map(image =>
                            <div
                                className="relative"
                                key={image.key}
                            >
                                <button
                                    onClick={() => (removeImageAddingVersion(image.key))}
                                    className="absolute p-1.5 font-bold rounded-2xl hover:bg-red-600 top-0.5 right-0.5"
                                >
                                    <CommonSvgIcon width="20" height="20" type={"xbutton"}></CommonSvgIcon>
                                </button>
                                <img
                                    className={`rounded-2xl shadow w-full h-auto aspect-square`}
                                    src={URL.createObjectURL(image.img)}
                                >

                                </img>
                            </div>
                        ) : ""
                    }                   
                </div>
                <div 
                    className={`col-span-3 transition duration-300 ${adding ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} flex gap-3 justify-end`}
                >
                    <Button variant="secondary">Cancel</Button>
                    <Button onClick={save} variant={"primary"}>Save</Button>
                </div>
                <div className="col-span-3 flex gap-1.5 p-1.5 overflow-x-auto bg-white rounded-2xl shadow">
                    {variations?.map((vary, index, self) => {

                            const isFirst = self.findIndex(v => { if (v.variantId === vary.variantId) return v.variantId }) === index;

                            if(!isFirst) return null;

                            return <button
                                key={vary.variationId}
                                className="shadow p-1 w-[94px] hover:mix-blend-hard-light hover:scale-105 transition duration-300 cursor-pointer shrink-0 rounded-2xl"
                                onClick={() => (inspecting(vary.variantId))}
                            >
                                <img className="rounded-2xl w-full h-auto aspect-square" src={`http://localhost:8080/api/public/product-image/${vary.image}`}></img>
                                <p className="text-[12px] truncate text-center font-bold">{vary.variationName}</p>
                                <p className="text-[12px] truncate text-red-500 text-center font-bold">${vary.price.toLocaleString()}</p>
                            </button> 
                        }
                    )}
                    <button
                        className="shadow p-1 shrink-0 flex justify-center items-center hover:bg-gray-300 transition duration-300 cursor-pointer hover:scale-105 w-[94px] rounded-2xl"
                        onClick={addingvariant}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}