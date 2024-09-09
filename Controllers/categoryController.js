const { async, asyncScheduler } = require("rxjs");
const categoryModel = require("../Models/categoryModel");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().populate({
            path: "toys",
            select: { name: 1 } 
        });
        res.status(200).json({ message: 'All categories', myCategory: categories });
    } catch (error) {
        console.error(error); 
        res.status(400).send('error!!!!!!!!!');
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new categoryModel({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports={getAllCategories, createCategory}