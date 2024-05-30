![PasifikOnlineLogo](./assets/img/pasifikonline1.png)
# Database Structure
**Pasifik Online System** using _MySQL Databases_ to store its data and is administered by a Backend system running on Golang microservices. In the upcoming sessions, we will delve into various facets of the database entities, notably User management, User's Role management, and Product until Business data management.
<p></p>
In the realm of User data, a hierarchical structure emerges, intertwining with Domains, Departments, Projects, Applications, Services, and Features (Permissions). Users are intricately linked to these domains, departments, and subsequent project hierarchies, delineating their roles and permissions within the system.
<p></p>
Central to this architecture is the concept of Role inheritance, wherein a User's Role is derived from their respective Department, with each Role entrusted with the management of specific Features (Permissions). This hierarchical delegation ensures a granular control mechanism, allowing for fine-tuned access privileges based on organizational structures.
<p></p>
Moreover, the issuance of Tokens within this ecosystem is meticulously orchestrated, drawing upon various attributes including User, Domain, Project, Application, and Service. These Tokens serve as the cornerstone of authentication and authorization, encapsulating the user's context within the system and facilitating secure access to pertinent resources.
<p></p>
Thus, the Pasifik Online System exemplifies a sophisticated data management paradigm, underpinned by relational databases, microservice architecture, and hierarchical access control mechanisms, ensuring robustness, scalability, and security in its operations.


## User Entity Hierarchical Structure
```
   Domains (Company Entity)
   └── Departments (Company's Departments)
       └── Projects 
            └── Applications
                └── Services
                    └── Features (Permissions)
       └── Users
       
   Users
   ├── Roles
   ├    └── Features
   ├── Projects
   ├
   └── Departments
        └── Roles
            └── Features
        └── Projects
   
   Tokens
   ├── user
   ├── domain
   ├── project
   ├── application
   └── service
   
   Roles
   ├── role_user_mappings
   ├── role_feature_mappings
   └── department_role_mappings
   
   Projects
   └── department_project_mappings
   └── user_project_mappings
   
   Domains
   └── user_domain_mappings
   
```

## Domains (unique, no need APIs)
| Column          | Type             | Description |
|:----------------|:-----------------|:-----------:|
| id              | char(64)         |             |
| name            | varchar(128)     |             |
| display_name    | varchar(255)     |             |
| logo_path       | varchar(128)     |             |
| description     | text             |             |
| enabled         | tinyint unsigned |             |
| type            | tinyint unsigned |             |
| create_at       | int unsigned     |             |
| update_at       | int unsigned     |             |
| size            | varchar(64)      |             |
| location        | varchar(64)      |             |
| industry        | varchar(64)      |             |
| address         | varchar(64)      |             |
| fax             | varchar(128)     |             |
| phone           | varchar(128)     |             |
| contacts_name   | varchar(32)      |             |
| contacts_title  | varchar(32)      |             |
| contacts_mobile | varchar(32)      |             |
| contacts_email  | varchar(32)      |             |
| owner_id        | char(64)         |             |
| extra           | text             |             |

## Users
| Column              | Type         | Description  |
|:--------------------|:-------------|:------------:|
| id                  | char(64)     |              |
| department          | char(64)     |              |
| account             | char(64)     |              |
| mobile              | char(11)     |              |
| email               | char(64)     |              |
| phone               | char(20)     |              |
| address             | varchar(128) |              |
| real_name           | varchar(128) |              |
| nick_name           | varchar(128) |              |
| gender              | char(1)      |              |
| avatar              | varchar(128) |              |
| language            | char(64)     |              |
| city                | varchar(64)  |              |
| province            | varchar(64)  |              |
| locked              | int unsigned |              |
| domain_id           | char(64)     |              |
| create_at           | int unsigned |              |
| expires_active_days | int unsigned |              |
| default_project_id  | char(64)     |              |
| extra               | text         |              |

### APIs
- Get User\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/members/{user-id}\
  response:
