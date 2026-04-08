import { POST, PostFile } from "../api/api.js";
import { getSellerSignupFields } from "../utils/boilerplate_code_handler.js";


// This is for skipping the profile creation step of the seller signup process. 
(() => {
    
    const skip_now_signup = document.getElementById("skip_now_signup");

    if(skip_now_signup) {
        skip_now_signup.addEventListener("click", () => {
            globalThis.location.href = "http://localhost:8080/Frontend/add-business-registration-file.html"
        });
    }

}) ();

(() => {
    // TODO: add profile creation functionality for the seller. This is an optional step and the seller can skip it if they want to.
}) ();

// This is for uploading the business registration file of the seller. 
(() => {

    const upload_business_registration_file_button = document.getElementById("upload_business_registration_file_button");

    if(!upload_business_registration_file_button) {
        return;
    }

    upload_business_registration_file_button.addEventListener("click", async () => {
        
        const business_registration_file_input = document.getElementById("business_registration_file_input");
        const file_input = business_registration_file_input.files[0];

        const file = new FormData();
        file.append("file", file_input);

        const url = "http://localhost:8080/seller/business-registration-file";

        const result = await PostFile(url, file);
       
        if(result.status === 201) {
            globalThis.location.href = "http://localhost:8080/Frontend/add-seller-bank-account.html";
        }
        
    });

}) ();

