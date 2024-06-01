const envHost = "http://localhost:8080" //"http://pasifikonline.alwaysdata.net/service" //
const web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"
const web_client_id =  "jRqOOEBeGle1L4D31cCXai1h"
const web_client_secret = "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM"

const user_api_url = envHost+"/keyauth/v1/members/"
const user_api_id_url = envHost+"/keyauth/v1/members/{0}/"
const role_api_url = envHost+"/keyauth/v1/roles/"
const role_feature_api_url = envHost+`/keyauth/v1/services/${web_service_id}/features/`
const role_user_bind = envHost+`/keyauth/v1/users/{0}/bind/roles/{1}/{2}/`
const role_user_unbind = envHost+`/keyauth/v1/users/{0}/unbind/roles/{1}/{2}/`
const feature_api_url = envHost+`/keyauth/v1/features/`
const assign_feature_api_url = envHost+`/keyauth/v1/roles/{0}/features/`
const token_auth_url = envHost+"/keyauth/v1/oauth2/tokens/"
const token_validate_url = envHost+"/keyauth/v1/oauth2/tokens/"
const register_url = envHost+"/keyauth/v1/members/"


const main_page_url= "pages/dashboard.html"
const login_page_url= "pages/sign-in.html"