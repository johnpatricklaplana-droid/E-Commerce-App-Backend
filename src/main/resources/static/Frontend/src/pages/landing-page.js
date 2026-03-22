// show login Choice Popup
(() => {

    let isOpen = false;

    const loginButton = document.getElementById("loginButton");
    const logInPopup = document.getElementById("loginChoicePopup");

    loginButton.addEventListener("click", () => {
        isOpen = popup(logInPopup, isOpen);
    });

}) ();

function popup (popContainer, isOpen) {

    if (!isOpen) {
        popContainer.classList.remove("opacity-0");
        popContainer.classList.add("opacity-100");
        popContainer.classList.remove("pointer-events-none");
        isOpen = true;
        return isOpen;
    }
    popContainer.classList.remove("opacity-100");
    popContainer.classList.add("opacity-0");
    popContainer.classList.add("pointer-events-none");
    isOpen = false;
    return isOpen;
}

// signup popup
(() => {

    let isOpen = false;

    const signupChoicePopup = document.getElementById("signupChoicePopup");
    const signupButton = document.getElementById("signupButton");

    signupButton.addEventListener("click", () => {
        isOpen = popup(signupChoicePopup, isOpen);
    });

}) ();

(() => {
    
    const signupChoicePopup = document.getElementById("signupChoicePopup");
    const signupButton = document.getElementById("signupButton");

    const signButtonHeight = signupButton.getBoundingClientRect().height;
    const signupButtonWidth = signupButton.getBoundingClientRect().width;

    signupChoicePopup.style.top = signButtonHeight + 1 + "px";
    signupChoicePopup.style.right = signupButtonWidth + 1 + "px";

}) (); 

// login Choice Popup position
(() => {
    
    const loginButton = document.getElementById("loginButton");
    const logInPopup = document.getElementById("loginChoicePopup");

    const loginButtonHeight = loginButton.getBoundingClientRect().height;

    logInPopup.style.top = loginButtonHeight + 1 + "px";

}) ();