const { Signup, Login,Logout } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const authrouter = require('express').Router()

authrouter.post('/signup', Signup)
authrouter.post('/login', Login)
authrouter.post('/logout',Logout)
authrouter.post('/',userVerification)

module.exports = authrouter