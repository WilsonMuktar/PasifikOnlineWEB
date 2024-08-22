// Function to encode a string to Base64
function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// Register new user
function signup() {
    const payload = {
        account: document.getElementById("signup_username").value,
        password : document.getElementById("signup_password").value,
        department_id: document.getElementById("signup_department").value,
        email: document.getElementById("signup_email").value
    };
    MAKE_REQUEST("POST", register_url, JSON.stringify(payload), true, function (response) {
        if (response instanceof Error) {
            alert("Registeration failed!")
            return
        }
        alert("successfully registered!")
        redirectPage(main_page_url)
    })
}

// Function to authenticate and store token in local storage
function login_authenticate(username, password, lang) {
    // keep user credential
    localStorage.setItem('user_name', username);
    localStorage.setItem('authCredential', base64Encode(username+":"+password));
    localStorage.setItem('localization_language', lang);
    const credentials = {
        client_id: web_client_id,
        client_secret : web_client_secret,
        username: username,
        password: password,
        grant_type: "password"
    };
    MAKE_REQUEST("POST",token_auth_url, JSON.stringify(credentials),false,function(response){
        if (response instanceof Error) {
            alert("Username/Password not correct!")
            return
        }
        // Assuming the server responds with a token data
        const token = response.data.access_token;

        // Store the token in local storage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(response.data));

        // Store user roles
        roles = ""
        for(i=0;i<response.data.roles.length;i++) {
            roles = response.data.roles[i].name
            break
        }
        localStorage.setItem('user_roles', roles);
        main_page_url = "pages/"+main_nav_bar[localStorage.getItem('user_roles')][0]["nav_name"] // set main_page_url by role after login
        redirectPage(main_page_url)
    })
}

// Function to make revoke token requests
function logout(e) {
    e.preventDefault()
    const token = localStorage.getItem('authToken');
    const userCredential = localStorage.getItem('authCredential');

    if (!token) {
        alert("token not valid")
        // Handle response
        localStorage.clear();
        redirectPage(login_page_url)
    }

    // get access_token from token data
    accessToken = token
    fetch(token_validate_url+accessToken, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${userCredential}`
        },
    })
        .then(response => {
            // Handle response
            localStorage.clear();
            redirectPage(login_page_url)
        })
        .catch(error => {
            // Handle response
            localStorage.clear();
            redirectPage(login_page_url)
            return new Error('Request error:', error);
        });
}

// Function to make authenticated requests
async function validateToken() {
    const token = localStorage.getItem('authToken');
    const userCredential = localStorage.getItem('authCredential')

    if (!token) {
        return new Error('Token not found in local storage');
    }

    // get access_token from token data
    accessToken = token
    response = await fetch(token_validate_url+accessToken+"/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${userCredential}`
        },
    })
    if (!response.ok) {
        // Handle response
        localStorage.removeItem("authToken");
        localStorage.removeItem("authCredential");
        redirectPage(login_page_url)
        return new Error('Authentication failed');
    }
    const result = await response.json()
    return "success"
}

var origin = window.location.href;
if (!origin.includes("sign-in") && !origin.includes("sign-up")) {
    // validate
    isValid = validateToken()
    if (isValid instanceof Error) {
        console.log(isValid.message)
        alert("Token Expired! Please re-login");
        redirectPage(login_page_url)
    } else if (isValid == undefined){
        alert("Token Expired! Please re-login");
        redirectPage(login_page_url)
    }
}

loginBtn = document.getElementById("login_btn");
if (loginBtn){
    loginBtn.addEventListener('click', function (){
        email = document.getElementById("login_email").value
        password = document.getElementById("login_password").value
        lang = document.getElementById("localization_selector").value
        login_authenticate(email, password, lang)
    });
}

logoutBtn = document.getElementById("logout_btn");
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        logout(e)
    });
}

signupBtn = document.getElementById("signup_btn");
if (signupBtn) {
    signupBtn.addEventListener('click', function () {
        signup()
    });
}
