import Sidebar from "./AddProductSidebar";
import ImageUploader from "./ImageUploader";

export default function SellerAddProduct() {
    return (
        <div id="root" class="h-screen grid grid-cols-[280px_1fr] bg-blue-100 w-screen">
            
            <Sidebar/>

            <div class="p-5 w-full flex min-h-0">
                <div class="bg-white/50 p-5 min-h-0 h-full flex overflow-auto flex-col gap-4 w-full rounded-2xl">
                    <div class="relative">
                        <button
                            class="flex bg-white transition hover:scale-105 duration-300 hover:bg-blue-100 cursor-pointer absolute text-[14px] items-center text-slate-800 border-slate-400 rounded-2xl px-4 py-1.5 border gap-1.5"
                            onclick="history.back()">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Products
                        </button>
                        <div>
                            <h1 class="text-center font-bold font-sans text-slate-800 text-[24px]">Add New Product</h1>
                            <p class="text-center text-sm">Fill in the details below to add new product to your store</p>
                        </div>
                    </div>
                    <main class="bg-white p-5 rounded-2xl">
                        <div>
                            <div class="p-2.5 flex gap-4 flex-col">
                                <div class="grid gap-3 sm:grid-cols-[550px_1fr]">
                                    <div class="flex p-3 border-r border-slate-400 flex-col gap-3">
                                        <div class="">
                                            <label class="text-[14px] font-semibold" for="">Product Name<span class="text-red-600">*</span></label>
                                            <input class="w-full border-slate-400 border text-sm p-1.5 rounded-[10px] outline-0" type="text"
                                                placeholder="Enter product name" />
                                        </div>
                                        <div class="grid grid-cols-2 gap-2">
                                            <div>
                                                <label class="text-[14px] font-semibold" for="">Price <span class="text-red-600">*</span></label>
                                                <div class="flex">
                                                    <span class="bg-gray-200 rounded-l-[10px] flex items-center px-2">$</span>
                                                    <input class="w-full border-slate-400 text-sm border-l-0 p-1.5 rounded-r-[10px] outline-0 border"
                                                        type="text" placeholder="0.00" />
                                                </div>
                                            </div>
                                            <div>
                                                <label class="text-[14px] font-semibold" for="">Color</label>
                                                <input class="w-full border-slate-400 text-sm outline-0 p-1.5 rounded-[10px] border" type="text"
                                                    placeholder="Enter color (e.g.., Red, Blue)" />
                                            </div>
                                        </div>
                                        <div>
                                            <label class="text-[14px] font-semibold" for="">Variant</label>
                                            <div>
                                                <input class="w-full border-slate-400 text-sm outline-0 p-1.5 rounded-[10px] border" type="text"
                                                    placeholder="Enter variant (e.g.., Small, 32gb)" />
                                                    <p class="text-[12px] font-extralight">Examples Size, Storage, Style, etc.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label class="text-[14px] font-semibold" for="">Categories <span class="text-red-600">*</span></label>
                                            <p class="text-[12px] font-extralight">Select one or more categories that apply to this product.</p>
                                            <select class="w-full text-sm border-slate-400 outline-0 p-1.5 rounded-[10px] border">
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                                <option value="TODO">TODO</option>
                                            </select>
                                            <div class="mt-3">
                                                <span class="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Electronics
                                                    <span>X</span></span>
                                                <span class="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Clothing
                                                    <span>X</span></span>
                                                <span class="text-[12px] font-semibold font-sans text-blue-500 bg-blue-200/80 rounded-2xl p-2.5">Accessories
                                                    <span>X</span></span>
                                            </div>
                                        </div>
                                    </div>

                                <ImageUploader />

                                </div>
                                <div>
                                    <label for="">Description</label>
                                    <textarea class="border-slate-400 rounded-[10px] p-3 text-sm border w-full h-32 resize-none outline-0" placeholder="Enter product description, features, and other important details..." maxlength="500"></textarea>
                                </div>
                                <div class="flex gap-3 justify-end">
                                    <button class="cursor-pointer shadow-2xl hover:bg-blue-100 border-slate-400 border-2 rounded-[10px] transition hover:scale-105 duration-300 px-4 py-2">Cancel</button>
                                    <button class="cursor-pointer shadow-2xl hover:bg-black border-slate-400 bg-slate-900 text-white transition hover:scale-105 duration-300 border-2 rounded-[10px] px-4 py-2">Save Product</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="bg-blue-200/80 border border-blue-400 p-4 rounded-2xl flex gap-3 items-center">
                        <svg class="text-blue-500 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="7" x2="12" y2="13" />
                            <circle cx="12" cy="17" r="1" />
                        </svg>
                        <p class="text-[14px]"><span class="font-bold">Tip:</span> Add accurate details to attract more costumers</p>
                    </footer>
                </div>
            </div> 
        </div>
    );
}




