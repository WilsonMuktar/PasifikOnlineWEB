var envHost = "https://pasifikonline-yenwie-c0344cc5.koyeb.app" // "http://pasifikonline.alwaysdata.net/service"
var web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"
var web_client_id = "jRqOOEBeGle1L4D31cCXai1h"
var web_client_secret = "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM"

var company_people_id = "1931b5d7-c89e-4eea-b639-18bf7060ba6c"

// check rather running in local
if (window.location.href.indexOf("file:///") > -1) {
    envHost = "https://pasifikonline-yenwie-c0344cc5.koyeb.app" //"http://localhost:8080"
    web_service_id = "54311ba1-353d-4c28-a142-4eb465dcf1c1"// "d5e17e06-308a-4907-9e55-9e4d2c87158b"
    web_client_id = "jRqOOEBeGle1L4D31cCXai1h"// "ECo4LyNiJVOGxOQwUVaiv8B1"
    web_client_secret = "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM"// "dxWIpr8qgLq2Udu3dTKRnTYUV4hqwjtX"
}

const user_api_url = envHost+"/keyauth/v1/members/"
const user_api_id_url = envHost+"/keyauth/v1/members/{0}/"
const product_api_url = envHost+"/keyauth/v1/products/"
const maintenance_api_url = envHost+"/keyauth/v1/maintenances/"
const catch_api_url = envHost+"/keyauth/v1/catches/"
const trip_api_url = envHost+"/keyauth/v1/trips/"
const transaction_api_url = envHost+"/keyauth/v1/transactions/"
const transactionbillcodes_api_url = envHost+"/keyauth/v1/transactionbillcodes/"
const people_api_url = envHost+"/keyauth/v1/peoples/"
const stock_api_url = envHost+"/keyauth/v1/stocks/"
const vessel_api_url = envHost+"/keyauth/v1/vessels/"
const role_api_url = envHost+"/keyauth/v1/roles/"
const delete_role_api_url = envHost+"/keyauth/v1/roles/{0}"
const role_feature_api_url = envHost+`/keyauth/v1/services/${web_service_id}/features/`
const role_user_bind = envHost+`/keyauth/v1/users/{0}/bind/roles/{1}/{2}/`
const role_user_unbind = envHost+`/keyauth/v1/users/{0}/unbind/roles/{1}/{2}/`
const feature_api_url = envHost+`/keyauth/v1/features/`
const delete_feature_api_url = envHost+`/keyauth/v1/features/${web_service_id}/{0}/`
const assign_feature_api_url = envHost+`/keyauth/v1/roles/{0}/features/`
const token_auth_url = envHost+"/keyauth/v1/oauth2/tokens/"
const token_validate_url = envHost+"/keyauth/v1/oauth2/tokens/"
const register_url = envHost+"/keyauth/v1/members/"
const logs_api_url = envHost+"/keyauth/v1/logs/"

var main_page_url= "pages/dashboard.html"
const login_page_url= "pages/sign-in.html"

