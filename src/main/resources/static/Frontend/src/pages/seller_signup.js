import { POST } from "../api/authAPI";
import { getSellerSignupFields } from "../utils/boilerplate_code_handler";

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
            window.location.href = "http://localhost:5173/add-profile-seller.html";
        }
    });

}) ();

(() => {
    
    const skip_now_signup = document.getElementById("skip_now_signup");

    skip_now_signup.addEventListener("click", () => {
        window.location.href = "http://localhost:5173/add-business-registration-file"
    });

}) ();