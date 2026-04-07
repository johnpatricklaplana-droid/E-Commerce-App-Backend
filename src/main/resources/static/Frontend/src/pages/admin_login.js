import { GET, PATCH, POST } from "../api/api.js";

// preview the file on click
(() => {

    const sellerDocumentContainer = document.getElementById("sellerDocumentContainer");

    if(!sellerDocumentContainer) {
        return;
    }
     
    sellerDocumentContainer.addEventListener("click", async (event) => {
        
        if (event.target.closest("#actualFile")) {
            
            const fileId = event.target.closest("#actualFile").dataset.fileId;

            const fileName = event.target.closest("#actualFile").innerText;
           
            const url = `http://localhost:8080/business-registration-file/${fileName}`;

            const result = await fetch(url, {
                method: "GET"
            });

            const blob = await result.blob();

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);
    
            const html=`<div id="fileOverlayContainer" class="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm w-full h-full z-50">
                            <div class="flex items-center justify-between w-[95%] max-w-4xl p-4 bg-slate-800/95 rounded-2xl shadow-2xl border border-slate-700">
                                <div class="flex items-center gap-3">
                                    <svg id="closeFileButton" xmlns="http://www.w3.org/2000/svg"
                                        class="w-6 h-6 cursor-pointer text-slate-300 hover:text-white transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                    </svg> 
                                    <h1 class="text-white font-semibold text-lg">TODO: FILENAME</h1>
                                </div>
                                <div class="flex gap-3">
                                    <button id="openAcceptSellerPopup" class="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 font-semibold rounded-xl text-white transition-colors shadow-lg">
                                        Accept
                                    </button>
                                    <button id="openRejectSellerPopup" class="bg-rose-600 hover:bg-rose-500 px-4 py-2 font-semibold rounded-xl text-white transition-colors shadow-lg">
                                        Reject
                                    </button>
                                </div>
                            </div>
                            <div class="max-h-[85%] max-w-[95%] flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-700">
                                <img id="filePreview" data-file-id="${fileId}" class="max-w-full max-h-full w-full h-auto object-contain rounded-2xl" src="${imageUrl}" alt="">
                            </div>
                        </div>`;
                        
            document.getElementById("mainContainer").insertAdjacentHTML("afterbegin", html);

        }

    });

}) ();

// close the file preview 
(() => {

    document.addEventListener("click", (event) => {
        if (event.target.closest("#closeFileButton"))
            document.getElementById("fileOverlayContainer").remove();
    });

}) ();

// open the accept seller popup when admin clicks the accept button
(() => {

    document.addEventListener("click", (event) => {
        if (event.target.closest("#openAcceptSellerPopup")) {
            
            const html = `
                <div id="popupAcceptSeller" class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div class="bg-slate-800/95 border border-slate-700 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <h1 class="text-2xl font-bold text-white text-center mb-6">Are you sure about this?</h1>
                        <div class="flex gap-4 justify-center">
                            <button id="acceptSeller" class="bg-emerald-600 hover:bg-emerald-500 w-[100px] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors duration-200">Yes</button>
                            <button id="cancelAcceptSeller" class="bg-slate-600 hover:bg-slate-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors duration-200">Cancel</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("fileOverlayContainer").insertAdjacentHTML("afterbegin", html);
        }
    });

}) ();

// accept the sellers registration document
(() => {

    document.addEventListener("click", async (event) => {
        if(event.target.closest("#acceptSeller")) {
            
            const fileId = document.getElementById("filePreview").dataset.fileId;
            console.log(fileId);

            const url = `http://localhost:8080/admin/business-registration-file/${fileId}/accept`;

            const result = await PATCH(url);
           
            document.getElementById("popupAcceptSeller").remove();

            const html = `
                <div id="acceptResponsePopup" class="absolute pointer-events-none transition-opacity duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white p-5 top-1/2 left-1/2 flex flex-col gap-4 rounded-2xl -translate-x-1/2 -translate-y-1/2 bg-black/70">
                    <h1 class="text-2xl drop-shadow-md text-center font-sans font-semibold text-white">${result.message}</h1>
                </div>
            `;

            document.getElementById("fileOverlayContainer").insertAdjacentHTML("afterbegin", html);

            setTimeout(() => {
                document.getElementById("acceptResponsePopup").remove();
            }, 3000);
        }
    });

}) ();


(() => {

    document.addEventListener("click", async (event) => {
        if (event.target.closest("#openRejectSellerPopup")) {
            const html = `
                <div id="popupRejectSeller" class="backdrop-blur-sm h-full w-full absolute bg-black/80">
                    <div class="absolute transition-opacity duration-300 ease-out border-slate-700 rounded-3xl shadow-2xl p-8 focus:outline-none top-1/2 left-1/2 flex items-center flex-col gap-4 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800/95">
                        <h1 class="text-2xl drop-shadow-md font-sans font-semibold text-white">Are you sure about this?</h1>
                        <div class="flex gap-1.5 justify-arround">
                            <button id="rejectSeller" class="text-black font-bold px-6 rounded-2xl w-[100px] py-3 bg-blue-400 transition-colors duration-200 hover:bg-blue-500">Yes</button>
                            <button id="cancelRejectSeller" class="text-white font-bold px-6 rounded-2xl w-[100px] py-3 bg-gray-700 hover:bg-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("fileOverlayContainer").insertAdjacentHTML("afterbegin", html);
        }
    });

}) ();

(() => {

    document.addEventListener("click", async (event) => {
        if (event.target.closest("#rejectSeller")) {

            const fileId = document.getElementById("filePreview").dataset.fileId;

            const url = `http://localhost:8080/admin/business-registration-file/${fileId}/reject`;

            const result = await PATCH(url);

            document.getElementById("popupRejectSeller").remove();

            const html = `
                <div id="rejectResponsePopup" class="absolute pointer-events-none transition-opacity duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white p-5 top-1/2 left-1/2 flex flex-col gap-4 rounded-2xl -translate-x-1/2 -translate-y-1/2 bg-black/70">
                    <h1 class="text-2xl drop-shadow-md text-center font-sans font-semibold text-white">${result.message}</h1>
                </div>
            `;

            document.getElementById("fileOverlayContainer").insertAdjacentHTML("afterbegin", html);

            setTimeout(() => {
                document.getElementById("rejectResponsePopup").remove();
            }, 3000);
        }
    });

})();

(() => {

    document.addEventListener("click", (event) => {
        if(event.target.closest("#cancelRejectSeller")) {
            document.getElementById("popupRejectSeller").remove();
        }
    });

}) ();

// cancel button to close the accept seller popup
(() => {
    
    document.addEventListener("click", (event) => {
        if (event.target.closest("#cancelAcceptSeller")) {
            document.getElementById("popupAcceptSeller").remove();
        }
    });

}) ();