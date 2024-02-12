const { uploadImages } = require('../Controllers/UserController');
const userrouter = require('express').Router()

userrouter.post('/', uploadImages)

module.exports = userrouter