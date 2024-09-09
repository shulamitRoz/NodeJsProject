const express= require("express");
const router=express.Router()
const toyController =require('../Controllers/toyController')
const { createToken } = require("../Middelwars/autorition ");


router.get('/getAlltoy',toyController.getAllToys)
router.delete("/deleteToy/:id",createToken,toyController.deleteToy)
router.delete("/deleteAllToy",createToken,toyController.deleteAllToys)
router.put('/updateToy/:id',createToken,toyController.updateToy)
router.post("/addToy",createToken,toyController.addToy)

module.exports=router