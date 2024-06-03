var envHost = "http://pasifikonline.alwaysdata.net/service"
var web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"
var web_client_id = "jRqOOEBeGle1L4D31cCXai1h"
var web_client_secret = "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM"

// check rather running in local
if (window.location.href.indexOf("file:///") > -1) {
    envHost = "http://localhost:8080"
    web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"
    web_client_id = "ECo4LyNiJVOGxOQwUVaiv8B1"
    web_client_secret = "dxWIpr8qgLq2Udu3dTKRnTYUV4hqwjtX"
}

const user_api_url = envHost+"/keyauth/v1/members/"
const user_api_id_url = envHost+"/keyauth/v1/members/{0}/"
const product_api_url = envHost+"/keyauth/v1/products/"
const maintenance_api_url = envHost+"/keyauth/v1/maintenances/"
const catch_api_url = envHost+"/keyauth/v1/catches/"
const trip_api_url = envHost+"/keyauth/v1/trips/"
const transaction_api_url = envHost+"/keyauth/v1/transactions/"
const people_api_url = envHost+"/keyauth/v1/peoples/"
const stock_api_url = envHost+"/keyauth/v1/stocks/"
const vessel_api_url = envHost+"/keyauth/v1/vessels/"
const role_api_url = envHost+"/keyauth/v1/roles/"
const role_feature_api_url = envHost+`/keyauth/v1/services/${web_service_id}/features/`
const role_user_bind = envHost+`/keyauth/v1/users/{0}/bind/roles/{1}/{2}/`
const role_user_unbind = envHost+`/keyauth/v1/users/{0}/unbind/roles/{1}/{2}/`
const feature_api_url = envHost+`/keyauth/v1/features/`
const assign_feature_api_url = envHost+`/keyauth/v1/roles/{0}/features/`
const token_auth_url = envHost+"/keyauth/v1/oauth2/tokens/"
const token_validate_url = envHost+"/keyauth/v1/oauth2/tokens/"
const register_url = envHost+"/keyauth/v1/members/"


const main_page_url= "pages/vessel.html"
const login_page_url= "pages/sign-in.html"