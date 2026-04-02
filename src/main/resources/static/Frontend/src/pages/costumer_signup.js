import { POST } from "..API.js";
import { getSignupFormFields } from "../utils/boilerplate_code_handler.js";

// costumer signup
(() => {
    
    const costumer_signup_form = document.getElementById("costumer_signup_form");

    costumer_signup_form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const fields = getSignupFormFields();

        const url = "http://localhost:8080/signup/costumer"; 
        const request_body = fields;
        POST(url, request_body);
    });

}) ();