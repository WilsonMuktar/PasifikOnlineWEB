async function MAKE_REQUEST(method,url,payload,needToken,callback) {
    // fetch request
    options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if ((method == "POST" || method == "DELETE") && payload != "") {
        options['body'] = payload
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

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            callback(new Error("failed"))
        }
        try {
            const result = await response.json()
            callback(result)
        } catch (ex) {
            callback("")
        }
    } catch (ex) {
        callback(new Error("failed"))
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

String.prototype.format = String.prototype.format ||
    function () {
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
    for (i = data.length - 1; i >= 0; i--) {
        table = document.getElementById("role_table")
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
                     <td class="align-middle"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Role",${JSON.stringify(data[i])},${JSON.stringify(data[i].features[j])})'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
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
                     <td class="align-middle"><button class="btn btn-link text-secondary mb-0" onclick='openPopup("Update Role",${JSON.stringify(data[i])},"")'><i class="fa fa-ellipsis-v text-xs"></i></button></td>
                    </tr>
                `;
        }
        table.tBodies[0].innerHTML = rows;
    }
}

function prosesUserTable(response) {
    data = response.data
    rows = ""
    for (i=data.length-1; i>=0; i--) {
        table = document.getElementById("user_table")
        // process default avatar
        if (data[i].avatar == undefined) {
            data[i].avatar = "../assets/img/avatar/avatar-5.jpg";
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
                <td><p class="text-xs font-weight-bold mb-0">${roles}</p><p class="text-xs text-secondary mb-0">${data[i].department.name}</p></td>
                <td class="align-middle text-center text-sm"><span class="badge badge-sm bg-gradient-success">Online</span></td>
                <td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">${(new Date(data[i].create_at*1000)).toLocaleDateString('es-CL')}</span></td>
                <td class="align-middle"><a href="javascript:;" onclick='openPopup("User Profile","",${JSON.stringify(data[i])})' class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a></td>
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
            return `
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
                            <input class="form-control" type="text" value="${str(data.account)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Email address</label>
                            <input class="form-control" type="email" value="${str(data.email)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Real name</label>
                            <input class="form-control" type="text" value="${str(data.real_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Nick name</label>
                            <input class="form-control" type="text" value="${str(data.nick_name)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Gendre</label>
                            <select id="edit_user_gendre"  name="gendre" class="form-control">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Address</label>
                            <input class="form-control" type="text" value="${str(data.address)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">City</label>
                            <input class="form-control" type="text" value="${str(data.city)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Province</label>
                            <input class="form-control" type="text" value="${str(data.province)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Mobile</label>
                            <input class="form-control" type="text" value="${str(data.mobile)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Phone</label>
                            <input class="form-control" type="text" value="${str(data.phone)}" onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      </div>
                      <hr class="horizontal dark">
                      <button class="btn btn-primary btn-sm ms-auto">UPDATE</button>
                    </div>
                  </div>
            `;
        case 'Add Role':
            return `
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
                                <option value="get">GET</option>
                                <option value="post">POST</option>
                                <option value="delete">DELETE</option>
                                <option value="patch">PATCH</option>
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
                        <div class="col-md-12">
                          <div class="form-group">
                            <label for="example-text-input" class="form-control-label">Service ID</label>
                            <input id="add_feature_service_id" class="form-control" type="text" value="${web_service_id}" disabled onfocus="focused(this)" onfocusout="defocused(this)">
                          </div>
                        </div>
                      <button id="add_feature_btn" class="btn btn-primary btn-sm ms-auto">ADD FEATURE</button>
                    </div>
                  </div>
            `
        case 'Update Role':
            MAKE_REQUEST("GET",feature_api_url,"",true, function(response) {
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
                                return
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
                                return
                            }
                            // Refresh the page
                            location.reload();
                        })
                    });
                }]
    }
}