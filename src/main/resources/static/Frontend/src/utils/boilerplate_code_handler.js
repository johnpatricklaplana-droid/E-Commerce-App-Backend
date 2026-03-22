
// get input field values in costumer sign up form
export function getSignupFormFields () {

    const costumer_first_name = document.getElementById("costumer_first_name");
    const costumer_last_name = document.getElementById("costumer_last_name");
    const costumer_street = document.getElementById("costumer_street");
    const costumer_city = document.getElementById("costumer_city");
    const costumer_postal_code = document.getElementById("costumer_postal_code");
    const costumer_province = document.getElementById("costumer_province");
    const costumer_country = document.getElementById("costumer_country");
    const costumer_email = document.getElementById("costumer_email");
    const costumer_password = document.getElementById("constumer_password");
    const costumer_confirm_password = document.getElementById("costumer_confirm_password");

    const costumer_signup_form_fields = {
        first_name: costumer_first_name.value.trim(),
        last_name: costumer_last_name.value.trim(),
        street: costumer_street.value.trim(),
        city: costumer_city.value.trim(),
        postal_code: costumer_postal_code.value.trim(),
        province: costumer_province.value.trim(),
        country: costumer_country.value.trim(),
        email: costumer_email.value.trim(),
        password: costumer_password.value.trim(),
        confirm_password: costumer_confirm_password.value.trim()
    };

    return costumer_signup_form_fields;
}

export function getSellerSignupFields() {

    const first_name_signup = document.getElementById("first_name_signup");
    const last_name_signup = document.getElementById("last_name_signup");
    const street_signup = document.getElementById("street_signup");
    const city_signup = document.getElementById("city_signup");
    const province_signup = document.getElementById("province_signup");
    const postal_code_signup = document.getElementById("postal_code_signup");
    const country_signup = document.getElementById("country_signup");
    const email_signup = document.getElementById("email_signup");
    const password_signup = document.getElementById("password_signup");

    const seller_signup_fields = {
        first_name: first_name_signup.value.trim(),
        last_name: last_name_signup.value.trim(),
        street: street_signup.value.trim(),
        city: city_signup.value.trim(),
        province: province_signup.value.trim(),
        postcode: postal_code_signup.value.trim(),
        country: country_signup.value.trim(),
        email: email_signup.value.trim(),
        password: password_signup.value.trim()
    };

    return seller_signup_fields;
}