const express = require("express");
const authRouter = require("./AuthRoutes");
const userRouter = require("./UserRoutes");
const apirouter=express.Router();

apirouter.use("/auth", authRouter);
apirouter.use("/user", userRouter);

module.exports=apirouter;