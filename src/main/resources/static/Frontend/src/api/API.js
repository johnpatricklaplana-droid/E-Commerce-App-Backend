export async function POST (url, request_body) {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

export async function PostFile(url, file) {
    try {
        const result = await fetch(url, {
            method: "POST",
            body: file
        });
    
        const response = await result.json();
       console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function GET(url) {
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function PATCH(url) {
    try {
        const result = await fetch(url, {
            method: "PATCH"
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}