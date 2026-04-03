    import { GET, POST } from "../api/api.js";

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

(async () => {
    
    const url = "/admin/business-registration-file?page=0&size=10";

    const result = await GET(url);
    
    result.forEach(file => {

        const fileinformation = {
            fileName: file.id,
            fileUrl: file.fileUrl,
            status: file.status
        };

        const html=`<div id="actualFile" class="flex cursor-pointer justify-between px-1.5 py-0.5 border-b border-gray-400 hover:bg-gray-300 items-center w-full">
                        <div>
                            <h1 class="text-[14px] truncate max-w-25">${fileinformation.fileUrl}</h1>
                            <span class="text-[12px]">september 17 2004</span>
                        </div>
                        <div class="flex px-1.5 py-1.5 justify-between w-1/2">
                            <span class="text-[14px] w-10">${fileinformation.fileName}</span>
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

(() => {

    const sellerDocumentContainer = document.getElementById("sellerDocumentContainer");

    if(!sellerDocumentContainer) {
        return;
    }
     
    sellerDocumentContainer.addEventListener("click", async (event) => {
        
        if (event.target.closest("#actualFile")) {

            const fileName = document.getElementById("actualFile").querySelector("h1").innerText;
           
            const url = `http://localhost:8080/business-registration-file/${fileName}`;

            const result = await fetch(url, {
                method: "GET"
            });

            const blob = await result.blob();

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);
    
            const html=`<div id="fileOverlayContainer" class="absolute flex flex-col items-center bg-black/80 w-screen h-screen">
                            <div class="flex p-3.5 items-center justify-between w-full gap-1">
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
                                    <button class="bg-white hover:bg-gray-300 px-2.5 py-1 font-bold rounded text-blue-700">
                                        Accept
                                    </button>
                                    <button class="bg-gray-600 hover:bg-gray-500 px-2.5 py-1 font-bold rounded text-white">
                                        Reject
                                    </button>
                                </div>
                            </div>
                            <div class="max-h-[90%] gap-2.5 max-w-[90%] flex flex-col shadow-lg rounded">
                                <img class="max-w-full rounded-2xl max-h-full w-full h-125" src="${imageUrl}" alt="">
                            </div>
                        </div>`;
                        
            document.getElementById("mainContainer").insertAdjacentHTML("afterbegin", html);

        }

    });

}) ();

(() => {

    document.addEventListener("click", (event) => {
        if (event.target.closest("#closeFileButton"))
            document.getElementById("fileOverlayContainer").remove();
    });

}) ();