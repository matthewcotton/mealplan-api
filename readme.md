# Meal Plan API
This API provides endpoints for Recipe Planner (code name: mealplan) which is hosted at [add link]().
The repo can be found at [here](https://github.com/matthewcotton/mealplan)


## API Usage

### Authorization
Endpoint: https://mealplan-api.herokuapp.com/auth

Body Data: 
- username: String (required)
- password: String (required)

Header: (none)

### Get User
Endpoint: https://mealplan-api.herokuapp.com/user/[username]

Body Data: (none)

Header:
- Auth token (passed as 'authorization')

### Add User
Endpoint: https://mealplan-api.herokuapp.com/user/add

Body Data:
- username: String (required)
- password: String (required)

Header: (none)

### Update User Username
Endpoint: https://mealplan-api.herokuapp.com/user/username/[username]

Body Data:
- new_username: String (required)

Header:
- Auth token (passed as 'authorization')

### Update User Password
Endpoint: https://mealplan-api.herokuapp.com/user/password/[username]

Body Data:
- new_password String (required)

Header:
- Auth token (passed as 'authorization')

### Delete User
Endpoint: https://mealplan-api.herokuapp.com/user/[username]

Body Data: (none)

Header:
- Auth token (passed as 'authorization')

### Get All Recipes from one User
Endpoint: https://mealplan-api.herokuapp.com/recipe

Body Data: (none)

Header:
- Auth token (passed as 'authorization')

### Add A Recipes
Endpoint: https://mealplan-api.herokuapp.com/recipe/add

Body Data: (all fields required)
- title: String 
- prep_time: String 
- cook_time: String 
- serves: String
- ingredients: [{ 
    - measurement: Number 
    - unit: String 
    - ingredient: String 

     }]
- steps: [{ 
    - step: String
    - instruction: String

    }]

Header:
- Auth token (passed as 'authorization')
