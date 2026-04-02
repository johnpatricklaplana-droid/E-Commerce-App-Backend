    import { GET } from "../api/api.js";

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
    
    const url = "/seller/business-registration-file?page=0&size=10";

    const result = await GET(url);
    
    console.log(result);

}) ();