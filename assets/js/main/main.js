async function MAKE_REQUEST(method,url,payload,needToken,callback) {
    // fetch request
    options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (method == "POST" && payload != "") {
        options['body'] = JSON.stringify(payload)
    }
    if (needToken) {
        // get access_token from token data
        const accessToken = localStorage.getItem('authToken');
        if (!accessToken) {
            alert("token not valid")
            return new Error('Token not found in local storage');
        }
        options.headers['Authorization'] = `Bearer ${accessToken}`
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        alert("request failed!")
        return
    }
    const result = await response.json()
    callback(result)
}