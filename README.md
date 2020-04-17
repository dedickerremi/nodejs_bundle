# test_node

Run with Docker:
    docker-compose up --build

Run without Docker:
    PreRequisite: Service mongod running
    
    npm install

    - production:
        npm run production
    - dev:
        npm run dev

Run Tests:
    npm run test


Route:
    /ping (dev only usage)
    /auth
    /login
    [REQUIRE LOGGIN TOKEN]
    /users/
    /user/id/[id]
    /user/email/[email]

    [REQUIRE ADMIN RIGHT]
    /policies
    /policies/email/[email]
    /policies/id/[id]

Architecture folder:
    - API - Call endpoint with Axios
    - config - Basic application configuration
    - constants - static value on response
    - controllers - contains all controllers called when an endpoint is hit
    - db - Connexion Database
    - filter - express-requirement validation
    - middleware - contains all middlewares
    - model - Mongoose Schema
    - route - Define all routes to this application
    - tests
    - utils - Functions library