const { Signup, Login,Logout, uploadImage } = require('../Controllers/AuthController')
const userVerification=require( '../Middlewares/AuthMiddleware');
const authrouter = require('express').Router()
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });



authrouter.post('/signup', Signup)
authrouter.post('/login', Login)
authrouter.post('/logout',Logout)
authrouter.post('/upload',upload.array('images',10),userVerification,uploadImage)


module.exports = authrouter