/*
* <li class="nav-item">
      <a class="nav-link " href="../pages/dashboard.html">
          <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i class="fa fa-bar-chart text-secondary text-sm opacity-10"></i>
          </div>
          <span class="nav-link-text ms-1 ${window.location.href.includes('dashboard.html') ? 'text-bolder' : ''}" data-i18n-key="breadcrumb_dashboard">Dashboard</span>
      </a>
  </li>
* */
const main_nav_bar = {
    "system_admin": [
        {"nav_name": "dashboard.html", "nav_path": "../pages/dashboard.html", "nav_icon": "fa fa-bar-chart", "nav_title": "Dashboard", "nav_title_i18n":"breadcrumb_dashboard", "nav_separator": false},
        {"nav_name": "vessel.html", "nav_path": "../pages/vessel.html", "nav_icon": "fa fa-ship", "nav_title": "Vessels", "nav_title_i18n":"breadcrumb_vessel", "nav_separator": false},
        {"nav_name": "stock.html", "nav_path": "../pages/stock.html", "nav_icon": "ni ni-shop", "nav_title": "Stocks", "nav_title_i18n":"breadcrumb_stock", "nav_separator": false},
        {"nav_name": "transaction.html", "nav_path": "../pages/transaction.html", "nav_icon": "ni ni-credit-card", "nav_title": "Transactions", "nav_title_i18n":"breadcrumb_transaction", "nav_separator": false},
        {"nav_name": "product.html", "nav_path": "../pages/product.html", "nav_icon": "fa fa-product-hunt", "nav_title": "Products", "nav_title_i18n":"breadcrumb_product", "nav_separator": false},
        {"nav_name": "people.html", "nav_path": "../pages/people.html", "nav_icon": "ni ni-single-02", "nav_title": "People", "nav_title_i18n":"breadcrumb_people", "nav_separator": false},
        {"nav_name": "trip.html", "nav_path": "../pages/trip.html", "nav_icon": "ni ni-calendar-grid-58", "nav_title": "Trips", "nav_title_i18n":"breadcrumb_trip", "nav_separator": false},
        {"nav_name": "catch.html", "nav_path": "../pages/catch.html", "nav_icon": "fa fa-solid fa-fish", "nav_title": "Catchs", "nav_title_i18n":"breadcrumb_catch", "nav_separator": false},
        {"nav_name": "debt.html", "nav_path": "../pages/debt.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Debts", "nav_title_i18n":"breadcrumb_debt", "nav_separator": false},
        {"nav_name": "pay.html", "nav_path": "../pages/pay.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Pays", "nav_title_i18n":"breadcrumb_pay", "nav_separator": false},
        {"nav_name": "maintenance.html", "nav_path": "../pages/maintenance.html", "nav_icon": "ni ni-settings", "nav_title": "Maintenance", "nav_title_i18n":"breadcrumb_maintenance", "nav_separator": false},
        {"nav_title": "Account pages", "nav_title_i18n":"breadcrumb_account_pages", "nav_separator": true},
        {"nav_name": "profile.html", "nav_path": "../pages/profile.html", "nav_icon": "ni ni-single-02", "nav_title": "Profile", "nav_title_i18n":"breadcrumb_profile", "nav_separator": false},
        {"nav_name": "user.html", "nav_path": "../pages/user.html", "nav_icon": "ni ni-single-02", "nav_title": "Users", "nav_title_i18n":"breadcrumb_user", "nav_separator": false},
        {"nav_name": "role.html", "nav_path": "../pages/role.html", "nav_icon": "ni ni-single-copy-04", "nav_title": "Roles", "nav_title_i18n":"breadcrumb_role", "nav_separator": false},
    ],
    "domain_admin": [
        {"nav_name": "dashboard.html", "nav_path": "../pages/dashboard.html", "nav_icon": "fa fa-bar-chart", "nav_title": "Dashboard", "nav_title_i18n":"breadcrumb_dashboard", "nav_separator": false},
        {"nav_name": "vessel.html", "nav_path": "../pages/vessel.html", "nav_icon": "fa fa-ship", "nav_title": "Vessels", "nav_title_i18n":"breadcrumb_vessel", "nav_separator": false},
        {"nav_name": "stock.html", "nav_path": "../pages/stock.html", "nav_icon": "ni ni-shop", "nav_title": "Stocks", "nav_title_i18n":"breadcrumb_stock", "nav_separator": false},
        {"nav_name": "transaction.html", "nav_path": "../pages/transaction.html", "nav_icon": "ni ni-credit-card", "nav_title": "Transactions", "nav_title_i18n":"breadcrumb_transaction", "nav_separator": false},
        {"nav_name": "product.html", "nav_path": "../pages/product.html", "nav_icon": "fa fa-product-hunt", "nav_title": "Products", "nav_title_i18n":"breadcrumb_product", "nav_separator": false},
        {"nav_name": "people.html", "nav_path": "../pages/people.html", "nav_icon": "ni ni-single-02", "nav_title": "People", "nav_title_i18n":"breadcrumb_people", "nav_separator": false},
        {"nav_name": "trip.html", "nav_path": "../pages/trip.html", "nav_icon": "ni ni-calendar-grid-58", "nav_title": "Trips", "nav_title_i18n":"breadcrumb_trip", "nav_separator": false},
        {"nav_name": "catch.html", "nav_path": "../pages/catch.html", "nav_icon": "fa fa-solid fa-fish", "nav_title": "Catchs", "nav_title_i18n":"breadcrumb_catch", "nav_separator": false},
        {"nav_name": "debt.html", "nav_path": "../pages/debt.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Debts", "nav_title_i18n":"breadcrumb_debt", "nav_separator": false},
        {"nav_name": "pay.html", "nav_path": "../pages/pay.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Pays", "nav_title_i18n":"breadcrumb_pay", "nav_separator": false},
        {"nav_name": "maintenance.html", "nav_path": "../pages/maintenance.html", "nav_icon": "ni ni-settings", "nav_title": "Maintenance", "nav_title_i18n":"breadcrumb_maintenance", "nav_separator": false},
        {"nav_title": "Account pages", "nav_title_i18n":"breadcrumb_account_pages", "nav_separator": true},
        {"nav_name": "profile.html", "nav_path": "../pages/profile.html", "nav_icon": "ni ni-single-02", "nav_title": "Profile", "nav_title_i18n":"breadcrumb_profile", "nav_separator": false},
        {"nav_name": "user.html", "nav_path": "../pages/user.html", "nav_icon": "ni ni-single-02", "nav_title": "Users", "nav_title_i18n":"breadcrumb_user", "nav_separator": false},
        {"nav_name": "role.html", "nav_path": "../pages/role.html", "nav_icon": "ni ni-single-copy-04", "nav_title": "Roles", "nav_title_i18n":"breadcrumb_role", "nav_separator": false},
    ],
    "manager": [
        {"nav_name": "dashboard.html", "nav_path": "../pages/dashboard.html", "nav_icon": "fa fa-bar-chart", "nav_title": "Dashboard", "nav_title_i18n":"breadcrumb_dashboard", "nav_separator": false},
        {"nav_name": "vessel.html", "nav_path": "../pages/vessel.html", "nav_icon": "fa fa-ship", "nav_title": "Vessels", "nav_title_i18n":"breadcrumb_vessel", "nav_separator": false},
        {"nav_name": "stock.html", "nav_path": "../pages/stock.html", "nav_icon": "ni ni-shop", "nav_title": "Stocks", "nav_title_i18n":"breadcrumb_stock", "nav_separator": false},
        {"nav_name": "transaction.html", "nav_path": "../pages/transaction.html", "nav_icon": "ni ni-credit-card", "nav_title": "Transactions", "nav_title_i18n":"breadcrumb_transaction", "nav_separator": false},
        {"nav_name": "product.html", "nav_path": "../pages/product.html", "nav_icon": "fa fa-product-hunt", "nav_title": "Products", "nav_title_i18n":"breadcrumb_product", "nav_separator": false},
        {"nav_name": "people.html", "nav_path": "../pages/people.html", "nav_icon": "ni ni-single-02", "nav_title": "People", "nav_title_i18n":"breadcrumb_people", "nav_separator": false},
        {"nav_name": "trip.html", "nav_path": "../pages/trip.html", "nav_icon": "ni ni-calendar-grid-58", "nav_title": "Trips", "nav_title_i18n":"breadcrumb_trip", "nav_separator": false},
        {"nav_name": "catch.html", "nav_path": "../pages/catch.html", "nav_icon": "fa fa-solid fa-fish", "nav_title": "Catchs", "nav_title_i18n":"breadcrumb_catch", "nav_separator": false},
        {"nav_name": "debt.html", "nav_path": "../pages/debt.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Debts", "nav_title_i18n":"breadcrumb_debt", "nav_separator": false},
        {"nav_name": "pay.html", "nav_path": "../pages/pay.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Pays", "nav_title_i18n":"breadcrumb_pay", "nav_separator": false},
        {"nav_name": "maintenance.html", "nav_path": "../pages/maintenance.html", "nav_icon": "ni ni-settings", "nav_title": "Maintenance", "nav_title_i18n":"breadcrumb_maintenance", "nav_separator": false},
        {"nav_title": "Account pages", "nav_title_i18n":"breadcrumb_account_pages", "nav_separator": true},
        {"nav_name": "profile.html", "nav_path": "../pages/profile.html", "nav_icon": "ni ni-single-02", "nav_title": "Profile", "nav_title_i18n":"breadcrumb_profile", "nav_separator": false},
        {"nav_name": "user.html", "nav_path": "../pages/user.html", "nav_icon": "ni ni-single-02", "nav_title": "Users", "nav_title_i18n":"breadcrumb_user", "nav_separator": false},
    ],
    "member": [
        {"nav_name": "vessel.html", "nav_path": "../pages/vessel.html", "nav_icon": "fa fa-ship", "nav_title": "Vessels", "nav_title_i18n":"breadcrumb_vessel", "nav_separator": false},
        {"nav_name": "product.html", "nav_path": "../pages/product.html", "nav_icon": "fa fa-product-hunt", "nav_title": "Products", "nav_title_i18n":"breadcrumb_product", "nav_separator": false},
        {"nav_name": "people.html", "nav_path": "../pages/people.html", "nav_icon": "ni ni-single-02", "nav_title": "People", "nav_title_i18n":"breadcrumb_people", "nav_separator": false},
        {"nav_name": "trip.html", "nav_path": "../pages/trip.html", "nav_icon": "ni ni-calendar-grid-58", "nav_title": "Trips", "nav_title_i18n":"breadcrumb_trip", "nav_separator": false},
        {"nav_name": "maintenance.html", "nav_path": "../pages/maintenance.html", "nav_icon": "ni ni-settings", "nav_title": "Maintenance", "nav_title_i18n":"breadcrumb_maintenance", "nav_separator": false},
        {"nav_title": "Account pages", "nav_title_i18n":"breadcrumb_account_pages", "nav_separator": true},
        {"nav_name": "profile.html", "nav_path": "../pages/profile.html", "nav_icon": "ni ni-single-02", "nav_title": "Profile", "nav_title_i18n":"breadcrumb_profile", "nav_separator": false},
    ],
    "staff": [
        {"nav_name": "dashboard.html", "nav_path": "../pages/dashboard.html", "nav_icon": "fa fa-bar-chart", "nav_title": "Dashboard", "nav_title_i18n":"breadcrumb_dashboard", "nav_separator": false},
        {"nav_name": "vessel.html", "nav_path": "../pages/vessel.html", "nav_icon": "fa fa-ship", "nav_title": "Vessels", "nav_title_i18n":"breadcrumb_vessel", "nav_separator": false},
        {"nav_name": "stock.html", "nav_path": "../pages/stock.html", "nav_icon": "ni ni-shop", "nav_title": "Stocks", "nav_title_i18n":"breadcrumb_stock", "nav_separator": false},
        {"nav_name": "transaction.html", "nav_path": "../pages/transaction.html", "nav_icon": "ni ni-credit-card", "nav_title": "Transactions", "nav_title_i18n":"breadcrumb_transaction", "nav_separator": false},
        {"nav_name": "product.html", "nav_path": "../pages/product.html", "nav_icon": "fa fa-product-hunt", "nav_title": "Products", "nav_title_i18n":"breadcrumb_product", "nav_separator": false},
        {"nav_name": "people.html", "nav_path": "../pages/people.html", "nav_icon": "ni ni-single-02", "nav_title": "People", "nav_title_i18n":"breadcrumb_people", "nav_separator": false},
        {"nav_name": "trip.html", "nav_path": "../pages/trip.html", "nav_icon": "ni ni-calendar-grid-58", "nav_title": "Trips", "nav_title_i18n":"breadcrumb_trip", "nav_separator": false},
        {"nav_name": "catch.html", "nav_path": "../pages/catch.html", "nav_icon": "fa fa-solid fa-fish", "nav_title": "Catchs", "nav_title_i18n":"breadcrumb_catch", "nav_separator": false},
        {"nav_name": "debt.html", "nav_path": "../pages/debt.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Debts", "nav_title_i18n":"breadcrumb_debt", "nav_separator": false},
        {"nav_name": "pay.html", "nav_path": "../pages/pay.html", "nav_icon": "fa fa-solid fa-money-bill", "nav_title": "Pays", "nav_title_i18n":"breadcrumb_pay", "nav_separator": false},
        {"nav_title": "Account pages", "nav_title_i18n":"breadcrumb_account_pages", "nav_separator": true},
        {"nav_name": "profile.html", "nav_path": "../pages/profile.html", "nav_icon": "ni ni-single-02", "nav_title": "Profile", "nav_title_i18n":"breadcrumb_profile", "nav_separator": false},
    ]
}
