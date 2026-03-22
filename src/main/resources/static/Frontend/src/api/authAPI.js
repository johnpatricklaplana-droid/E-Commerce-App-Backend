export async function POST (url, request_body) {

    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
    });

    const response = await result.json();
    console.log(response);
    return response;
}