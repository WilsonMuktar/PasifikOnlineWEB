// Assign username and roles in nav
account_name = document.getElementById("account_name");
account_roles= document.getElementById("account_roles");
if (account_name != undefined) {
    account_name.innerHTML = localStorage.getItem('user_name')
}
if (account_roles != undefined) {
    account_roles.innerHTML = localStorage.getItem('user_roles')
}

function updateTotalPrice() { document.getElementById("total_price").value =  document.getElementById("quantity").value * document.getElementById("unit_price").value;}

////////////////////
// NavBar sidebar //
////////////////////
document.getElementsByClassName("fixed-plugin-button")[0].addEventListener("click", function (e){
    sideNavBar = document.getElementById("sidenav-main")
    if (sideNavBar.classList.contains("sidenav")) {
       sideNavBar.classList.remove("sidenav")
    } else {
        sideNavBar.classList.add("sidenav")
    }

    /*if (sideNavBar.style.transform) {
        transform: translateX(0rem);
    }*/
})
document.getElementById("sidenav-collapse-main").innerHTML = `
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link " href="../pages/vessel.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="fa fa-ship text-primary text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Vessels</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/stock.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-shop text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Stocks</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/transaction.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Transaction</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/product.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="fa fa-product-hunt text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Product</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/people.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-single-02 text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">People</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/trip.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-calendar-grid-58 text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Trip</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/catch.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-trophy text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Catch</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/maintenance.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-settings text-success text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Maintenance</span>
                </a>
            </li>
            <li class="nav-item mt-3">
                <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/profile.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Profile</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="user.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-single-02 text-warning text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Users</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/role.html">
                    <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Roles</span>
                </a>
            </li>
        </ul>
`

function showLoader() {
    var loaderElement = document.createElement('div');
    loaderElement.style.cssText = 'display: block; position: absolute; height: 100px; width: 100px; top: 50%; left: 50%; margin-left: -50px; margin-top: -50px; background: url("../assets/img/loader.gif"); background-size: 100%; z-index: 999999999999999999999;'
    loaderElement.id = 'loaderElement';
    document.body.appendChild(loaderElement)
}

function hideLoader() {
    loaderElement = document.getElementById("loaderElement");
    if (loaderElement != undefined) {
        document.body.removeChild(loaderElement);
    }
}

// Main logic //
async function MAKE_REQUEST(method,url,payload,needToken,callback) {
    showLoader();

    // fetch request
    options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (payload != "") {
        options['body'] = payload
    }
    if (needToken) {
        // get access_token from token data
        const accessToken = localStorage.getItem('authToken');
        if (!accessToken) {
            alert("token not valid")
            // Handle response
            localStorage.clear();
            redirectPage(login_page_url)
        }
        options.headers['Authorization'] = `Bearer ${accessToken}`
    }
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            callback(new Error(`not enough permission to open [${method}]${url}`))
            hideLoader();
            return
        }
        try {
            const result = await response.json()
            hideLoader();
            callback(result)
        } catch (ex) {
            hideLoader();
            callback("")
        }
    } catch (ex) {
        hideLoader();
        callback(new Error(`not enough permission to open [${method}]${url}`))
    }
    hideLoader();
}

function reorderSelectOptions(options, selected) {
    ordered = ""
    foundSelected = false
    for (i = 0; i < options.length; i++) {
        if (options[i].includes(`value="${selected}"`)) {
            foundSelected = true
            ordered += options[i].replace("option value", "option selected value")
        } else {
            ordered += options[i]
        }
    }

    if (foundSelected == false) {
        ordered = `<option value selected>-- None --</option>` + ordered
    }

    return ordered
}

function str(data) {
    try {
        if (data == undefined) {
            return ""
        }
    } catch (exc) {
        return ""
    }
    return data
}

function redirectPage(url) {
    if (origin.includes("page")) {
        window.location.replace("../" + url);
    } else {
        window.location.replace(url);
    }
}

String.prototype.format = String.prototype.format || function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

/*****************/
/* PROCESS TABLE */
/*****************/
function processRoleTable(response) {
    data = response.data
    rows = ""
    table = document.getElementById("role_table")
    for (i = data.length - 1; i >= 0; i--) {
        // process features
        if (data[i].features != undefined) {
            for (j = 0; j < data[i].features.length; j++) {
                rows += `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="../assets/img/theme/unass.jpg" class="avatar avatar-sm rounded-circle me-2" alt="spotify"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">${str(data[i].features[j].name)}</p></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].features[j].endpoint)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].features[j].tag)}</span></td>
                     <td class="align-middle text-center"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Role",${JSON.stringify(data[i])},${JSON.stringify(data[i].features[j])})'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
                    </tr>
                `
            }
        } else if (data[i].name == "system_admin" || data[i].name == "domain_admin"){
            rows = `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="../assets/img/theme/unass.jpg" class="avatar avatar-sm rounded-circle me-2" alt="spotify"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">Super User</p></td>
                     <td><span class="text-xs font-weight-bold"></span>*</td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-primary">*</span></td>
                    </tr>
                `+rows;
        } else {
            rows += `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="../assets/img/theme/unass.jpg" class="avatar avatar-sm rounded-circle me-2" alt="spotify"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">-</p></td>
                     <td><span class="text-xs font-weight-bold"></span>-</td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-primary"></span></td>
                     <td class="align-middle text-center"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Role",${JSON.stringify(data[i])},"")'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
                    </tr>
                `;
        }
        table.tBodies[0].innerHTML = rows;
    }
}
function prosesUserTable(response) {
    data = response.data
    rows = ""
    table = document.getElementById("user_table")
    for (i=data.length-1; i>=0; i--) {
        // process default avatar
        if (data[i].avatar == undefined) {
            data[i].avatar = "../assets/img/avatar/avatar-5.jpg";
            if (data[i].gender == "f") {
                data[i].avatar = "../assets/img/avatar/avatar-6.jpg";
            }
        }
        // process roles
        roles = "";
        for(j=0;j<data[i].roles.length;j++){
            if (roles == "") { roles+= data[i].roles[j].name} else {
                roles += ","+data[i].roles[j].name
            }
        }
        rows += `
            <tr>
                <td><div class="d-flex px-2 py-1"><div><img src="${data[i].avatar}"class="avatar avatar-sm me-3" alt="user1"></div>
                    <div class="d-flex flex-column justify-content-center"><h6 class="mb-0 text-sm">${data[i].account}</h6>
                    <p class="text-xs text-secondary mb-0">${data[i].email}</p></div></div></td>
                <td><p class="text-xs font-weight-bold mb-0">${roles}</p>
                    <p class="text-xs text-secondary mb-0">${data[i].department.name}</p></td>
                <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-success">Online</span></td>
                <td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">${(new Date(data[i].create_at*1000)).toLocaleDateString('es-CL')}</span></td>
                <td class="align-middle text-center">
                    <a href="javascript:;" onclick='openPopup("User Profile","",${JSON.stringify(data[i])})' class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit User">Edit</a>
                    <a href="javascript:;" onclick='openPopup("Bind Role","",${JSON.stringify(data[i])})' class="font-weight-bold" style="padding: 10px; color:#009652;" data-toggle="tooltip" data-original-title="Bind Role">+</a>
                    <a href="javascript:;" onclick='openPopup("UnBind Role","",${JSON.stringify(data[i])})' class="font-weight-bold" style="padding: 10px; color:#FA0000;" data-toggle="tooltip" data-original-title="unBind Role">-</a>
                </td>
            </tr>`
    }
    table.tBodies[0].innerHTML = rows;
}

function processProductTable(response) {
    data = response.data
    rows = ""
    table = document.getElementById("product_table")
    for (i = data.length - 1; i >= 0; i--) {
        rows += `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="${data[i].product_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Product: ${data[i].product_name}', '${data[i].product_image}');"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].product_name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">${str(data[i].product_category)}</p></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].brand)}</span></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].category)}</span></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].quantity_in_stock)}</span></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].supplier_name)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].date_added)}</span></td>
                     <td class="align-middle text-center">
                        <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Product","",${JSON.stringify(data[i])})'><i class="fa fa-ellipsis-v text-xs"></i></button>
                        <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Product","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
                     </td>
                    </tr>
                `
    }
    table.tBodies[0].innerHTML = rows;
}

function processVesselTable(response) {
    data = response.data
    rows = ""
    table = document.getElementById("vessel_table")
    for (i = data.length - 1; i >= 0; i--) {
        rows += `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="${data[i].vessel_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Vessel: ${data[i].vessel_name}', '${data[i].vessel_image}');"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].vessel_name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">${str(data[i].vessel_type)}</p></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].registration_number)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].year_built)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].fisheries_permits)}</span></td>
                     <td class="align-middle text-center">
                        <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Vessel","",${JSON.stringify(data[i])})'><i class="fa fa-ellipsis-v text-xs"></i></button>
                        <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Vessel","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
                     </td>
                    </tr>
                `
    }
    table.tBodies[0].innerHTML = rows;
}

function processStockTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("stock_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].stock_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Stock: ${data[i].product_id}', '${data[i].stock_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${data[i].product_id}</h6>
                    </div>
                </div>
            </td>
            <td><p class="text-sm font-weight-bold mb-0">${data[i].transaction_type}</p></td>
            <td><span class="text-xs font-weight-bold">${data[i].location}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].quantity}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].date_added}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].supplier_id}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Stock","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Stock","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

function processPeopleTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("people_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].person_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Person: ${str(data[i].first_name)} ${str(data[i].last_name)}', '${data[i].person_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${str(data[i].first_name)} ${str(data[i].last_name)}</h6>
                    </div>
                </div>
            </td>
            <td><p class="text-sm font-weight-bold mb-0">${str(data[i].person_category)}</p></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].email)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].phone_number)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].city)}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Person","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Person","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

function processTripTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("trip_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].trip_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Trip: ${data[i].trip_name}', '${data[i].trip_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${data[i].trip_name}</h6>
                    </div>
                </div>
            </td>
            <td><span class="text-xs font-weight-bold">${data[i].departure_date}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].return_date}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].vessel_id}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].captain_id}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Trip","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Trip","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

function processTransactionTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("transaction_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].transaction_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Transaction: ${data[i].transaction_date}', '${data[i].transaction_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${str(data[i].transaction_id)}</h6>
                    </div>
                </div>
            </td>
            <td><span class="text-xs font-weight-bold">${str(data[i].transaction_date)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].transaction_type)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].total_price)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].vessel_id)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].buyer_id)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].seller_id)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].payment_type)}</span></td>
            <td><span class="text-xs font-weight-bold">${str(data[i].payment_status)}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Transaction","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Transaction","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

function processMaintenanceTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("maintenance_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].maintenance_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Maintenance: ${data[i].vessel_id}', '${data[i].maintenance_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${data[i].vessel_id}</h6>
                    </div>
                </div>
            </td>
            <td><span class="text-xs font-weight-bold">${data[i].maintenance_date}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].cost}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].task_description}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Maintenance","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Maintenance","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

function processCatchTable(response) {
    var data = response.data;
    var rows = "";
    var table = document.getElementById("catch_table");

    for (var i = data.length - 1; i >= 0; i--) {
        rows += `
        <tr>
            <td>
                <div class="d-flex px-2">
                    <div>
                        <img src="${data[i].catch_image}" class="avatar avatar-sm rounded-circle me-2" onclick="openPopup('show image', 'Catch: ${data[i].product_id}', '${data[i].catch_image}');">
                    </div>
                    <div class="my-auto">
                        <h6 class="mb-0 text-sm">${data[i].product_id}</h6>
                    </div>
                </div>
            </td>
            <td><span class="text-xs font-weight-bold">${data[i].catch_date}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].catch_quantity}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].vessel_id}</span></td>
            <td><span class="text-xs font-weight-bold">${data[i].trip_id}</span></td>
            <td class="align-middle text-center">
                <button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Catch","",${JSON.stringify(data[i])})'>
                    <i class="fa fa-ellipsis-v text-xs"></i>
                </button>
                <button class="btn btn-link text-warning mb-0" onclick='openPopup("Delete Catch","",${JSON.stringify(data[i])})'><i class="fa fa-ban text-xs"></i></button>
            </td>
        </tr>
    `;
    }

    table.tBodies[0].innerHTML = rows;
}

/*****************/
/* PROCESS POPUP */
/*****************/
function openPopup(title,title_extra,data) {
    myModal = document.getElementById("myModal")
    myModal.style.display = 'block';
    myModalContent = myModal.getElementsByClassName("modal-content")[0];
    [formContent, addModalFormBtnCallback] = processPopup(title,title_extra,data)
    myModalContent.innerHTML = formContent;
    myModalContent.getElementsByClassName("close")[0].addEventListener('click', function () {
        myModal.style.display = 'none';
    });
    addModalFormBtnCallback();
}

