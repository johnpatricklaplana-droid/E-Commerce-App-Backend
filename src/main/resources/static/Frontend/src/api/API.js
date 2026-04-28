export async function POST (url, request_body) {
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request_body),
            credentials: "include"
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
            body: file,
            credentials: "include"
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
            },
            credentials: "include"
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function PATCH(url, body) {
    try {
        const result = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function DELETE(url) {
    try {
        const result = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getCartItemsCount() {

    const url = "http://localhost:8080/api/costumer/cart/items/count";

    const result = await GET(url);

    return result;

}