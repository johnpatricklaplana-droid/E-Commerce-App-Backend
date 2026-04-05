(() => {

    const imageInput = document.getElementById("imageInput");

    if(!imageInput) {
        return;
    }

    let fileQueue = [];
    const imagesPreviewContainer = document.getElementById("imagesPreviewContainer");

    imageInput.addEventListener("change", (event) => {
        const newFiles = Array.from(imageInput.files);

        newFiles.forEach(file => {

            const randomId = crypto.randomUUID();
            
            const html = `<div id="imagePreview" data-image-id="${randomId}" class="h-full opacity-100 scale-100 transition-all duration-300 rounded-2xl relative bg-blue-100 sm:w-25 shrink-0">
                            <button id="removeImagePreviewButton" class="absolute cursor-pointer p-1 hover:bg-red-600 rounded-[50%] hover:scale-125 transition duration-300 top-1 right-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                                </svg>
                            </button>
                            <img class="h-full w-full object-cover rounded-2xl" src="${URL.createObjectURL(file)}" alt="">
                        </div>`

            fileQueue.push({id: randomId, file});

            imagesPreviewContainer.querySelector("p").classList.add("hidden");
     
            imagesPreviewContainer.insertAdjacentHTML("afterbegin", html);
        });

        console.log(fileQueue);
        imageInput.value = "";
    });

    imagesPreviewContainer.addEventListener("click", (event) => {

        if (event.target.closest("#removeImagePreviewButton")) {
            const imageToRemove = event.target.closest("#removeImagePreviewButton").closest("#imagePreview");
            const imageToRemoveId = event.target.closest("#removeImagePreviewButton").closest("#imagePreview").dataset.imageId;

            fileQueue = fileQueue.filter(file => file.id !== imageToRemoveId);
            
            imageToRemove.classList.add("opacity-50", "scale--95");

            setTimeout(() => {
                imageToRemove.remove();
            }, 200);

            console.log(fileQueue);
        }
    });

}) ();
