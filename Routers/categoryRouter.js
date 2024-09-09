express= require("express");
const categoryController= require("../Controllers/categoryController")
const { createToken } = require("../Middelwars/autorition ");

const router=express.Router()


router.get("/getAllCategories",categoryController.getAllCategories);
router.post("/createCategory",createToken,categoryController.createCategory)

module.exports=router