function processPopup(title, title_extra, data) {
    switch (title) {
        case "show image":
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title_extra}</p>
                      </div>
                    </div>
                    <div class="card-body">
                        <div class="col-md-12">
                          <div class="form-group">
                            <img src="${data}" class="form-control"></img>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                    </div>
                  </div>
            `,function(){}];
        case "User Profile":
            genderOptions = `
                <option value="m">Male</option>
                <option value="f">Female</option>
            `
            if (data.gender == "f") {
                genderOptions = `
                    <option value="f">Female</option>
                    <option value="m">Male</option>
                `
            }
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Username</label>
                            <input id="update_user_account" disabled class="form-control" type="text" value="${str(data.account)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Email address</label>
                            <input id="update_user_email" class="form-control" type="email" value="${str(data.email)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Real name</label>
                            <input id="update_user_realname" class="form-control" type="text" value="${str(data.real_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Nick name</label>
                            <input id="update_user_nickname" class="form-control" type="text" value="${str(data.nick_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Gendre</label>
                            <select id="update_user_gender" name="gender" class="form-control">
                                ${genderOptions}
                              </select>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Address</label>
                            <input id="update_user_address" class="form-control" type="text" value="${str(data.address)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">City</label>
                            <input  id="update_user_city" class="form-control" type="text" value="${str(data.city)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Province</label>
                            <input id="update_user_province" class="form-control" type="text" value="${str(data.province)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Mobile</label>
                            <input id="update_user_mobile" class="form-control" type="text" value="${str(data.mobile)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Phone</label>
                            <input id="update_user_phone" class="form-control" type="text" value="${str(data.phone)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_user_btn" class="btn btn-primary btn-sm ms-auto">UPDATE</button>
                    </div>
                  </div>
            `,function(){
                document.getElementById("update_user_btn").addEventListener('click', function (e) {
                    payload = {
                        "account": document.getElementById("update_user_account").value,
                        "email": document.getElementById("update_user_email").value,
                        "real_name": document.getElementById("update_user_realname").value,
                        "nick_name": document.getElementById("update_user_nickname").value,
                        "gender":  document.getElementById("update_user_gender").value,
                        "address": document.getElementById("update_user_address").value,
                        "city": document.getElementById("update_user_city").value,
                        "province": document.getElementById("update_user_province").value,
                        "mobile": document.getElementById("update_user_mobile").value,
                        "phone": document.getElementById("update_user_phone").value,
                        "domain_id": data.domain.id,
                        "department_id": data.department.id,
                    }
                    MAKE_REQUEST("PUT", user_api_url, JSON.stringify(payload), true, function(response) {
                        if (response instanceof Error) {
                            alert("Update User failed!")
                            return false;
                        }
                        alert("success")
                        // Refresh the page
                        location.reload();
                    })
                });
            }];
        case 'Add Role':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Name</label>
                            <input id="add_role_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Description</label>
                            <input id="add_role_description" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="add_role_btn" class="btn btn-primary btn-sm ms-auto">ADD ROLE</button>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">Add Feature</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">ID</label>
                            <input id="add_feature_id" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Name</label>
                            <input id="add_feature_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Tag</label>
                            <select id="add_feature_tag" name="tag" class="form-control">
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                                <option value="PATCH">PATCH</option>
                              </select>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Endpoint</label>
                            <input id="add_feature_endpoint" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Description</label>
                            <input id="add_feature_description" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      <hr class="horizontal dark">
                        <div class="col-md-12" hidden>
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Service ID</label>
                            <input id="add_feature_service_id" class="form-control" type="text" value="${web_service_id}" disabled onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      <button id="add_feature_btn" class="btn btn-primary btn-sm ms-auto">ADD FEATURE</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_role_btn").addEventListener('click', function (e) {
                    role_name = document.getElementById("add_role_name").value
                    role_description = document.getElementById("add_role_description").value
                    payload = {
                        "name": role_name,
                        "description": role_description,
                    }
                    MAKE_REQUEST("POST", role_api_url, JSON.stringify(payload), true, function(response) {
                        if (response instanceof Error) {
                            alert("Create new Role failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
                document.getElementById("add_feature_btn").addEventListener('click', function (e) {
                    feature_id = document.getElementById("add_feature_id").value
                    feature_name = document.getElementById("add_feature_name").value
                    feature_tag = document.getElementById("add_feature_tag").value
                    feature_endpoint = document.getElementById("add_feature_endpoint").value
                    feature_description = document.getElementById("add_feature_description").value
                    feature_service_id = document.getElementById("add_feature_service_id").value
                    payload = {
                        "version": "1.0.1",
                        "features": [
                            {
                                "id": feature_id,
                                "name": feature_name,
                                "tag": feature_tag,
                                "endpoint": feature_endpoint,
                                "description": feature_description,
                                "is_deleted": false,
                                "when_deleted_version": "",
                                "when_deleted_time": 0,
                                "is_added": true,
                                "when_added_version": "",
                                "when_added_time": 0,
                                "service_id": feature_service_id
                            }
                        ]
                    }
                    MAKE_REQUEST("POST", feature_api_url, JSON.stringify(payload), true, function(response) {
                        if (response instanceof Error) {
                            alert("Create new Feature failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
            }]
        case 'Update Role':
            MAKE_REQUEST("GET",role_feature_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update Role failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Feature -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].id}">${data[i].id}: [${data[i].tag}] ${data[i].endpoint}</option>`
                }
                document.getElementById("assign_feature_list").innerHTML = options
            })
            return [`
                    <span class="close">&times;</span>
                    <div class="card">
                        <div class="card-header pb-0">
                          <div class="d-flex align-items-center">
                            <p class="mb-0">${title} <b>[${title_extra.name}]</b></p>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label id="delete_feature_name" for="example-text-input" class="form-control-label">${data.name}</label>
                                <label id="delete_feature_id" for="example-text-input" class="form-control-label" hidden>${data.id}</label>
                              </div>
                            </div>
                            <div class="col-md-8">
                              <div class="form-group">
                                <label id="delete_feature_tag" for="example-text-input" class="form-control-label">[${data.tag}]</label>
                                <label id="delete_feature_endpoint" for="example-text-input" class="form-control-label">${data.endpoint}</label>
                              </div>
                            </div>
                          <hr class="horizontal dark">
                          <button id="delete_feature_btn" class="btn btn-warning btn-sm ms-auto">UNASSIGN FEATURE</button>
                        </div>
                      </div>
                    <div class="card">
                        <div class="card-header pb-0">
                          <div class="d-flex align-items-center">
                            <p class="mb-0">Assign Feature <b>[${title_extra.name}]</b></p>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="example-text-input" class="form-control-label">Features</label>
                                    <select id="assign_feature_list"  name="features" class="form-control">
                                        <option disabled selected value> -- Pilih Feature -- </option>
                                    </select>
                              </div>
                            </div>
                          <hr class="horizontal dark">
                          <button id="assign_feature_btn" class="btn btn-info btn-sm ms-auto">Assign Feature</button>
                        </div>
                      </div>
                `, function() {
                    document.getElementById("assign_feature_btn").addEventListener('click', function (e) {
                        role_name = title_extra.id
                        feature_name = document.getElementById("assign_feature_list").value
                        if (feature_name == "") {
                            return
                        }
                        MAKE_REQUEST("POST", assign_feature_api_url.format(role_name), `["${feature_name}"]`, true, function(response) {
                            if (response instanceof Error) {
                                alert("Assign Feature to Role failed!")
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        })
                    });
                    document.getElementById("delete_feature_btn").addEventListener('click', function (e) {
                        role_name = title_extra.id
                        feature_name = document.getElementById("delete_feature_id").textContent
                        MAKE_REQUEST("DELETE", assign_feature_api_url.format(role_name), `["${feature_name}"]`, true, function(response) {
                            if (response instanceof Error) {
                                alert("Remove Feature from Role failed!")
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        })
                    });
                }]
        case 'Bind Role':
            roles = {};
            for(j=0;j<data.roles.length;j++){
                roles[data.roles[j].name] = true;
            }
            MAKE_REQUEST("GET",role_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    console.log(response);
                } else {
                    data = response.data;
                    options = "<option disabled selected value> -- Pilih Role -- </option>"
                    for (i = 0; i < data.length; i++) {
                        if (roles[data[i].name] == true) {
                            continue
                        }
                        options += `<option value="${data[i].id}">${data[i].name}</option>`
                    }
                    document.getElementById("bind_role_name").innerHTML = options
                }
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Username</label>
                            <input id="bind_role_user_name" disabled class="form-control" type="text" value="${str(data.account)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group" hidden>
                            <label for="example-text-input" class="form-control-label">UserID</label>
                            <input id="bind_role_user_id" class="form-control" type="email" value="${str(data.id)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Role Name</label>
                            <select id="bind_role_name" name="tag" class="form-control"></select>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="bind_role_btn" class="btn btn-primary btn-sm ms-auto">BIND</button>
                    </div>
                  </div>
            `,function(){
                document.getElementById("bind_role_btn").addEventListener('click', function (e) {
                    user_id = document.getElementById("bind_role_user_id").value
                    roleObj = document.getElementById("bind_role_name")
                    role_id = roleObj.value
                    role_name = roleObj.options[roleObj.selectedIndex].text
                    MAKE_REQUEST("POST", role_user_bind.format(user_id,role_id,role_name), "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Bind Role to User failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
            }];
        case 'UnBind Role':
            roleOptions = "";
            for(i=0;i<data.roles.length;i++){
                roleOptions += `<option value='${data.roles[i].id}'>${data.roles[i].name}</option>`
            }
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Username</label>
                            <input id="unbind_role_user_name" disabled class="form-control" type="text" value="${str(data.account)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group" hidden>
                            <label for="example-text-input" class="form-control-label">UserID</label>
                            <input id="unbind_role_user_id" class="form-control" type="email" value="${str(data.id)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Role Name</label>
                            <select id="unbind_role_name" name="tag" class="form-control">${roleOptions}</select>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="unbind_role_btn" class="btn btn-warning btn-sm ms-auto">UNBIND</button>
                    </div>
                  </div>
            `,function(){
                document.getElementById("unbind_role_btn").addEventListener('click', function (e) {
                    user_id = document.getElementById("unbind_role_user_id").value
                    roleObj = document.getElementById("unbind_role_name")
                    role_id = roleObj.value
                    role_name = roleObj.options[roleObj.selectedIndex].text
                    MAKE_REQUEST("POST", role_user_unbind.format(user_id,role_id,role_name), "", true, function(response) {
                        if (response instanceof Error) {
                            alert("UnBind Role to User failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
            }];

        case 'Add Product':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Name</label>
                            <input id="add_product_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Category</label>
                            <label for="example-text-input" class="form-control-label">Status</label>
                            <select id="add_product_category" name="product_category" class="form-control">
                                <option value="Material">Material</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Catch">Catch</option>
                                <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Description</label>
                            <textarea id="add_product_description" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Category</label>
                            <input id="add_product_extra_category" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Brand</label>
                            <input id="add_product_brand" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Price</label>
                            <input id="add_product_price" class="form-control" type="number" value="0" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Unit of Measurement</label>
                            <input id="add_product_unit_of_measurement" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Quantity in Stock</label>
                            <input id="add_product_quantity_in_stock" class="form-control" type="number" value="0" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Supplier Name</label>
                            <input id="add_product_supplier_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Supplier Contact</label>
                            <input id="add_product_supplier_contact" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Image</label>
                            <input id="add_product_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Status</label>
                            <select id="add_product_availability_status" name="availability_status" class="form-control">
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                                <option value="Backordered">Backordered</option>
                                <option value="Discontinued">Discontinued</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Keywords</label>
                            <input id="add_product_keywords" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Notes</label>
                            <input id="add_product_notes" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="add_product_btn" class="btn btn-primary btn-sm ms-auto">ADD PRODUCT</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_product_btn").addEventListener('click', function (e) {
                    product_name = document.getElementById("add_product_name").value;
                    product_category = document.getElementById("add_product_category").value;
                    product_description = document.getElementById("add_product_description").value;
                    product_extra_category = document.getElementById("add_product_extra_category").value;
                    product_brand = document.getElementById("add_product_brand").value;
                    product_price = parseFloat(document.getElementById("add_product_price").value);
                    product_unit_of_measurement = document.getElementById("add_product_unit_of_measurement").value;
                    product_quantity_in_stock = parseInt(document.getElementById("add_product_quantity_in_stock").value);
                    product_supplier_name = document.getElementById("add_product_supplier_name").value;
                    product_supplier_contact = document.getElementById("add_product_supplier_contact").value;
                    product_image_file = document.getElementById("add_product_image").files[0];
                    product_availability_status = document.getElementById("add_product_availability_status").value;
                    product_keywords = document.getElementById("add_product_keywords").value;
                    product_notes = document.getElementById("add_product_notes").value;

                    function update() {
                        blobText = ""
                        if (product_image_file != undefined) {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "product_name": product_name,
                            "product_category": product_category,
                            "description": product_description,
                            "category": product_extra_category,
                            "brand": product_brand,
                            "price": product_price,
                            "unit_of_measurement": product_unit_of_measurement,
                            "quantity_in_stock": product_quantity_in_stock,
                            "supplier_name": product_supplier_name,
                            "supplier_contact": product_supplier_contact,
                            "product_image": blobText, // Just an example, you may need to handle image upload differently
                            "availability_status": product_availability_status,
                            "keywords": product_keywords,
                            "notes": product_notes,
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", product_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new product!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    if (product_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(product_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Vessel':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_name" class="form-control-label">Vessel Name</label>
                            <input id="vessel_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_type" class="form-control-label">Vessel Type</label>
                            <input id="vessel_type" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="registration_number" class="form-control-label">Registration Number</label>
                            <input id="registration_number" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="owner" class="form-control-label">Owner</label>
                            <input id="owner" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="home_port" class="form-control-label">Home Port</label>
                            <input id="home_port" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="flag" class="form-control-label">Flag</label>
                            <input id="flag" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="length" class="form-control-label">Length</label>
                            <input id="length" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="gross_tonnage" class="form-control-label">Gross Tonnage</label>
                            <input id="gross_tonnage" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="year_built" class="form-control-label">Year Built</label>
                            <input id="year_built" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="capacity" class="form-control-label">Capacity</label>
                            <input id="capacity" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="gear_type" class="form-control-label">Gear Type</label>
                            <input id="gear_type" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="engine_power" class="form-control-label">Engine Power</label>
                            <input id="engine_power" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="last_inspection_date" class="form-control-label">Last Inspection Date</label>
                            <input id="last_inspection_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="insurance_policy_number" class="form-control-label">Insurance Policy Number</label>
                            <input id="insurance_policy_number" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="insurance_expiration_date" class="form-control-label">Insurance Expiration Date</label>
                            <input id="insurance_expiration_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="crew_size" class="form-control-label">Crew Size</label>
                            <input id="crew_size" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="active_status" class="form-control-label">Active Status</label>
                            <select id="active_status" class="form-control">
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Decommissioned">Decommissioned</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="fisheries_permits" class="form-control-label">Fisheries Permits</label>
                            <input id="fisheries_permits" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="fisheries_associations" class="form-control-label">Fisheries Associations</label>
                            <input id="fisheries_associations" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="safety_equipment" class="form-control-label">Safety Equipment</label>
                            <input id="safety_equipment" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="vessel_image" class="form-control-label">Vessel Image</label>
                            <input id="vessel_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_vessel_btn" class="btn btn-primary btn-sm ms-auto">ADD VESSEL</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_vessel_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let vessel_name = document.getElementById("vessel_name").value;
                    let vessel_type = document.getElementById("vessel_type").value;
                    let registration_number = document.getElementById("registration_number").value;
                    let owner = document.getElementById("owner").value;
                    let home_port = document.getElementById("home_port").value;
                    let flag = document.getElementById("flag").value;
                    let length = parseFloat(document.getElementById("length").value);
                    let gross_tonnage = parseFloat(document.getElementById("gross_tonnage").value);
                    let year_built = parseInt(document.getElementById("year_built").value);
                    let capacity = parseFloat(document.getElementById("capacity").value);
                    let gear_type = document.getElementById("gear_type").value;
                    let engine_power = parseFloat(document.getElementById("engine_power").value);
                    let last_inspection_date = document.getElementById("last_inspection_date").value+"T00:00:00Z";
                    let insurance_policy_number = document.getElementById("insurance_policy_number").value;
                    let insurance_expiration_date = document.getElementById("insurance_expiration_date").value+"T00:00:00Z";
                    let crew_size = parseInt(document.getElementById("crew_size").value);
                    let active_status = document.getElementById("active_status").value;
                    let fisheries_permits = document.getElementById("fisheries_permits").value;
                    let fisheries_associations = document.getElementById("fisheries_associations").value;
                    let safety_equipment = document.getElementById("safety_equipment").value;
                    let vessel_image_file = document.getElementById("vessel_image").files[0];
                    let notes = document.getElementById("notes").value;

                    function update() {
                        blobText = ""
                        if (vessel_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "vessel_name": vessel_name,
                            "vessel_type": vessel_type,
                            "registration_number": registration_number,
                            "owner": owner,
                            "home_port": home_port,
                            "flag": flag,
                            "length": length,
                            "gross_tonnage": gross_tonnage,
                            "year_built": year_built,
                            "capacity": capacity,
                            "gear_type": gear_type,
                            "engine_power": engine_power,
                            "last_inspection_date": last_inspection_date,
                            "insurance_policy_number": insurance_policy_number,
                            "insurance_expiration_date": insurance_expiration_date,
                            "crew_size": crew_size,
                            "active_status": active_status,
                            "fisheries_permits": fisheries_permits,
                            "fisheries_associations": fisheries_associations,
                            "safety_equipment": safety_equipment,
                            "vessel_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", vessel_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new vessel!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (vessel_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(vessel_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Stock':
            MAKE_REQUEST("GET",product_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add stock get product list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Product -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].product_id}">${data[i].product_name}</option>`
                }
                document.getElementById("assign_product_list").innerHTML = options
            })
            MAKE_REQUEST("GET",people_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Stock get people list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Person -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].person_id}">${str(data[i].first_name)} ${str(data[i].last_name)}</option>`
                }
                document.getElementById("assign_supplier_list").innerHTML = options
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="product_id" class="form-control-label">Product ID</label>
                            <select id="assign_product_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="quantity" class="form-control-label">Quantity</label>
                            <input id="quantity" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="location" class="form-control-label">Location</label>
                            <input id="location" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="batch_serial_number" class="form-control-label">Batch/Serial Number</label>
                            <input id="batch_serial_number" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="expiration_date" class="form-control-label">Expiration Date</label>
                            <input id="expiration_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="cost_price" class="form-control-label">Cost Price</label>
                            <input id="cost_price" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="selling_price" class="form-control-label">Selling Price</label>
                            <input id="selling_price" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="supplier_id" class="form-control-label">Supplier ID</label>
                            <select id="assign_supplier_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="transaction_type" class="form-control-label">Transaction Type</label>
                            <select id="transaction_type" class="form-control">
                              <option value="Purchase">Purchase</option>
                              <option value="Sale">Sale</option>
                              <option value="Return">Return</option>
                              <option value="COLDSTORAGE">Cold Storage</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="reference_id" class="form-control-label">Reference ID</label>
                            <input id="reference_id" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="stock_image" class="form-control-label">Stock Image</label>
                            <input id="stock_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_stock_btn" class="btn btn-primary btn-sm ms-auto">ADD STOCK</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_stock_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let product_id = document.getElementById("assign_product_list").value;
                    let quantity = parseInt(document.getElementById("quantity").value);
                    let location = document.getElementById("location").value;
                    let batch_serial_number = document.getElementById("batch_serial_number").value;
                    let expiration_date = document.getElementById("expiration_date").value+"T00:00:00Z";
                    let cost_price = parseFloat(document.getElementById("cost_price").value);
                    let selling_price = parseFloat(document.getElementById("selling_price").value);
                    let supplier_id = document.getElementById("assign_supplier_list").value;
                    let transaction_type = document.getElementById("transaction_type").value;
                    let reference_id = document.getElementById("reference_id").value;
                    let notes = document.getElementById("notes").value;
                    let stock_image_file = document.getElementById("stock_image").files[0];

                    function update() {
                        blobText = ""
                        if (stock_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "product_id": product_id,
                            "quantity": quantity,
                            "location": location,
                            "batch_serial_number": batch_serial_number,
                            "expiration_date": expiration_date,
                            "cost_price": cost_price,
                            "selling_price": selling_price,
                            "supplier_id": supplier_id,
                            "transaction_type": transaction_type,
                            "reference_id": reference_id,
                            "notes": notes,
                            "stock_image": blobText
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", stock_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new stock entry!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (stock_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(stock_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Person':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="first_name" class="form-control-label">First Name</label>
                            <input id="first_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="last_name" class="form-control-label">Last Name</label>
                            <input id="last_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="person_category" class="form-control-label">Person Category</label>
                            <select id="person_category" class="form-control">
                                <option value="Reguler">Reguler</option>
                                <option value="PT">PT</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="email" class="form-control-label">Email</label>
                            <input id="email" class="form-control" type="email" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="phone_number" class="form-control-label">Phone Number</label>
                            <input id="phone_number" class="form-control" type="tel" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="address" class="form-control-label">Address</label>
                            <input id="address" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="city" class="form-control-label">City</label>
                            <input id="city" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="state" class="form-control-label">State</label>
                            <input id="state" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="country" class="form-control-label">Country</label>
                            <input id="country" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="postal_code" class="form-control-label">Postal Code</label>
                            <input id="postal_code" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="person_image" class="form-control-label">Person Image</label>
                            <input id="person_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_person_btn" class="btn btn-primary btn-sm ms-auto">ADD PERSON</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_person_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let person_category = document.getElementById("person_category").value;
                    let first_name = document.getElementById("first_name").value;
                    let last_name = document.getElementById("last_name").value;
                    let email = document.getElementById("email").value;
                    let phone_number = document.getElementById("phone_number").value;
                    let address = document.getElementById("address").value;
                    let city = document.getElementById("city").value;
                    let state = document.getElementById("state").value;
                    let country = document.getElementById("country").value;
                    let postal_code = document.getElementById("postal_code").value;
                    let person_image_file = document.getElementById("person_image").files[0];
                    let notes = document.getElementById("notes").value;

                    function update() {
                        blobText = ""
                        if (person_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "person_category": person_category,
                            "first_name": first_name,
                            "last_name": last_name,
                            "email": email,
                            "phone_number": phone_number,
                            "address": address,
                            "city": city,
                            "state": state,
                            "country": country,
                            "postal_code": postal_code,
                            "person_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", people_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new person!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (person_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(person_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Trip':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Trip get vessel list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Vessel -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].vessel_id}">${data[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = options
            })
            MAKE_REQUEST("GET",people_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Trip get people list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Person -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].person_id}">${str(data[i].first_name)} ${str(data[i].last_name)}</option>`
                }
                document.getElementById("assign_captain_list").innerHTML = options
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="trip_name" class="form-control-label">Trip Name</label>
                            <input id="trip_name" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="departure_date" class="form-control-label">Departure Date</label>
                            <input id="departure_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="return_date" class="form-control-label">Return Date</label>
                            <input id="return_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="departure_port" class="form-control-label">Departure Port</label>
                            <input id="departure_port" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="destination_port" class="form-control-label">Destination Port</label>
                            <input id="destination_port" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="captain_id" class="form-control-label">Captain ID</label>
                            <select id="assign_captain_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="trip_image" class="form-control-label">Trip Image</label>
                            <input id="trip_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_trip_btn" class="btn btn-primary btn-sm ms-auto">ADD TRIP</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_trip_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let trip_name = document.getElementById("trip_name").value;
                    let departure_date = document.getElementById("departure_date").value+"T00:00:00Z";
                    let return_date = document.getElementById("return_date").value+"T00:00:00Z";
                    let departure_port = document.getElementById("departure_port").value;
                    let destination_port = document.getElementById("destination_port").value;
                    let captain_id = document.getElementById("assign_captain_list").value;
                    let vessel_id = document.getElementById("assign_vessel_list").value;
                    let trip_image_file = document.getElementById("trip_image").files[0];
                    let notes = document.getElementById("notes").value;

                    function update() {
                        blobText = ""
                        if (trip_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "trip_name": trip_name,
                            "departure_date": departure_date,
                            "return_date": return_date,
                            "departure_port": departure_port,
                            "destination_port": destination_port,
                            "captain_id": captain_id,
                            "vessel_id": vessel_id,
                            "trip_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", trip_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new trip!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (trip_image_file != undefined ) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(trip_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Transaction':
            MAKE_REQUEST("GET",product_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add transaction get product list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Product -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].product_id}">${data[i].product_name}</option>`
                }
                document.getElementById("assign_product_list").innerHTML = options
            })
            MAKE_REQUEST("GET",people_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add transaction get people list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Person -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].person_id}">${str(data[i].first_name)} ${str(data[i].last_name)}</option>`
                }
                document.getElementById("assign_buyer_list").innerHTML = options
                document.getElementById("assign_seller_list").innerHTML = options
            })
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add transaction get vessel list failed!")
                    return
                }
                data = response.data;
                options = "<option selected value=''> -- Pilih Vessel -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].vessel_id}">${data[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = options
            })
            MAKE_REQUEST("GET",trip_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add transaction get trip list failed!")
                    return
                }
                data = response.data;
                options = "<option selected value=''> -- Pilih Trip -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].trip_id}">${data[i].trip_name}</option>`
                }
                document.getElementById("assign_trip_list").innerHTML = options
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="transaction_date" class="form-control-label">Transaction Date</label>
                            <input id="transaction_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="transaction_type" class="form-control-label">Transaction Type</label>
                            <select id="transaction_type" class="form-control">
                                <option value="Purchase">Purchase</option>
                                <option value="Sale">Sale</option>
                                <option value="Return">Return</option>
                                <option value="Debt">Debt</option>
                                <option value="Tax">Tax</option>
                                <option value="Salary">Salary</option>
                                <option value="ColdStorage">Cold Storage</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="product_id" class="form-control-label">product ID</label>
                            <select id="assign_product_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="quantity" class="form-control-label">Quantity</label>
                            <input id="quantity" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)" onchange="updateTotalPrice()">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="unit_price" class="form-control-label">Unit Price</label>
                            <input id="unit_price" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)" onchange="updateTotalPrice()">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="total_price" class="form-control-label">Total Price</label>
                            <input id="total_price" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="seller_id" class="form-control-label">Seller ID</label>
                            <select id="assign_seller_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="buyer_id" class="form-control-label">Buyer ID</label>
                            <select id="assign_buyer_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="trip_id" class="form-control-label">Trip ID</label>
                            <select id="assign_trip_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="payment_type" class="form-control-label">Payment Type</label>
                            <select id="payment_type" class="form-control">
                                <option value="CASH">CASH</option>
                                <option value="DEBT">DEBT</option>
                                <option value="GIRO">GIRO</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="payment_status" class="form-control-label">Payment Status</label>
                            <select id="payment_status" class="form-control">
                                <option value="0">PENDING</option>
                                <option value="1">DONE</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="transaction_image" class="form-control-label">Transaction Image</label>
                            <input id="transaction_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_transaction_btn" class="btn btn-primary btn-sm ms-auto">ADD TRANSACTION</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_transaction_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let transaction_date = document.getElementById("transaction_date").value+"T00:00:00Z";
                    let transaction_type = document.getElementById("transaction_type").value;
                    let product_id = document.getElementById("assign_product_list").value;
                    let quantity = parseInt(document.getElementById("quantity").value);
                    let unit_price = parseFloat(document.getElementById("unit_price").value);
                    let total_price = parseFloat(document.getElementById("total_price").value);
                    let seller_id = document.getElementById("assign_seller_list").value;
                    let buyer_id = document.getElementById("assign_buyer_list").value;
                    let vessel_id = document.getElementById("assign_vessel_list").value;
                    let trip_id = document.getElementById("assign_trip_list").value;
                    let payment_type = document.getElementById("payment_type").value;
                    let payment_status = parseInt(document.getElementById("payment_status").value);
                    let transaction_image_file = document.getElementById("transaction_image").files[0];
                    let notes = document.getElementById("notes").value;

                    // Calculate total price
                    total_price = parseFloat(quantity) * parseFloat(unit_price);
                    document.getElementById("total_price").value = total_price;

                    function update() {
                        blobText = ""
                        if (transaction_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "transaction_date": transaction_date,
                            "transaction_type": transaction_type,
                            "product_id": product_id,
                            "quantity": quantity,
                            "unit_price": unit_price,
                            "total_price": total_price,
                            "seller_id": seller_id,
                            "buyer_id": buyer_id,
                            "vessel_id": vessel_id,
                            "trip_id": trip_id,
                            "payment_type": payment_type,
                            "payment_status": payment_status,
                            "transaction_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", transaction_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new transaction!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (transaction_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(transaction_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Maintenance':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Catch get vessel list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Vessel -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].vessel_id}">${data[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = options
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="maintenance_date" class="form-control-label">Maintenance Date</label>
                            <input id="maintenance_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="task_description" class="form-control-label">Task Description</label>
                            <textarea id="task_description" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="parts_used" class="form-control-label">Parts Used</label>
                            <textarea id="parts_used" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="cost" class="form-control-label">Cost</label>
                            <input id="cost" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="maintenance_image" class="form-control-label">Maintenance Image</label>
                            <input id="maintenance_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_maintenance_btn" class="btn btn-primary btn-sm ms-auto">ADD MAINTENANCE</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_maintenance_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let maintenance_date = document.getElementById("maintenance_date").value+"T00:00:00Z";
                    let task_description = document.getElementById("task_description").value;
                    let parts_used = document.getElementById("parts_used").value;
                    let cost = parseInt(document.getElementById("cost").value);
                    let vessel_id = document.getElementById("assign_vessel_list").value;
                    let maintenance_image_file = document.getElementById("maintenance_image").files[0];
                    let notes = document.getElementById("notes").value;

                    function update() {
                        blobText = ""
                        if (maintenance_image_file != undefined) {
                            blobText = reader.result
                        }

                        // Construct payload
                        let payload = {
                            "maintenance_date": maintenance_date,
                            "task_description": task_description,
                            "parts_used": parts_used,
                            "cost": cost,
                            "vessel_id": vessel_id,
                            "maintenance_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", maintenance_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new maintenance!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (maintenance_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(maintenance_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Add Catch':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Catch get vessel list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Vessel -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].vessel_id}">${data[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = options
            })
            MAKE_REQUEST("GET",trip_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Catch get trip list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Trip -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].trip_id}">${data[i].trip_name}</option>`
                }
                document.getElementById("assign_trip_list").innerHTML = options
            })
            MAKE_REQUEST("GET",product_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Add Catch get product list failed!")
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Product -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].product_id}">${data[i].product_name}</option>`
                }
                document.getElementById("assign_product_list").innerHTML = options
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="catch_date" class="form-control-label">Catch Date</label>
                            <input id="catch_date" class="form-control" type="date" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="product_id" class="form-control-label">Product ID</label>
                            <select id="assign_product_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="catch_location" class="form-control-label">Catch Location</label>
                            <input id="catch_location" class="form-control" type="text" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="catch_quantity" class="form-control-label">Catch Quantity</label>
                            <input id="catch_quantity" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="trip_id" class="form-control-label">Trip ID</label>
                            <select id="assign_trip_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="catch_image" class="form-control-label">Catch Image</label>
                            <input id="catch_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="notes" class="form-control-label">Notes</label>
                            <textarea id="notes" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)"></textarea>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="add_catch_btn" class="btn btn-primary btn-sm ms-auto">ADD CATCH</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("add_catch_btn").addEventListener('click', function (e) {
                    // Retrieve input values
                    let product_id = document.getElementById("assign_product_list").value;
                    let catch_date = document.getElementById("catch_date").value+"T00:00:00Z";
                    let catch_location = document.getElementById("catch_location").value;
                    let catch_quantity = parseInt(document.getElementById("catch_quantity").value);
                    let vessel_id = document.getElementById("assign_vessel_list").value;
                    let trip_id = document.getElementById("assign_trip_list").value;
                    let catch_image_file = document.getElementById("catch_image").files[0];
                    let notes = document.getElementById("notes").value;

                     function update() {
                         blobText = ""
                         if (catch_image_file != undefined) {
                             blobText = reader.result
                         }

                        // Construct payload
                        let payload = {
                            "product_id": product_id,
                            "catch_date": catch_date,
                            "catch_location": catch_location,
                            "catch_quantity": catch_quantity,
                            "vessel_id": vessel_id,
                            "trip_id": trip_id,
                            "catch_image": blobText,
                            "notes": notes
                        };

                        // Send payload to server
                        MAKE_REQUEST("POST", catch_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new catch!");
                                return false;
                            }
                            // Refresh the page or perform other actions
                            location.reload();
                        });
                    }

                    if (catch_image_file != undefined) {
                        // process image uploaded file to BLOB
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(catch_image_file);
                    } else {
                        update()
                    }
                });
            }]

        case 'Update Product':
            ordered_product_category = reorderSelectOptions([
                '<option value="Material">Material</option>',
                '<option value="Equipment">Equipment</option>',
                '<option value="Catch">Catch</option>',
                '<option value="Other">Other</option>',
            ], data.product_category)

            ordered_product_availability_status = reorderSelectOptions([
                '<option value="In Stock">In Stock</option>',
                '<option value="Out of Stock">Out of Stock</option>',
                '<option value="Backordered">Backordered</option>',
                '<option value="Discontinued">Discontinued</option>',
            ], data.availability_status)

            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Name</label>
                            <input id="update_product_id" class="form-control" type="text" value="${data.product_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input id="update_product_name" class="form-control" type="text" value="${data.product_name}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Category</label>
                            <select id="update_product_category" name="product_category" class="form-control" value="${str(data.product_category)}">
                                ${ordered_product_category}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Description</label>
                            <textarea id="update_product_description" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)" >${str(data.description)}</textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Category</label>
                            <input id="update_product_extra_category" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.category)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Brand</label>
                            <input id="update_product_brand" class="form-control" type="text"  onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.brand)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Price</label>
                            <input id="update_product_price" class="form-control" type="number" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.price)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Unit of Measurement</label>
                            <input id="update_product_unit_of_measurement" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.unit_of_measurement)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Quantity in Stock</label>
                            <input id="update_product_quantity_in_stock" class="form-control" type="number" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.quantity_in_stock)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Supplier Name</label>
                            <input id="update_product_supplier_name" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.supplier_name)}">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Supplier Contact</label>
                            <input id="update_product_supplier_contact" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.supplier_contact)}">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product Image</label>
                            <input id="update_product_image_old" class="form-control" type="text" hidden value="${str(data.product_image)}">
                            <input id="update_product_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Status</label>
                            <select id="update_product_availability_status" name="availability_status" class="form-control">${ordered_product_availability_status}</select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Keywords</label>
                            <input id="update_product_keywords" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.keywords)}">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Notes</label>
                            <input id="update_product_notes" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.notes)}">
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="update_product_btn" class="btn btn-primary btn-sm ms-auto">UPDATE PRODUCT</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_product_btn").addEventListener('click', function (e) {
                    product_id = document.getElementById("update_product_id").value;
                    product_name = document.getElementById("update_product_name").value;
                    product_category = document.getElementById("update_product_category").value;
                    product_description = document.getElementById("update_product_description").value;
                    product_extra_category = document.getElementById("update_product_extra_category").value;
                    product_brand = document.getElementById("update_product_brand").value;
                    product_price = parseFloat(document.getElementById("update_product_price").value);
                    product_unit_of_measurement = document.getElementById("update_product_unit_of_measurement").value;
                    product_quantity_in_stock = parseInt(document.getElementById("update_product_quantity_in_stock").value);
                    product_supplier_name = document.getElementById("update_product_supplier_name").value;
                    product_supplier_contact = document.getElementById("update_product_supplier_contact").value;
                    product_image_file = document.getElementById("update_product_image").files[0];
                    product_availability_status = document.getElementById("update_product_availability_status").value;
                    product_keywords = document.getElementById("update_product_keywords").value;
                    product_notes = document.getElementById("update_product_notes").value;

                    function update() {
                        blobText = ""
                        if (product_image_file == undefined) {
                            blobText = document.getElementById("update_product_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "product_id": product_id,
                            "product_name": product_name,
                            "product_category": product_category,
                            "description": product_description,
                            "category": product_extra_category,
                            "brand": product_brand,
                            "price": product_price,
                            "unit_of_measurement": product_unit_of_measurement,
                            "quantity_in_stock": product_quantity_in_stock,
                            "supplier_name": product_supplier_name,
                            "supplier_contact": product_supplier_contact,
                            "product_image": blobText, // Just an example, you may need to handle image upload differently
                            "availability_status": product_availability_status,
                            "keywords": product_keywords,
                            "notes": product_notes,
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", product_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to add new product!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (product_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(product_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Vessel':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Vessel Name</label>
                            <input id="update_vessel_id" class="form-control" type="text" value="${data.vessel_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input id="update_vessel_name" class="form-control" type="text" value="${data.vessel_name}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Vessel Type</label>
                            <input id="update_vessel_type" name="vessel_type" type="text" class="form-control" value="${data.vessel_type}">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Registration Number</label>
                            <input id="update_vessel_registration_number" class="form-control" type="text" value="${data.registration_number}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Owner</label>
                            <input id="update_vessel_owner" class="form-control" type="text" value="${data.owner}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Home Port</label>
                            <input id="update_vessel_home_port" class="form-control" type="text" value="${data.home_port}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Flag</label>
                            <input id="update_vessel_flag" class="form-control" type="text" value="${data.flag}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Length</label>
                            <input id="update_vessel_length" class="form-control" type="number" value="${data.length}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Gross Tonnage</label>
                            <input id="update_vessel_gross_tonnage" class="form-control" type="number" value="${data.gross_tonnage}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Year Built</label>
                            <input id="update_vessel_year_built" class="form-control" type="number" value="${data.year_built}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Capacity</label>
                            <input id="update_vessel_capacity" class="form-control" type="number" value="${data.capacity}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Gear Type</label>
                            <input id="update_vessel_gear_type" class="form-control" type="text" value="${data.gear_type}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Engine Power</label>
                            <input id="update_vessel_engine_power" class="form-control" type="number" value="${data.engine_power}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Last Inspection Date</label>
                            <input id="update_vessel_last_inspection_date" class="form-control" type="date" value="${data.last_inspection_date}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Insurance Policy Number</label>
                            <input id="update_vessel_insurance_policy_number" class="form-control" type="text" value="${data.insurance_policy_number}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Insurance Expiration Date</label>
                            <input id="update_vessel_insurance_expiration_date" class="form-control" type="date" value="${data.insurance_expiration_date}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Crew Size</label>
                            <input id="update_vessel_crew_size" class="form-control" type="number" value="${data.crew_size}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Active Status</label>
                            <input id="update_vessel_active_status" name="active_status" type="text" class="form-control" value="${data.active_status}">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Fisheries Permits</label>
                            <input id="update_vessel_fisheries_permits" class="form-control" type="text" value="${data.fisheries_permits}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Fisheries Associations</label>
                            <input id="update_vessel_fisheries_associations" class="form-control" type="text" value="${data.fisheries_associations}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Safety Equipment</label>
                            <input id="update_vessel_safety_equipment" class="form-control" type="text" value="${data.safety_equipment}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Vessel Image</label>
                            <input id="update_vessel_image_old" class="form-control" type="text" hidden value="${data.vessel_image}">
                            <input id="update_vessel_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Notes</label>
                            <input id="update_vessel_notes" class="form-control" type="text" value="${data.notes}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_vessel_btn" class="btn btn-primary btn-sm ms-auto">UPDATE VESSEL</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_vessel_btn").addEventListener('click', function (e) {
                    vessel_id = document.getElementById("update_vessel_id").value;
                    vessel_name = document.getElementById("update_vessel_name").value;
                    vessel_type = document.getElementById("update_vessel_type").value;
                    registration_number = document.getElementById("update_vessel_registration_number").value;
                    owner = document.getElementById("update_vessel_owner").value;
                    home_port = document.getElementById("update_vessel_home_port").value;
                    flag = document.getElementById("update_vessel_flag").value;
                    length = parseFloat(document.getElementById("update_vessel_length").value);
                    gross_tonnage = parseFloat(document.getElementById("update_vessel_gross_tonnage").value);
                    year_built = parseInt(document.getElementById("update_vessel_year_built").value);
                    capacity = parseFloat(document.getElementById("update_vessel_capacity").value);
                    gear_type = document.getElementById("update_vessel_gear_type").value;
                    engine_power = parseFloat(document.getElementById("update_vessel_engine_power").value);
                    last_inspection_date = document.getElementById("update_vessel_last_inspection_date").value;
                    insurance_policy_number = document.getElementById("update_vessel_insurance_policy_number").value;
                    insurance_expiration_date = document.getElementById("update_vessel_insurance_expiration_date").value;
                    crew_size = parseInt(document.getElementById("update_vessel_crew_size").value);
                    active_status = document.getElementById("update_vessel_active_status").value;
                    fisheries_permits = document.getElementById("update_vessel_fisheries_permits").value;
                    fisheries_associations = document.getElementById("update_vessel_fisheries_associations").value;
                    safety_equipment = document.getElementById("update_vessel_safety_equipment").value;
                    vessel_image_file = document.getElementById("update_vessel_image").files[0];
                    notes = document.getElementById("update_vessel_notes").value;

                    function update() {
                        blobText = ""
                        if (vessel_image_file == undefined) {
                            blobText = document.getElementById("update_vessel_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "vessel_id": vessel_id,
                            "vessel_name": vessel_name,
                            "vessel_type": vessel_type,
                            "registration_number": registration_number,
                            "owner": owner,
                            "home_port": home_port,
                            "flag": flag,
                            "length": length,
                            "gross_tonnage": gross_tonnage,
                            "year_built": year_built,
                            "capacity": capacity,
                            "gear_type": gear_type,
                            "engine_power": engine_power,
                            "last_inspection_date": last_inspection_date,
                            "insurance_policy_number": insurance_policy_number,
                            "insurance_expiration_date": insurance_expiration_date,
                            "crew_size": crew_size,
                            "active_status": active_status,
                            "fisheries_permits": fisheries_permits,
                            "fisheries_associations": fisheries_associations,
                            "safety_equipment": safety_equipment,
                            "vessel_image": blobText, // Just an example, you may need to handle image upload differently
                            "notes": notes,
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", vessel_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update vessel!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (vessel_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(vessel_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Stock':
            ordered_transaction_type = reorderSelectOptions([
                '<option value="Purchase">Purchase</option>',
                '<option value="Sale">Sale</option>',
                '<option value="Return">Return</option>',
                '<option value="COLDSTORAGE">Cold Storage</option>',
            ], data.transaction_type);

            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Product ID</label>
                            <input id="update_stock_id" class="form-control" type="text" value="${data.stock_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input id="update_product_id" class="form-control" type="text" value="${data.product_id}" onfocus="focused(this)" onfocusout="defocused(this)" disabled>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Quantity</label>
                            <input id="update_stock_quantity" class="form-control" type="number" value="${data.quantity}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Location</label>
                            <input id="update_stock_location" class="form-control" type="text" value="${data.location}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Batch/Serial Number</label>
                            <input id="update_stock_batch_serial_number" class="form-control" type="text" value="${data.batch_serial_number}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Expiration Date</label>
                            <input id="update_stock_expiration_date" class="form-control" type="date" value="${data.expiration_date.replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Cost Price</label>
                            <input id="update_stock_cost_price" class="form-control" type="number" value="${data.cost_price}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Selling Price</label>
                            <input id="update_stock_selling_price" class="form-control" type="number" value="${data.selling_price}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Supplier ID</label>
                            <input id="update_stock_supplier_id" class="form-control" type="text" value="${data.supplier_id}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Transaction Type</label>
                            <select id="update_stock_transaction_type" name="transaction_type" class="form-control">
                                ${ordered_transaction_type}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Reference ID</label>
                            <input id="update_stock_reference_id" class="form-control" type="text" value="${data.reference_id}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Notes</label>
                            <input id="update_stock_notes" class="form-control" type="text" value="${data.notes}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Stock Image</label>
                            <input id="update_stock_image_old" class="form-control" type="text" hidden value="${data.stock_image}">
                            <input id="update_stock_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_stock_btn" class="btn btn-primary btn-sm ms-auto">UPDATE STOCK</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_stock_btn").addEventListener('click', function (e) {
                    stock_id = document.getElementById("update_stock_id").value;
                    product_id = document.getElementById("update_product_id").value;
                    quantity = parseInt(document.getElementById("update_stock_quantity").value);
                    stock_location = document.getElementById("update_stock_location").value;
                    batch_serial_number = document.getElementById("update_stock_batch_serial_number").value;
                    expiration_date = document.getElementById("update_stock_expiration_date").value+"T00:00:00Z";
                    cost_price = parseFloat(document.getElementById("update_stock_cost_price").value);
                    selling_price = parseFloat(document.getElementById("update_stock_selling_price").value);
                    supplier_id = document.getElementById("update_stock_supplier_id").value;
                    transaction_type = document.getElementById("update_stock_transaction_type").value;
                    reference_id = document.getElementById("update_stock_reference_id").value;
                    notes = document.getElementById("update_stock_notes").value;
                    stock_image_file = document.getElementById("update_stock_image").files[0];

                    function update() {
                        blobText = ""
                        if (stock_image_file == undefined) {
                            blobText = document.getElementById("update_stock_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "stock_id": stock_id,
                            "product_id": product_id,
                            "quantity": quantity,
                            "location": stock_location,
                            "batch_serial_number": batch_serial_number,
                            "expiration_date": expiration_date,
                            "cost_price": cost_price,
                            "selling_price": selling_price,
                            "supplier_id": supplier_id,
                            "transaction_type": transaction_type,
                            "reference_id": reference_id,
                            "notes": notes,
                            "stock_image": blobText, // Just an example, you may need to handle image upload differently
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", stock_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update stock entry!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (stock_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(stock_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Person':
            ordered_person_category = reorderSelectOptions([
                '<option value="Reguler">Reguler</option>',
                '<option value="PT">PT</option>',
            ], data.person_category);

            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">First Name</label>
                            <input id="update_person_id" class="form-control" type="text" value="${data.person_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input id="update_person_first_name" class="form-control" type="text" value="${str(data.first_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Last Name</label>
                            <input id="update_person_last_name" class="form-control" type="text" value="${str(data.last_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Category</label>
                            <select id="update_person_category" class="form-control"> ${ordered_person_category}</select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Email</label>
                            <input id="update_person_email" class="form-control" type="email" value="${str(data.email)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Phone Number</label>
                            <input id="update_person_phone_number" class="form-control" type="tel" value="${str(data.phone_number)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Address</label>
                            <input id="update_person_address" class="form-control" type="text" value="${str(data.address)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">City</label>
                            <input id="update_person_city" class="form-control" type="text" value="${str(data.city)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">State</label>
                            <input id="update_person_state" class="form-control" type="text" value="${str(data.state)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Country</label>
                            <input id="update_person_country" class="form-control" type="text" value="${str(data.country)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Postal Code</label>
                            <input id="update_person_postal_code" class="form-control" type="text" value="${str(data.postal_code)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Person Image</label>
                            <input id="update_person_image_old" class="form-control" type="text" hidden value="${str(data.person_image)}">
                            <input id="update_person_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Notes</label>
                            <input id="update_person_notes" class="form-control" type="text" onfocus="focused(this)" onfocusout="defocused(this)" value="${str(data.notes)}">
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="update_person_btn" class="btn btn-primary btn-sm ms-auto">UPDATE PERSON</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_person_btn").addEventListener('click', function (e) {
                    person_id = document.getElementById("update_person_id").value;
                    person_category = document.getElementById("update_person_category").value;
                    person_first_name = document.getElementById("update_person_first_name").value;
                    person_last_name = document.getElementById("update_person_last_name").value;
                    person_email = document.getElementById("update_person_email").value;
                    person_phone_number = document.getElementById("update_person_phone_number").value;
                    person_address = document.getElementById("update_person_address").value;
                    person_city = document.getElementById("update_person_city").value;
                    person_state = document.getElementById("update_person_state").value;
                    person_country = document.getElementById("update_person_country").value;
                    person_postal_code = document.getElementById("update_person_postal_code").value;
                    person_image_file = document.getElementById("update_person_image").files[0];
                    person_notes = document.getElementById("update_person_notes").value;

                    function update() {
                        blobText = ""
                        if (person_image_file == undefined) {
                            blobText = document.getElementById("update_person_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "person_id": person_id,
                            "person_category": person_category,
                            "first_name": person_first_name,
                            "last_name": person_last_name,
                            "email": person_email,
                            "phone_number": person_phone_number,
                            "address": person_address,
                            "city": person_city,
                            "state": person_state,
                            "country": person_country,
                            "postal_code": person_postal_code,
                            "person_image": blobText, // Just an example, you may need to handle image upload differently
                            "notes": person_notes,
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", people_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update person!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (person_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(person_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Trip':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update Trip get vessel list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].vessel_id}">${ddata[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = reorderSelectOptions(options, data.vessel_id)
            })
            MAKE_REQUEST("GET",people_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update trip get people list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].person_id}">${str(ddata[i].first_name)} ${str(ddata[i].last_name)}</option>`
                }
                document.getElementById("assign_captain_list").innerHTML = reorderSelectOptions(options, data.captain_id)
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_trip_id" class="form-control-label">Trip ID</label>
                            <input id="update_trip_id" class="form-control" type="text" value="${data.trip_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input class="form-control" type="text" value="${data.trip_id}" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_trip_name" class="form-control-label">Trip Name</label>
                            <input id="update_trip_name" class="form-control" type="text" value="${str(data.trip_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_departure_date" class="form-control-label">Departure Date</label>
                            <input id="update_departure_date" class="form-control" type="date" value="${str(data.departure_date).replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_return_date" class="form-control-label">Return Date</label>
                            <input id="update_return_date" class="form-control" type="date" value="${str(data.return_date).replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_departure_port" class="form-control-label">Departure Port</label>
                            <input id="update_departure_port" class="form-control" type="text" value="${str(data.departure_port)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_destination_port" class="form-control-label">Destination Port</label>
                            <input id="update_destination_port" class="form-control" type="text" value="${str(data.destination_port)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_captain_id" class="form-control-label">Captain ID</label>
                            <select id="assign_captain_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_notes" class="form-control-label">Notes</label>
                            <input id="update_notes" class="form-control" type="text" value="${str(data.notes)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_trip_image_old" class="form-control-label">Trip Image</label>
                            <input id="update_trip_image_old" class="form-control" type="text" hidden value="${str(data.trip_image)}">
                            <input id="update_trip_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_trip_btn" class="btn btn-primary btn-sm ms-auto">UPDATE TRIP</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_trip_btn").addEventListener('click', function (e) {
                    trip_id = document.getElementById("update_trip_id").value;
                    trip_name = document.getElementById("update_trip_name").value;
                    departure_date = document.getElementById("update_departure_date").value+"T00:00:00Z";
                    return_date = document.getElementById("update_return_date").value+"T00:00:00Z";
                    departure_port = document.getElementById("update_departure_port").value;
                    destination_port = document.getElementById("update_destination_port").value;
                    captain_id = document.getElementById("assign_captain_list").value;
                    vessel_id = document.getElementById("assign_vessel_list").value;
                    notes = document.getElementById("update_notes").value;
                    trip_image_file = document.getElementById("update_trip_image").files[0];

                    function update() {
                        blobText = ""
                        if (trip_image_file == undefined) {
                            blobText = document.getElementById("update_trip_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "trip_id": trip_id,
                            "trip_name": trip_name,
                            "departure_date": departure_date,
                            "return_date": return_date,
                            "departure_port": departure_port,
                            "destination_port": destination_port,
                            "captain_id": captain_id,
                            "vessel_id": vessel_id,
                            "notes": notes,
                            "trip_image": blobText, // Just an example, you may need to handle image upload differently
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", trip_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update trip!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (trip_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(trip_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Transaction':
            MAKE_REQUEST("GET",people_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update transaction get people list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].person_id}">${str(ddata[i].first_name)} ${str(ddata[i].last_name)}</option>`
                }
                document.getElementById("assign_buyer_list").innerHTML = reorderSelectOptions(options, data.buyer_id)
                document.getElementById("assign_seller_list").innerHTML = reorderSelectOptions(options, data.seller_id)
            })
            MAKE_REQUEST("GET",product_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update transaction get product list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].product_id}">${ddata[i].product_name}</option>`
                }
                document.getElementById("assign_product_list").innerHTML = reorderSelectOptions(options, data.product_id)
            })
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update transaction get vessel list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].vessel_id}">${ddata[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = reorderSelectOptions(options, data.vessel_id)
            })
            MAKE_REQUEST("GET",trip_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update transaction get trip list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].trip_id}">${ddata[i].trip_name}</option>`
                }
                document.getElementById("assign_trip_list").innerHTML = reorderSelectOptions(options, data.trip_id)
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_transaction_id" class="form-control-label">Transaction ID</label>
                            <input id="update_transaction_id" class="form-control" type="text" value="${data.transaction_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input class="form-control" type="text" value="${data.transaction_id}" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_transaction_date" class="form-control-label">Transaction Date</label>
                            <input id="update_transaction_date" class="form-control" type="date" value="${str(data.transaction_date).replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_transaction_type" class="form-control-label">Transaction Type</label>
                            <select id="update_transaction_type" class="form-control">
                                <option value="Purchase" ${data.transaction_type === 'Purchase' ? 'selected' : ''}>Purchase</option>
                                <option value="Sale" ${data.transaction_type === 'Sale' ? 'selected' : ''}>Sale</option>
                                <option value="Return" ${data.transaction_type === 'Return' ? 'selected' : ''}>Return</option>
                                <option value="Debt" ${data.transaction_type === 'Debt' ? 'selected' : ''}>Debt</option>
                                <option value="Tax" ${data.transaction_type === 'Tax' ? 'selected' : ''}>Tax</option>
                                <option value="Salary" ${data.transaction_type === 'Salary' ? 'selected' : ''}>Salary</option>
                                <option value="ColdStorage" ${data.transaction_type === 'ColdStorage' ? 'selected' : ''}>Cold Storage</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_product_id" class="form-control-label">Product ID</label>
                            <select id="assign_product_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_quantity" class="form-control-label">Quantity</label>
                            <input id="quantity" class="form-control" type="number" value="${str(data.quantity)}" onfocus="focused(this)" onfocusout="defocused(this)" onchange="updateTotalPrice()">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_unit_price" class="form-control-label">Unit Price</label>
                            <input id="unit_price" class="form-control" type="number" value="${str(data.unit_price)}" onfocus="focused(this)" onfocusout="defocused(this)" onchange="updateTotalPrice()">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_total_price" class="form-control-label">Total Price</label>
                            <input id="total_price" class="form-control" type="number" value="${str(data.total_price)}" onfocus="focused(this)" onfocusout="defocused(this)" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_seller_id" class="form-control-label">Seller ID</label>
                            <select id="assign_seller_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_buyer_id" class="form-control-label">Buyer ID</label>
                            <select id="assign_buyer_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_trip_id" class="form-control-label">Trip ID</label>
                            <select id="assign_trip_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_payment_type" class="form-control-label">Payment Type</label>
                            <select id="update_payment_type" class="form-control">
                                <option value="CASH" ${data.payment_status === 'CASH' ? 'selected' : ''}>CASH</option>
                                <option value="DEBT" ${data.payment_status === 'DEBT' ? 'selected' : ''}>DEBT</option>
                                <option value="GIRO" ${data.payment_status === 'GIRO' ? 'selected' : ''}>GIRO</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_payment_status" class="form-control-label">Payment Status</label>
                            <select id="update_payment_status" class="form-control">
                                <option value="0" ${data.payment_status === 0 ? 'selected' : ''}>PENDING</option>
                                <option value="1" ${data.payment_status === 1 ? 'selected' : ''}>DONE</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_notes" class="form-control-label">Notes</label>
                            <input id="update_notes" class="form-control" type="text" value="${str(data.notes)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_transaction_image_old" class="form-control-label">Transaction Image</label>
                            <input id="update_transaction_image_old" class="form-control" type="text" hidden value="${str(data.transaction_image)}">
                            <input id="update_transaction_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_transaction_btn" class="btn btn-primary btn-sm ms-auto">UPDATE TRANSACTION</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_transaction_btn").addEventListener('click', function (e) {
                    transaction_id = document.getElementById("update_transaction_id").value;
                    transaction_date = document.getElementById("update_transaction_date").value+"T00:00:00Z";
                    transaction_type = document.getElementById("update_transaction_type").value;
                    product_id = document.getElementById("assign_product_list").value;
                    quantity = parseInt(document.getElementById("quantity").value);
                    unit_price = parseFloat(document.getElementById("unit_price").value);
                    total_price = parseFloat(document.getElementById("total_price").value);
                    seller_id = document.getElementById("assign_seller_list").value;
                    buyer_id = document.getElementById("assign_buyer_list").value;
                    vessel_id = document.getElementById("assign_vessel_list").value;
                    trip_id = document.getElementById("assign_trip_list").value;
                    payment_type = document.getElementById("update_payment_type").value;
                    payment_status = parseInt(document.getElementById("update_payment_status").value);
                    notes = document.getElementById("update_notes").value;
                    transaction_image_file = document.getElementById("update_transaction_image").files[0];

                    function update() {
                        blobText = ""
                        if (transaction_image_file == undefined) {
                            blobText = document.getElementById("update_transaction_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "transaction_id": transaction_id,
                            "transaction_date": transaction_date,
                            "transaction_type": transaction_type,
                            "product_id": product_id,
                            "quantity": quantity,
                            "unit_price": unit_price,
                            "total_price": total_price,
                            "seller_id": seller_id,
                            "buyer_id": buyer_id,
                            "vessel_id": vessel_id,
                            "trip_id": trip_id,
                            "payment_type": payment_type,
                            "payment_status": payment_status,
                            "transaction_image": blobText, // Just an example, you may need to handle image upload differently
                            "notes": notes,
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", transaction_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update transaction!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (transaction_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(transaction_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Maintenance':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update Trip get vessel list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].vessel_id}">${ddata[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = reorderSelectOptions(options, data.vessel_id)
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_maintenance_id" class="form-control-label">Maintenance ID</label>
                            <input id="update_maintenance_id" class="form-control" type="text" value="${data.maintenance_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input class="form-control" type="text" value="${data.maintenance_id}" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_maintenance_date" class="form-control-label">Maintenance Date</label>
                            <input id="update_maintenance_date" class="form-control" type="date" value="${str(data.maintenance_date).replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_task_description" class="form-control-label">Task Description</label>
                            <textarea id="update_task_description" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)">${str(data.task_description)}</textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_parts_used" class="form-control-label">Parts Used</label>
                            <textarea id="update_parts_used" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)">${str(data.parts_used)}</textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_cost" class="form-control-label">Cost</label>
                            <input id="update_cost" class="form-control" type="number" value="${str(data.cost)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_notes" class="form-control-label">Notes</label>
                            <textarea id="update_notes" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)">${str(data.notes)}</textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_maintenance_image_old" class="form-control-label">Maintenance Image</label>
                            <input id="update_maintenance_image_old" class="form-control" type="text" hidden value="${str(data.maintenance_image)}">
                            <input id="update_maintenance_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_maintenance_btn" class="btn btn-primary btn-sm ms-auto">UPDATE MAINTENANCE</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_maintenance_btn").addEventListener('click', function (e) {
                    maintenance_id = document.getElementById("update_maintenance_id").value;
                    maintenance_date = document.getElementById("update_maintenance_date").value+"T00:00:00Z";
                    task_description = document.getElementById("update_task_description").value;
                    parts_used = document.getElementById("update_parts_used").value;
                    cost = parseFloat(document.getElementById("update_cost").value);
                    vessel_id = document.getElementById("assign_vessel_list").value;
                    notes = document.getElementById("update_notes").value;
                    maintenance_image_file = document.getElementById("update_maintenance_image").files[0];

                    function update() {
                        blobText = ""
                        if (maintenance_image_file == undefined) {
                            blobText = document.getElementById("update_maintenance_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "maintenance_id": maintenance_id,
                            "maintenance_date": maintenance_date,
                            "task_description": task_description,
                            "parts_used": parts_used,
                            "cost": cost,
                            "vessel_id": vessel_id,
                            "notes": notes,
                            "maintenance_image": blobText, // Just an example, you may need to handle image upload differently
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", maintenance_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update maintenance task!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (maintenance_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(maintenance_image_file);
                    } else {
                        update()
                    }
                });
            }]
        case 'Update Catch':
            MAKE_REQUEST("GET",vessel_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update Trip get vessel list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].vessel_id}">${ddata[i].vessel_name}</option>`
                }
                document.getElementById("assign_vessel_list").innerHTML = reorderSelectOptions(options, data.vessel_id)
            })
            MAKE_REQUEST("GET",trip_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update trip get trip list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].trip_id}">${str(ddata[i].trip_name)} ${str(ddata[i].last_name)}</option>`
                }
                document.getElementById("assign_trip_list").innerHTML = reorderSelectOptions(options, data.trip_id)
            })
            MAKE_REQUEST("GET",product_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    alert("Update trip get product list failed!")
                    return
                }
                ddata = response.data;
                options = []
                for (i = 0; i < ddata.length; i++) {
                    options[i] = `<option value="${ddata[i].product_id}">${str(ddata[i].product_name)}</option>`
                }
                document.getElementById("assign_product_list").innerHTML = reorderSelectOptions(options, data.product_id)
            })
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_catch_id" class="form-control-label">Catch ID</label>
                            <input id="update_catch_id" class="form-control" type="text" value="${data.catch_id}" onfocus="focused(this)" onfocusout="defocused(this)" hidden>
                            <input class="form-control" type="text" value="${data.catch_id}" readonly>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_product_id" class="form-control-label">Product ID</label>
                            <select id="assign_product_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_catch_date" class="form-control-label">Catch Date</label>
                            <input id="update_catch_date" class="form-control" type="date" value="${str(data.catch_date).replace("T00:00:00Z","")}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_catch_location" class="form-control-label">Catch Location</label>
                            <input id="update_catch_location" class="form-control" type="text" value="${str(data.catch_location)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_catch_quantity" class="form-control-label">Catch Quantity</label>
                            <input id="update_catch_quantity" class="form-control" type="number" value="${str(data.catch_quantity)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_vessel_id" class="form-control-label">Vessel ID</label>
                            <select id="assign_vessel_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="update_trip_id" class="form-control-label">Trip ID</label>
                            <select id="assign_trip_list" class="form-control"></select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_notes" class="form-control-label">Notes</label>
                            <textarea id="update_notes" class="form-control" rows="3" onfocus="focused(this)" onfocusout="defocused(this)">${str(data.notes)}</textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="update_catch_image_old" class="form-control-label">Catch Image</label>
                            <input id="update_catch_image_old" class="form-control" type="text" hidden value="${str(data.catch_image)}">
                            <input id="update_catch_image" class="form-control" type="file" accept="image/*" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button id="update_catch_btn" class="btn btn-primary btn-sm ms-auto">UPDATE CATCH</button>
                    </div>
                  </div>
            `, function (){
                document.getElementById("update_catch_btn").addEventListener('click', function (e) {
                    catch_id = document.getElementById("update_catch_id").value;
                    product_id = document.getElementById("assign_product_list").value;
                    catch_date = document.getElementById("update_catch_date").value+"T00:00:00Z";
                    catch_location = document.getElementById("update_catch_location").value;
                    catch_quantity = parseInt(document.getElementById("update_catch_quantity").value);
                    vessel_id = document.getElementById("assign_vessel_list").value;
                    trip_id = document.getElementById("assign_trip_list").value;
                    notes = document.getElementById("update_notes").value;
                    catch_image_file = document.getElementById("update_catch_image").files[0];

                    function update() {
                        blobText = ""
                        if (catch_image_file == undefined) {
                            blobText = document.getElementById("update_catch_image_old").value;
                        } else {
                            blobText = reader.result
                        }

                        // You would handle image upload separately, this is just for demonstration
                        // Construct payload
                        let payload = {
                            "catch_id": catch_id,
                            "product_id": product_id,
                            "catch_date": catch_date,
                            "catch_location": catch_location,
                            "catch_quantity": catch_quantity,
                            "vessel_id": vessel_id,
                            "trip_id": trip_id,
                            "notes": notes,
                            "catch_image": blobText, // Just an example, you may need to handle image upload differently
                        };

                        // Send payload to server
                        MAKE_REQUEST("PUT", catch_api_url, JSON.stringify(payload), true, function(response) {
                            if (response instanceof Error) {
                                alert("Failed to update catch information!");
                                return false;
                            }
                            // Refresh the page
                            location.reload();
                        });
                    }

                    // process image uploaded file to BLOB
                    if (catch_image_file != undefined) {
                        var reader = new FileReader();
                        reader.onloadend = update
                        reader.readAsDataURL(catch_image_file);
                    } else {
                        update()
                    }
                });
            }]

        case 'Delete Product':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_product_id" class="form-control-label">Are you sure want to delete Product ${data.product_name} [${data.product_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_product_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_product_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", product_api_url+data.product_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete product!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Vessel':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_vessel_id" class="form-control-label">Are you sure want to delete Vessel ${data.vessel_name} [${data.vessel_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_vessel_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_vessel_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", vessel_api_url+data.vessel_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete vessel!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Stock':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_vessel_id" class="form-control-label">Are you sure want to delete Stock ${data.product_id} [${data.stock_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_stock_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_stock_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", stock_api_url+data.stock_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete stock!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Person':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_person_id" class="form-control-label">Are you sure want to delete Person ${str(data.first_name)} ${str(data.last_name)} [${data.person_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_person_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_person_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", people_api_url+data.person_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete person!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Trip':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_trip_id" class="form-control-label">Are you sure want to delete Trip ${data.trip_name} [${data.trip_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_trip_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_trip_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", trip_api_url+data.trip_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete trip!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Transaction':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_transaction_id" class="form-control-label">Are you sure want to delete Transaction ${data.transaction_type} [${data.transaction_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_transaction_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_transaction_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", transaction_api_url+data.transaction_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete transaction!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Maintenance':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_maintenance_id" class="form-control-label">Are you sure want to delete Maintenance ${data.maintenance_date} [${data.maintenance_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_maintenance_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_maintenance_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", maintenance_api_url+data.maintenance_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete maintenance!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]
        case 'Delete Catch':
            return [`
                <span class="close">&times;</span>
                <div class="card">
                    <div class="card-header pb-0">
                      <div class="d-flex align-items-center">
                        <p class="mb-0">${title}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="delete_catch_id" class="form-control-label">Are you sure want to delete Catch ${data.catch_date} [${data.catch_id}] ?</label>
                          </div>
                        </div>
                      <hr class="horizontal dark">
                      <button id="delete_catch_btn" class="btn btn-warning btn-sm ms-auto">Delete</button>
                    </div>
                  </div>
            `, function () {
                document.getElementById("delete_catch_btn").addEventListener("click", function (){
                    MAKE_REQUEST("DELETE", catch_api_url+data.catch_id+"/", "", true, function(response) {
                        if (response instanceof Error) {
                            alert("Failed to delete catch!");
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    });
                })
            }]

        case 'Delete Role':
            MAKE_REQUEST("GET",role_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    console.log(response);
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Role -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].id}">${data[i].name}</option>`
                }
                document.getElementById("assign_role_name").innerHTML = options
            })
            MAKE_REQUEST("GET",role_feature_api_url,"",true, function(response) {
                if (response instanceof Error) {
                    console.log(response);
                    return
                }
                data = response.data;
                options = "<option disabled selected value> -- Pilih Feature -- </option>"
                for (i = 0; i < data.length; i++) {
                    options += `<option value="${data[i].id}">${data[i].id}: [${data[i].tag}] ${data[i].endpoint}</option>`
                }
                document.getElementById("assign_feature_list").innerHTML = options
            })
            return [`
                    <span class="close">&times;</span>
                    <div class="card">
                        <div class="card-header pb-0">
                          <div class="d-flex align-items-center">
                            <p class="mb-0">${title}</p>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <select id="assign_role_name" class="form-control"></select>
                              </div>
                            </div>
                            <hr class="horizontal dark">
                            <button id="delete_role_btn" class="btn btn-warning btn-sm ms-auto">DELETE ROLE</button>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <select id="assign_feature_list" class="form-control"></select>
                              </div>
                            </div>
                            <hr class="horizontal dark">
                            <button id="delete_feature_btn" class="btn btn-warning btn-sm ms-auto">DELETE FEATURE</button>
                          </div>
                        </div>
                    </div>
                `, function() {
                document.getElementById("delete_role_btn").addEventListener('click', function (e) {
                    role_name = document.getElementById("assign_role_name").value
                    MAKE_REQUEST("DELETE", delete_role_api_url.format(role_name), ``, true, function(response) {
                        if (response instanceof Error) {
                            alert("Remove Role from Service failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
                document.getElementById("delete_feature_btn").addEventListener('click', function (e) {
                    feature_name = document.getElementById("assign_feature_list").value
                    MAKE_REQUEST("DELETE", delete_feature_api_url.format(feature_name), ``, true, function(response) {
                        if (response instanceof Error) {
                            alert("Remove Feature from Service failed!")
                            return false;
                        }
                        // Refresh the page
                        location.reload();
                    })
                });
            }]
    }
}
