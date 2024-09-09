const express = require('express');
const {createUser,login}=require('../Controllers/userController');
const { auth , createToken} = require("../Middelwars/autorition ");
const userRouter = express.Router();

userRouter.post('/register',createToken, createUser);
userRouter.post('/login', auth, login);

module.exports = userRouter;