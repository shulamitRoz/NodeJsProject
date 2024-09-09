const express = require("express");
require('dotenv').config();
const app= express();
const port = 8080;
const bodyParser=require("body-parser")
const toyRouter=require("./Routers/toyRouter")
const categoryRouter=require('./Routers/categoryRouter')
const userRouter= require("./Routers/userRouter")
const connectDB = require("./conecteDB");

app.use(bodyParser.json())
app.use(bodyParser.text())
connectDB()

// app.get('/getAlltoy',toyRouter)
// app.get('/getToyById/:id',toyRouter)
// app.post ("/addToy",toyRouter)
// app.delete("/deleteToy/:id",toyRouter)
// app.delete("/deleteAllToy",toyRouter)
// app.put('/updateToy/:id',toyRouter)


// app.get('/getToyByPrice',toyRouter)
// app.get('/getToyByName',toyRouter)


// app.get('/getAllCategories',categoryRouter)

app.use("/toys",toyRouter)
app.use("/category",categoryRouter)
app.use("/user",userRouter)

app.listen(port, ()=>{
    console.log("server runing");
})