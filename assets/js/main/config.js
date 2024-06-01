const envHost = "http://pasifikonline.alwaysdata.net/service" //"http://localhost:8080" //
const web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"
const web_client_id =  "jRqOOEBeGle1L4D31cCXai1h"
const web_client_secret = "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM"

const user_api_url = envHost+"/keyauth/v1/members/"
const role_api_url = envHost+"/keyauth/v1/roles/"
const feature_api_url = envHost+`keyauth/v1/services/${web_service_id}/features/`
const assign_feature_api_url = envHost+`/keyauth/v1/roles/{0}/features/`
const token_auth_url = envHost+"/keyauth/v1/oauth2/tokens/"
const token_validate_url = envHost+"/keyauth/v1/oauth2/tokens/"
const register_url = envHost+"/keyauth/v1/members/"


const login_page_url= "pages/sign-in.html"
const main_page_url = "index.html"