```
type User struct {
	ID                string    `json:"id,omitempty"`                  
	Account           string    `json:"account,omitempty"`             
	Mobile            string    `json:"mobile,omitempty"`              
	Email             string    `json:"email,omitempty"`               
	Phone             string    `json:"phone,omitempty"`               
	Address           string    `json:"address,omitempty"`             
	RealName          string    `json:"real_name,omitempty"`           
	NickName          string    `json:"nick_name,omitempty"`           
	Gender            string    `json:"gender,omitempty"`              
	Avatar            string    `json:"avatar,omitempty"`              
	Language          string    `json:"language,omitempty"`            
	City              string    `json:"city,omitempty"`                
	Province          string    `json:"province,omitempty"`            
	Locked            int       `json:"locked,omitempty"`              
	CreateAt          int64     `json:"create_at,omitempty"`           
	ExpiresActiveDays int       `json:"expires_active_days,omitempty"` 
	Password          *Password `json:"password,omitempty"`            
	IsDomainOwner     bool      `json:"is_domain_owner,omitempty"`

	Domain         *Domain      `json:"domain,omitempty"`          
	DefaultProject *Project     `json:"default_project,omitempty"` 
	Department     *Department  `json:"department,omitempty"`      
	LoginStatus    *LoginStatus `json:"login_status,omitempty"`    
	Roles          []*Role      `json:"roles,omitempty"`           
	Projects       []*Project   `json:"projects,omitempty"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/members/f7fed786-b6c1-4c48-bb7a-7aaf08d95217' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Users List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/members\
  response: Array of User
```
type User struct {
	ID                string    `json:"id,omitempty"`                  
	Account           string    `json:"account,omitempty"`             
	Mobile            string    `json:"mobile,omitempty"`              
	Email             string    `json:"email,omitempty"`               
	Phone             string    `json:"phone,omitempty"`               
	Address           string    `json:"address,omitempty"`             
	RealName          string    `json:"real_name,omitempty"`           
	NickName          string    `json:"nick_name,omitempty"`           
	Gender            string    `json:"gender,omitempty"`              
	Avatar            string    `json:"avatar,omitempty"`              
	Language          string    `json:"language,omitempty"`            
	City              string    `json:"city,omitempty"`                
	Province          string    `json:"province,omitempty"`            
	Locked            int       `json:"locked,omitempty"`              
	CreateAt          int64     `json:"create_at,omitempty"`           
	ExpiresActiveDays int       `json:"expires_active_days,omitempty"` 
	Password          *Password `json:"password,omitempty"`            
	IsDomainOwner     bool      `json:"is_domain_owner,omitempty"`

	Domain         *Domain      `json:"domain,omitempty"`          
	DefaultProject *Project     `json:"default_project,omitempty"` 
	Department     *Department  `json:"department,omitempty"`      
	LoginStatus    *LoginStatus `json:"login_status,omitempty"`    
	Roles          []*Role      `json:"roles,omitempty"`           
	Projects       []*Project   `json:"projects,omitempty"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/members/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create User\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/members\
  response: NULL\
  body:
```
type NewUser struct {            
	Account       string  `json:"account,omitempty"` 
	Password      string  `json:"password,omitempty"`      
	DepartmentID  string  `json:"department_id,omitempty"`      
}      
```
  curl:
```
curl --location 'localhost:8080/keyauth/v1/members/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
    "account": "wilson.muktar",
    "password": "e357d51929c4e645c2bd1a455487c5a518bfa1afc26979476eaf46401eeabac1",
    "department_id": "aff27414-e9bb-40e5-ad9c-239da0fdfc95"
}'
```
&nbsp;

- DELETE User\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/members/{user-id}\
  response: NULL

curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/members/0443acf4-5932-4180-bea3-b8e1334d0761' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```

## Roles
| Column      | Type         | Description  |
|:------------|:-------------|:------------:|
| id          | char(64)     |              |
| name        | varchar(64)  |              |
| description | text         |              |
| create_at   | int unsigned |              |
| update_at   | int unsigned |              |
| extra       | text         |              |

### APIs
- Get Role\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/roles/{role-id}\
  response:
