import { POST, PostFile } from "../api/authAPI.js";
import { getSellerSignupFields } from "../utils/boilerplate_code_handler.js";

// This is for handling the seller signup process. The seller signup process is a multi-step process and this code is responsible for handling the first step of the seller signup process which is the basic details of the seller.
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
            globalThis.location.href = "http://localhost:8080/Frontend/add-seller-paper.html";
        }
        
    });

}) ();

// This is for adding the bank account details of the seller. This is the last step of the seller signup process.
(() => {

    const submitBankAccountDetails = document.getElementById("submitBankAccountDetails");

     if(!submitBankAccountDetails) {
        return;
     }

    submitBankAccountDetails.addEventListener("click", async (event) => {
        event.preventDefault();

        const bankAccountNumber = document.getElementById("bankAccountNumber").value.trim();
        const accountType = document.getElementById("accountType").value.trim();
        
        const body = {
            bank_account_number: bankAccountNumber,
            account_type: accountType
        };

        const url = "http://localhost:8080/seller/bank-account";
        const result = await POST(url, body);

        if(result.status === 201) {
            globalThis.location.href = "http://localhost:8080/Frontend/seller-dashboard.html";
        }
        
    });

}) ();

// This is for handling the seller login process.
(() => {

    const sellerLoginButton = document.getElementById("sellerLoginButton");

    if(!sellerLoginButton) {
        return;
    }

    sellerLoginButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const sellerEmail = document.getElementById("sellerEmail");
        const sellerPassword = document.getElementById("sellerPassword");

        const body = {
            email: sellerEmail.value.trim(),
            password: sellerPassword.value.trim()
        };

        const url = "http://localhost:8080/login/seller"

        const result = await POST(url, body);

        if(result.status === 200) {
            globalThis.location.href = "http://localhost:8080/Frontend/seller-dashboard.html";
        }
    });

}) ();