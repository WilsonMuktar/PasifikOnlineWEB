// Assign username and roles in nav
account_name = document.getElementById("account_name");
account_roles= document.getElementById("account_roles");
if (account_name != undefined) {
    account_name.innerHTML = localStorage.getItem('user_name')
}
if (account_roles != undefined) {
    account_roles.innerHTML = localStorage.getItem('user_roles')
}

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
                        <i class="ni ni-diamond text-primary text-sm opacity-10"></i>
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
                        <i class="ni ni-shop text-success text-sm opacity-10"></i>
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

async function MAKE_REQUEST(method,url,payload,needToken,callback) {
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
            return
        }
        try {
            const result = await response.json()
            callback(result)
        } catch (ex) {
            callback("")
        }
    } catch (ex) {
        callback(new Error(`not enough permission to open [${method}]${url}`))
    }
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
function processStockTable(response) {
    data = response.data
    rows = ""
    table = document.getElementById("stock_table")
    for (i = data.length - 1; i >= 0; i--) {
                rows += `
                    <tr>
                     <td><div class="d-flex px-2"><div><img src="../assets/img/theme/unass.jpg" class="avatar avatar-sm rounded-circle me-2"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].product_id}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">${str(data[i].location)}</p></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].quantity)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].date_added)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].supplier_id)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].transaction_type)}</span></td>
                     <td class="align-middle text-center"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Vessel",${JSON.stringify(data[i])},"")'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
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
                     <td><div class="d-flex px-2"><div><img src="../assets/img/theme/unass.jpg" class="avatar avatar-sm rounded-circle me-2"></div>
                      <div class="my-auto"><h6 class="mb-0 text-sm">${data[i].vessel_name}</h6></div></div></td>
                     <td><p class="text-sm font-weight-bold mb-0">${str(data[i].vessel_type)}</p></td>
                     <td><span class="text-xs font-weight-bold">${str(data[i].registration_number)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].year_built)}</span></td>
                     <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-secondary">${str(data[i].fisheries_permits)}</span></td>
                     <td class="align-middle text-center"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Vessel",${JSON.stringify(data[i])},"")'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
                    </tr>
                `
    }
    table.tBodies[0].innerHTML = rows;
}

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
                          <button id="delete_feature_btn" class="btn btn-warning btn-sm ms-auto">DELETE FEATURE</button>
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
                        console.log(role_name, feature_name)
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
                    console.log(resp);
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
                            <input id="add_product_quantity_in_stock" class="form-control" type="number" value="" onfocus="focused(this)" onfocusout="defocused(this)">
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

                    // process image uploaded file to BLOB
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        blobText = reader.result
                        console.log(blobText);

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
                    reader.readAsDataURL(product_image_file);
                });
            }]
    }
}