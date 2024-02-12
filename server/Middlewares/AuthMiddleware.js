const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
        res.json({ status: false })
    } else {
      console.log(data, '$$$$$')
      const user = await User.findById(data.id)
      console.log(user, '######')
      if (user){
        req.user = user
        next();
        // res.json({ status: true, user: user })
      }
      else  res.json({ status: false })
    }
  })
  
  
};

module.exports = userVerification;
