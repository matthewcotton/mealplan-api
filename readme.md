# Meal Plan API
This API provides endpoints for Recipe Planner (code name: mealplan) which is hosted at [add link]().
The repo can be found at [here](https://github.com/matthewcotton/mealplan)


## API Usage

### Authorization
Endpoint: https://mealplan-api.herokuapp.com/auth

Body Data: 
- username (required)
- password (required)

Header: (none)

### Get User
Endpoint: https://mealplan-api.herokuapp.com/user/[username]

Body Data: (none)

Header:
- Auth token

### Add User
Endpoint: https://mealplan-api.herokuapp.com/user/add

Body Data:
- username (required)
- password (required)

Header: (none)

### Update User Username
Endpoint: https://mealplan-api.herokuapp.com/user/username/[username]

Body Data:
- new_username (required)

Header:
- Auth token

### Update User Password
Endpoint: https://mealplan-api.herokuapp.com/user/password/[username]

Body Data:
- new_password (required)

Header:
- Auth token

### Delete User
Endpoint: https://mealplan-api.herokuapp.com/user/[username]

Body Data: (none)

Header:
- Auth token