```
type Role struct {
	ID          string `json:"id"`
	Name        string `json:"name"`                  
	Description string `json:"description,omitempty"` 
	CreateAt    int64  `json:"create_at,omitempty"`   
	UpdateAt    int64  `json:"update_at,omitempty"`   

	Features []*Feature `json:"features,omitempty"` 
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/roles/0ccc4e92-ac2c-453e-9af0-bd41d93a1e8f' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Role List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/roles/\
  response: Array of Role
```
type Role struct {
	ID          string `json:"id"`
	Name        string `json:"name"`                  
	Description string `json:"description,omitempty"` 
	CreateAt    int64  `json:"create_at,omitempty"`   
	UpdateAt    int64  `json:"update_at,omitempty"`   

	Features []*Feature `json:"features,omitempty"` 
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/roles/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create Role\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/roles/\
  body: 
```
type NewRole struct {
	Name        string `json:"name"`                  
	Description string `json:"description,omitempty"` 
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/roles/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
    "name": "analytic",
    "description": "data analytic just reviewing"
  }'
```
&nbsp;

- Delete Role\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/roles/{role-id}\
curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/roles/ebf42dcc-380a-4786-87da-97fcf242b37d' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Assign Feature to Role\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/roles/{role-id}/features/\
  body: Array of feature-id\
  curl:
```
curl --location 'localhost:8080/keyauth/v1/roles/da77f64f-7dbf-4f39-8479-d746da36581d/features/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '["feature_id"]'
```
&nbsp;

- Delete Feature from Role\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/roles/{role-id}/features/\
  body: Array of feature-id\
  curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/roles/da77f64f-7dbf-4f39-8479-d746da36581d/features/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '["feature_id"]'
```

## Departments
| Column    | Type         | Description |
|:----------|:-------------|:-----------:|
| id        | char(64)     |             |
| name      | char(64)     |             |
| number    | char(64)     |             |
| parent    | char(64)     |             |
| grade     | tinyint      |             |
| path      | text         |             |
| manager   | char(64)     |             |
| domain_id | char(64)     |             |
| create_at | int unsigned |             |
| extra     | text         |             |

### APIs
- Get Department\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/departments/{department-id}\
  response:
```
type Department struct {
	ID       string `json:"id"`
	Number   string `json:"number,omitempty"`    
	Name     string `json:"name,omitempty"`      
	Grade    int    `json:"grade,omitempty"`    
	Path     string `json:"path,omitempty"`      
	CreateAt int64  `json:"create_at,omitempty"`  
	DomainID string `json:"domain_id,omitempty"`  

	ParentID  string `json:"parent_id,omitempty"`  
	ManagerID string `json:"manager_id,omitempty"`  

	Users    []*User    `json:"users,omitempty"`    
	Projects []*Project `json:"projects,omitempty"`  
	Roles    []*Role    `json:"roles,omitempty"`    

	ProjectIDs []string `json:"-"`
	RoleIDs    []string `json:"-"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/departments/0844e43d-a4a6-47f1-9cff-de819141a54a' \
--header 'content-type: application/json' \
--header 'Authorization: Bearer ••••••'
```
&nbsp;

- Department List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/departments/\
  response: Array of Department
```
type Department struct {
	ID       string `json:"id"`
	Number   string `json:"number,omitempty"`    
	Name     string `json:"name,omitempty"`      
	Grade    int    `json:"grade,omitempty"`    
	Path     string `json:"path,omitempty"`      
	CreateAt int64  `json:"create_at,omitempty"`  
	DomainID string `json:"domain_id,omitempty"`  

	ParentID  string `json:"parent_id,omitempty"`  
	ManagerID string `json:"manager_id,omitempty"`  

	Users    []*User    `json:"users,omitempty"`    
	Projects []*Project `json:"projects,omitempty"`  
	Roles    []*Role    `json:"roles,omitempty"`    

	ProjectIDs []string `json:"-"`
	RoleIDs    []string `json:"-"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/departments/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create Department\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/departments/\
  body:
```
type NewDepartment struct { 
	Name     string `json:"name,omitempty"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/departments/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
    "name": "analytic_department"
  }'
```
&nbsp;

- Delete Department\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/departments/{department-id}\
  response:
```
type NewDepartment struct { 
	Name     string `json:"name,omitempty"`
}
```
curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/departments/1ac83bd6-2e00-41b0-a4da-65e6d0ea16cb' \
  --header 'content-type: application/json' \
  --header 'Authorization: ••••••'
```
&nbsp;

## Services
| Column            | Type         | Description |
|:------------------|:-------------|:-----------:|
| id                | char(64)     |             |
| type              | char(64)     |             |
| name              | varchar(255) |             |
| description       | text         |             |
| enabled           | int unsigned |             |
| status            | varchar(255) |             |
| status_update_at  | int unsigned |             |
| current_version   | varchar(128) |             |
| upgrade_version   | varchar(128) |             |
| downgrade_version | varchar(128) |             |
| create_at         | int unsigned |             |
| update_at         | int unsigned |             |
| client_id         | char(128)    |             |
| client_secret     | char(255)    |             |
| token_expire_time | int unsigned |             |
| extra             | text         |             |

### APIs
- Get Service\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/services/{service-id}\
  response:
```
type Service struct {
	ID               string      `json:"id"`                          
	Type             ServiceType `json:"type,omitempty"`               
	Name             string      `json:"name,omitempty"`              
	Description      string      `json:"description,omitempty"`    
	Enabled          bool        `json:"enabled"`                     
	Status           Status      `json:"status,omitempty"`            // (unavailable/avaliable/upgrading/downgrading)
	StatusUpdateAt   int64       `json:"status_update_at,omitempty"`   
	CurrentVersion   string      `json:"current_version,omitempty"`    
	UpgradeVersion   string      `json:"upgrade_version,omitempty"`    
	DowngradeVersion string      `json:"downgrade_version,omitempty"`  
	CreateAt         int64       `json:"create_at,omitempty"`         
	UpdateAt         int64       `json:"update_at,omitempty"`          
	ClientID         string      `json:"client_id,omitempty"`          
	ClientSecret     string      `json:"client_secret,omitempty"`      
	TokenExpireTime  int64       `json:"token_expire_time,omitempty"`  
	Features         []*Feature  `json:"features,omitempty"`           
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/services/f7fed786-b6c1-4c48-bb7a-7aaf08d95217' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Service List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/services/\
  response: Array of Service
```
type Service struct {
	ID               string      `json:"id"`                          
	Type             ServiceType `json:"type,omitempty"`               
	Name             string      `json:"name,omitempty"`              
	Description      string      `json:"description,omitempty"`    
	Enabled          bool        `json:"enabled"`                     
	Status           Status      `json:"status,omitempty"`            // (unavailable/avaliable/upgrading/downgrading)
	StatusUpdateAt   int64       `json:"status_update_at,omitempty"`   
	CurrentVersion   string      `json:"current_version,omitempty"`    
	UpgradeVersion   string      `json:"upgrade_version,omitempty"`    
	DowngradeVersion string      `json:"downgrade_version,omitempty"`  
	CreateAt         int64       `json:"create_at,omitempty"`         
	UpdateAt         int64       `json:"update_at,omitempty"`          
	ClientID         string      `json:"client_id,omitempty"`          
	ClientSecret     string      `json:"client_secret,omitempty"`      
	TokenExpireTime  int64       `json:"token_expire_time,omitempty"`  
	Features         []*Feature  `json:"features,omitempty"`           
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/services/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create Service\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/services/\
  body: 
```
type NewService struct {           
	Type             ServiceType `json:"type,omitempty"`               
	Name             string      `json:"name,omitempty"`              
	Description      string      `json:"description,omitempty"`        
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/services/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
      "name": "pasifik_online_service",
      "description": "Pasifik Online for vessel business data management",
      "type": "controller_pannel"
  }'
```
&nbsp;

- Delete Service\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/services/{service-id}

curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/services/23166a51-9ca1-47a3-ae80-add90d2e1392' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

## Applications
| Column              | Type         | Description |
|:--------------------|:-------------|:-----------:|
| id                  | char(64)     |             |
| name                | varchar(64)  |             |
| user_id             | char(64)     |             |
| website             | varchar(255) |             |
| logo_image          | varchar(255) |             |
| description         | text         |             |
| create_at           | int unsigned |             |
| update_at           | int unsigned |             |
| redirect_uri        | varchar(128) |             |
| client_id           | char(64)     |             |
| client_secret       | char(255)    |             |
| locked              | tinyint(1)   |             |
| last_login_time     | int unsigned |             |
| last_login_ip       | varchar(255) |             |
| login_failed_times  | int unsigned |             |
| login_success_times | int unsigned |             |
| token_expire_time   | int unsigned |             |
| extra               | text         |             |

### APIs
- Get Application\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/applications/{application-id}\
  response:
```
type Application struct {
	ID          string `json:"id"`                    
	Name        string `json:"name"`                 
	UserID      string `json:"user_id"`               
	Website     string `json:"website,omitempty"`     
	LogoImage   string `json:"logo_image,omitempty"`  
	Description string `json:"description"`           
	CreateAt    int64  `json:"create_at"`            
	UpdateAt    int64  `json:"update_at"`             

	RedirectURI       string `json:"redirect_uri"`         
	ClientID          string `json:"client_id"`            
	ClientSecret      string `json:"client_secret"`       
	Locked            bool   `json:"locked"`              
	LastLoginTime     int64  `json:"last_login_time"`      
	LastLoginIP       string `json:"last_login_ip"`        
	LoginFailedTimes  int    `json:"login_failed_times"`   
	LoginSuccessTimes int64  `json:"login_success_times"`  
	TokenExpireTime   int64  `json:"token_expire_time"`    
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/applications/57474675-756b-41a6-b0ae-5af8e0c35995' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Application List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/applications/\
  response: Array of Application
```
type Application struct {
	ID          string `json:"id"`                    
	Name        string `json:"name"`                 
	UserID      string `json:"user_id"`               
	Website     string `json:"website,omitempty"`     
	LogoImage   string `json:"logo_image,omitempty"`  
	Description string `json:"description"`           
	CreateAt    int64  `json:"create_at"`            
	UpdateAt    int64  `json:"update_at"`             

	RedirectURI       string `json:"redirect_uri"`         
	ClientID          string `json:"client_id"`            
	ClientSecret      string `json:"client_secret"`       
	Locked            bool   `json:"locked"`              
	LastLoginTime     int64  `json:"last_login_time"`      
	LastLoginIP       string `json:"last_login_ip"`        
	LoginFailedTimes  int    `json:"login_failed_times"`   
	LoginSuccessTimes int64  `json:"login_success_times"`  
	TokenExpireTime   int64  `json:"token_expire_time"`    
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/applications/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create Application\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/applications/\
  body:
```
type Application struct {              
	Name        string `json:"name"`                  
	Website     string `json:"website,omitempty"`     
	Description string `json:"description"`           
	RedirectURI       string `json:"redirect_uri"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/applications/' \
--header 'content-type: application/json' \
--header 'Authorization: Bearer ••••••' \
--data '{
    "name": "pasifik_online_application",
    "description": "Pasifik Online for vessel business data management",
    "redirect_uri": "https://www.pasifik-online.com/dashboard",
    "website": "https://www.pasifik-online.com"
}'
```
&nbsp;

- Delete Application\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/applications/{application-id}\

curl:
```
  curl --location --request DELETE 'localhost:8080/keyauth/v1/applications/289bd623-d955-4455-9e73-494514b811e4' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

## Features
| Column               | Type          | Description |
|:---------------------|:--------------|:-----------:|
| id                   | char(64)      |             |
| name                 | varchar(32)   |             |
| tag                  | varchar(256)  |             |
| endpoint             | varchar(256)  |             |
| description          | text          |             |
| is_deleted           | int unsigned  |             |
| when_deleted_version | varchar(255)  |             |
| when_deleted_time    | int unsigned  |             |
| is_added             | int unsigned  |             |
| when_added_version   | varchar(255)  |             |
| when_added_time      | int unsigned  |             |
| service_id           | char(64)      |             |
| extra                | text          |             |

### APIs
- Create Feature in Service\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/features/\
  body:
```
type FeatureRegistryReq struct {
	Version  string            `json:"version"`
	Features []*models.Feature `json:"features"`
}
type Feature struct {
	ID             string `json:"id"`                              
	Name           string `json:"name"`                            
	Tag            string `json:"tag,omitempty"`                  // POST/GET/DELETE
	HTTPEndpoint   string `json:"endpoint,omitempty"`             // /<service_name>/<resource_name>/<action>
	Description    string `json:"description,omitempty"`           
	IsDeleted      bool   `json:"H,omitempty"`                    
	DeletedVersion string `json:"when_deleted_version,omitempty"`  
	DeleteAt       int64  `json:"when_deleted_time,omitempty"`     
	IsAdded        bool   `json:"is_added,omitempty"`             
	AddedVersion   string `json:"when_added_version,omitempty"`    
	AddedAt        int64  `json:"when_added_time,omitempty"`      
	ServiceID      string `json:"service_id,omitempty"`           
	Version        string `json:"-"`                            
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/features/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
      "version": "1.0.1",
      "features": [
          {
              "id": "feature_01",
              "name": "Pasifik_online_dashboard_feature",
              "tag": "HTTP_GET",
              "endpoint": "pasifik_online/dashboard",
              "description": "Pasifik Online Dashboard Page",
              "is_deleted": false,
              "when_deleted_version": "",
              "when_deleted_time": 0,
              "is_added": true,
              "when_added_version": "",
              "when_added_time": 0,
              "service_id": "d1e9d6f4-9044-4a80-a524-c0d3ee3235c8"
          }
      ]
  }'
```
&nbsp;

- Get Feature from Service\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/services/{service-id}/features/\
  response: Array of Feature
```
type Feature struct {
	ID             string `json:"id"`                              
	Name           string `json:"name"`                            
	Tag            string `json:"tag,omitempty"`                  // POST/GET/DELETE
	HTTPEndpoint   string `json:"endpoint,omitempty"`             // /<service_name>/<resource_name>/<action>
	Description    string `json:"description,omitempty"`           
	IsDeleted      bool   `json:"H,omitempty"`                    
	DeletedVersion string `json:"when_deleted_version,omitempty"`  
	DeleteAt       int64  `json:"when_deleted_time,omitempty"`     
	IsAdded        bool   `json:"is_added,omitempty"`             
	AddedVersion   string `json:"when_added_version,omitempty"`    
	AddedAt        int64  `json:"when_added_time,omitempty"`      
	ServiceID      string `json:"service_id,omitempty"`           
	Version        string `json:"-"`                            
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/services/49a3897f-ae9d-44c5-a27f-60e73f6d7ac0/features/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

## Projects
| Column      | Type         | Description |
|:------------|:-------------|:-----------:|
| id          | char(64)     |             |
| name        | varchar(128) |             |
| picture     | varchar(128) |             |
| latitude    | float(32,0)  |             |
| longitude   | float(32,0)  |             |
| enabled     | int unsigned |             |
| owner_id    | char(64)     |             |
| description | text         |             |
| domain_id   | char(64)     |             |
| create_at   | int unsigned |             |
| update_at   | int unsigned |             |
| extra       | text         |             |

### APIs
- Get Project\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/projects/{project-id}\
  response:
```
type Project struct {
	ID          string  `json:"id,omitempty"`           
	Name        string  `json:"name,omitempty"`        
	Picture     string  `json:"picture,omitempty"`      
	Latitude    float64 `json:"latitude,omitempty"`    
	Longitude   float64 `json:"longitude,omitempty"` 
	Enabled     bool    `json:"enabled,omitempty"`    
	Owner       string  `json:"owner_id,omitempty"`    
	Description string  `json:"description,omitempty"` 
	DomainID    string  `json:"domain_id,omitempty"`  
	CreateAt    int64   `json:"create_at,omitempty"`  
	UpdateAt    int64   `json:"update_at,omitempty"`  
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/projects/36615d59-8f27-41e5-8df0-1f775e95e636' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Project List\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/projects/\
  response: Array of Project
```
type Project struct {
	ID          string  `json:"id,omitempty"`           
	Name        string  `json:"name,omitempty"`        
	Picture     string  `json:"picture,omitempty"`      
	Latitude    float64 `json:"latitude,omitempty"`    
	Longitude   float64 `json:"longitude,omitempty"` 
	Enabled     bool    `json:"enabled,omitempty"`    
	Owner       string  `json:"owner_id,omitempty"`    
	Description string  `json:"description,omitempty"` 
	DomainID    string  `json:"domain_id,omitempty"`  
	CreateAt    int64   `json:"create_at,omitempty"`  
	UpdateAt    int64   `json:"update_at,omitempty"`  
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/projects/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Self Projects\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/self/projects/\
  response: Array of Project
```
type Project struct {
	ID          string  `json:"id,omitempty"`           
	Name        string  `json:"name,omitempty"`        
	Picture     string  `json:"picture,omitempty"`      
	Latitude    float64 `json:"latitude,omitempty"`    
	Longitude   float64 `json:"longitude,omitempty"` 
	Enabled     bool    `json:"enabled,omitempty"`    
	Owner       string  `json:"owner_id,omitempty"`    
	Description string  `json:"description,omitempty"` 
	DomainID    string  `json:"domain_id,omitempty"`  
	CreateAt    int64   `json:"create_at,omitempty"`  
	UpdateAt    int64   `json:"update_at,omitempty"`  
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/self/projects/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Create Project\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/self/projects/{project-id}/\
  body:
```
type NewProject struct {
	Name        string  `json:"name,omitempty"`        
	Description string  `json:"description,omitempty"` 
}
```
  curl:
```
curl --location 'localhost:8080/keyauth/v1/projects/' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••' \
  --data '{
      "name": "pasifik_online",
      "description": "Pasifik Online for vessel business data management"
  }'
```
&nbsp;

- Delete Project\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/self/projects/{project-id}/\

curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/projects/36615d59-8f27-41e5-8df0-1f775e95e636' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Get Projects Members\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/self/projects/{project-id}/members\
  response: Array of Project
```
type User struct {
	ID                string    `json:"id,omitempty"`                  
	Account           string    `json:"account,omitempty"`             
	Mobile            string    `json:"mobile,omitempty"`              
	Email             string    `json:"email,omitempty"`               
	Phone             string    `json:"phone,omitempty"`               
	Address           string    `json:"address,omitempty"`             
	RealName          string    `json:"real_name,omitempty"`           
	NickName          string    `json:"nick_name,omitempty"`           
	Gender            string    `json:"gender,omitempty"`              
	Avatar            string    `json:"avatar,omitempty"`              
	Language          string    `json:"language,omitempty"`            
	City              string    `json:"city,omitempty"`                
	Province          string    `json:"province,omitempty"`            
	Locked            int       `json:"locked,omitempty"`              
	CreateAt          int64     `json:"create_at,omitempty"`           
	ExpiresActiveDays int       `json:"expires_active_days,omitempty"` 
	Password          *Password `json:"password,omitempty"`            
	IsDomainOwner     bool      `json:"is_domain_owner,omitempty"`

	Domain         *Domain      `json:"domain,omitempty"`          
	DefaultProject *Project     `json:"default_project,omitempty"` 
	Department     *Department  `json:"department,omitempty"`      
	LoginStatus    *LoginStatus `json:"login_status,omitempty"`    
	Roles          []*Role      `json:"roles,omitempty"`           
	Projects       []*Project   `json:"projects,omitempty"`
}
```
curl:
```
curl --location 'localhost:8080/keyauth/v1/projects/e32f0ae8-b534-4eb2-947e-5f1fb43c5f6e/members' \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer ••••••'
```
&nbsp;

- Add Member to Project\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/self/projects/{project-id}/members\
  body: Array of UserID
curl:
```
curl --location 'localhost:8080/keyauth/v1/projects/e32f0ae8-b534-4eb2-947e-5f1fb43c5f6e/members' \
  --header 'content-type: application/json' \
  --header 'Authorization: ••••••' \
  --data '["97042433-3e82-4543-bcb6-3ab057792bd3"]'
```
&nbsp;

## tokens
| Column         | Type         | Description |
|:---------------|:-------------|:-----------:|
| access_token   | varchar(128) |             |
| refresh_token  | varchar(128) |             |
| scope          | varchar(255) |             |
| name           | char(64)     |             |
| grant_type     | char(64)     |             |
| token_type     | char(64)     |             |
| create_at      | int unsigned |             |
| expire_at      | int unsigned |             |
| user_id        | char(64)     |             |
| domain_id      | char(64)     |             |
| project_id     | char(64)     |             |
| application_id | char(64)     |             |
| service_id     | char(64)     |             |
| description    | text         |             |
| extra          | text         |             |

### APIs
- Create Token (LOGIN)\
  method: <span style="color:orange">POST</span>\
  path: /keyauth/v1/oauth2/tokens/\
  body:
```
type Auth struct {      
	ClientID       string    `json:"client_id"`    
	ClientSecret   string    `json:"client_secret"`    
	Username       string    `json:"username"`    
	Password       string    `json:"password"`    
	GrantType      string    `json:"grant_type"`   
}
```
  response: 
```
type Token struct {
	AccessToken    string    `json:"access_token"`               
	RefreshToken   string    `json:"refresh_token,omitempty"`   
	TokenType      TokenType `json:"token_type,omitempty"`      
	GrantType      GrantType `json:"grant_type,omitempty"`       
	UserID         string    `json:"user_id,omitempty"`        
	CurrentProject string    `json:"current_project,omitempty"` 
	DomainID       string    `json:"domain_id,omitempty"`      
	ServiceID      string    `json:"service_id,omitempty"`      
	ApplicationID  string    `json:"application_id,omitempty"`  
	Name           string    `json:"name,omitempty"`            
	Description    string    `json:"description,omitempty"`      
	Scope          string    `json:"scope,omitempty"`          
	CreatedAt      int64     `json:"create_at,omitempty"`       
	ExpiresIn      int64     `json:"ttl,omitempty"`             
	ExpiresAt      int64     `json:"expires_at,omitempty"`    

	IsSystemAdmin     bool       `json:"is_system_admin,omitempty"`    
	IsDomainAdmin     bool       `json:"is_domain_admin,omitempty"`     
	Roles             []*Role    `json:"roles,omitempty"`             
	AvaliableProjects []*Project `json:"available_projects,omitempty"`  
}
```
  curl:
```
curl --location 'localhost:8080/keyauth/v1/oauth2/tokens/' \
  --header 'content-type: application/json' \
  --data '{
      "client_id": "jRqOOEBeGle1L4D31cCXai1h",
      "client_secret": "vyLT4khWj2s7f3RrRShi5ljFi8TMPlaM",
      "username": "admin",
      "password": "yenwieyenwie",
      "grant_type": "password"
  }'
```
&nbsp;

- Validate Token\
  method: <span style="color:green">GET</span>\
  path: /keyauth/v1/oauth2/tokens/{token}\
  response:
curl:
```
curl --location 'localhost:8080/keyauth/v1/oauth2/tokens/LktBeUlaRXV5bWZEOFNNenJJb3lBc2lH' \
  --header 'content-type: application/json' \
  --header 'Authorization: Basic {Base64Encode(username:password)}'
```
&nbsp;

- Revoke Token (LOGOUT)\
  method: <span style="color:red">DELETE</span>\
  path: /keyauth/v1/oauth2/tokens/{token}\
  response:
  curl:
```
curl --location --request DELETE 'localhost:8080/keyauth/v1/oauth2/tokens/OW9HbXd-NnJtSW1jek1RWU52blZVT0pZ' \
  --header 'content-type: application/json' \
  --header 'Authorization: Basic {Base64Encode(username:password)}'
```
&nbsp;