import { GET, PATCH, POST } from "../api/api.js";

(() => {

    const adminLoginButotn = document.getElementById("adminLoginButotn");

    if(!adminLoginButotn) {
        return;
    }

    adminLoginButotn.addEventListener("click", async (event) => {
        
        const adminEmail = document.getElementById("adminEmail");
        const adminPassword = document.getElementById("adminPassword");

        const body = {
            email: adminEmail.value.trim(),
            password: adminPassword.value.trim()
        };
 
        const url = "http://localhost:8080/login/admin";

        const result = await POST(url, body);

        if(result.status === 200) {
            globalThis.location.href = "http://localhost:8080/Frontend/admin-seller-registration-document-storage.html";
        }

    });

}) ();

// fetch the sellers registration documents url
(async () => {
    
    const url = "/admin/business-registration-file?page=0&size=10";

    const result = await GET(url);
    
    result.forEach(file => {

        const fileinformation = {
            fileId: file.id,
            fileUrl: file.fileUrl,
            status: file.status
        };

        const html=`<div id="actualFile" data-file-id="${fileinformation.fileId}" class="flex cursor-pointer justify-between px-1.5 py-0.5 border-b border-gray-400 hover:bg-gray-300 items-center w-full">
                        <div>
                            <h1 class="text-[14px] truncate max-w-25">${fileinformation.fileUrl}</h1>
                            <span class="text-[12px]">september 17 2004</span>
                        </div>
                        <div class="flex px-1.5 py-1.5 justify-between w-1/2">
                            <span class="text-[14px] w-10">${fileinformation.fileId}</span>
                            <span class="text-[14px] w-10">100gb</span>
                            <div class="w-10 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <circle cx="10" cy="3.6" r="2" fill="black" />
                                    <circle cx="10" cy="8.6" r="2" fill="black" />
                                    <circle cx="10" cy="13.6" r="2" fill="black" />
                                </svg>
                            </div>
                        </div>
                    </div>`;

        document.getElementById("sellerDocumentContainer").insertAdjacentHTML("beforeend", html);
          
    });

}) ();

// preview the file on click
(() => {

    const sellerDocumentContainer = document.getElementById("sellerDocumentContainer");

    if(!sellerDocumentContainer) {
        return;
    }
     
    sellerDocumentContainer.addEventListener("click", async (event) => {
        
        if (event.target.closest("#actualFile")) {
            
            const fileId = event.target.closest("#actualFile").dataset.fileId;

            const fileName = event.target.closest("#actualFile").querySelector("h1").innerText;
           
            const url = `http://localhost:8080/business-registration-file/${fileName}`;

            const result = await fetch(url, {
                method: "GET"
            });

            const blob = await result.blob();

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);
    
            const html=`<div id="fileOverlayContainer" class="absolute flex flex-col items-center bg-black/80 w-screen h-screen">
                            <div class="flex p-3.5 items-center justify-between w-[90%] gap-1">
                                <div class="flex items-center gap-1">
                                    <svg id="closeFileButton" xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 cursor-pointer hover:opacity-55"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        stroke-width="3">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                    </svg> 
                                    <h1 class="text-white">TODO: FILENAME</h1>
                                </div>
                                <div>
                                    <button id="openAcceptSellerPopup" class="bg-white hover:bg-gray-300 px-2.5 py-1 font-bold rounded text-blue-700">
                                        Accept
                                    </button>
                                    <button id="openRejectSellerPopup" class="bg-gray-600 hover:bg-gray-500 px-2.5 py-1 font-bold rounded text-white">
                                        Reject
                                    </button>
                                </div>
                            </div>
                            <div class="max-h-[90%] gap-2.5 max-w-[90%] flex flex-col shadow-lg rounded">
                                <img id="filePreview" data-file-id="${fileId}" class="max-w-full rounded-2xl max-h-full w-full h-125" src="${imageUrl}" alt="">
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
                <div id="popupAcceptSeller" class="absolute transition-opacity duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white p-5 top-1/2 left-1/2 flex flex-col gap-4 rounded-2xl -translate-x-1/2 -translate-y-1/2 bg-blue-700/90">
                    <h1 class="text-3xl drop-shadow-md font-sans font-semibold text-white">Are you sure about this?</h1>
                    <div class="flex gap-1.5 justify-between">
                        <button id="acceptSeller" class="text-black font-bold px-4 rounded-2xl w-[50%] py-2 bg-green-300 transition-colors duration-200 hover:bg-green-500">Yes</button>
                        <button id="cancelAcceptSeller" class="text-white font-bold px-4 rounded-2xl w-[50%] py-2 bg-gray-700 hover:bg-gray-600">Cancel</button>
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


// reject the sellers registration document
(() => {

    document.addEventListener("click", async (event) => {
        if (event.target.closest("#openRejectSellerPopup")) {
            const html = `
                <div id="popupRejectSeller" class="absolute transition-opacity duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white p-5 top-1/2 left-1/2 flex flex-col gap-4 rounded-2xl -translate-x-1/2 -translate-y-1/2 bg-red-700/90">
                    <h1 class="text-3xl drop-shadow-md font-sans font-semibold text-white">Are you sure about this?</h1>
                    <div class="flex gap-1.5 justify-between">
                        <button id="rejectSeller" class="text-black font-bold px-4 rounded-2xl w-[50%] py-2 bg-blue-400 transition-colors duration-200 hover:bg-blue-500">Yes</button>
                        <button id="cancelRejectSeller" class="text-white font-bold px-4 rounded-2xl w-[50%] py-2 bg-gray-700 hover:bg-gray-600">Cancel</button>
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