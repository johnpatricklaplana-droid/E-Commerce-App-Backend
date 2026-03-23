import { POST, PostFile } from "../api/authAPI.js";
import { getSellerSignupFields } from "../utils/boilerplate_code_handler.js";

(() => {

    const signupSubmitButton = document.getElementById("signupSubmitButton");

    if(!signupSubmitButton) {
        return;
    }

    signupSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const signup_fields = getSellerSignupFields();
        const url = "http://localhost:8080/signup/seller";

        const result = await POST(url, signup_fields);

        if(result.status === 201) {
            globalThis.location.href = "http://localhost:8080/Frontend/add-profile-seller.html";
        }
    });

}) ();

(() => {
    
    const skip_now_signup = document.getElementById("skip_now_signup");

    if(skip_now_signup) {
        skip_now_signup.addEventListener("click", () => {
            globalThis.location.href = "http://localhost:8080/Frontend/add-business-registration-file.html"
        });
    }

}) ();

(() => {

    const upload_business_registration_file_button = document.getElementById("upload_business_registration_file_button");

    if(!upload_business_registration_file_button) {
        return;
    }

    upload_business_registration_file_button.addEventListener("click", () => {
        console.log("fafjsdal");
        const business_registration_file_input = document.getElementById("business_registration_file_input");
        const file_input = business_registration_file_input.files[0];

        const file = new FormData();
        file.append("file", file_input);

        const url = "http://localhost:8080/business-registration-file/seller";

        PostFile(url, file);
    });

}) ();