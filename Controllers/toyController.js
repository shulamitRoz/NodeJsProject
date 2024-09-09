const { async, asyncScheduler } = require("rxjs");
const toyModel = require("../Models/toySchema");
const Category = require('../Models/categoryModel');


async function getAllToys(req, res) {
    try {
        let listToy = await toyModel.find()
        res.json(listToy)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}
async function getToyById(req, res) {
    try {
        const id = req.params.id;
        let oneToy = await toyModel.findById(id);
        res.json(oneToy).status(200)
    }
    catch (err) {
        res.send(err).status(400);
    }
}
// async function addToy(req, res) {
//     try {
//         let newToy = req.boddy;
//         let toy = await toyModel.create(newToy);
//         res.json(toy).status(200)
//     }
//     catch (err) {
//         res.send(err).status(400);
//     }
// }
// async function deleteToy(req, res) {
//     const { id } = req.params.id
//     try {
//         const deleted = await toyModel.findByIdAndDelete(id)
//         res.json(deleted)

//     }
//     catch (err) {
//         res.send(err).status(400);
//     }
// }
async function addToy(req, res) {
    try {
        const newToy = await toyModel.create(req.body);
        const category = await Category.findById(req.body.categoryId);
        console.log()
        if (category) {
            category.toys.push(newToy._id);
            await category.save();
        }
        res.status(200).json(newToy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteToy(req, res) {
    try {
        const deletedToy = await toyModel.findByIdAndDelete(req.params.id);
        if (deletedToy) {
            await Category.updateMany({}, { $pull: { toys: deletedToy._id } });
        }
        res.status(200).json(deletedToy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteAllToys(req, res) {
    try {

        const deleteAll = await toySchema.deleteMany({ price: { $lt: 1000 } });
        res.json(deleteAll)

    }
    catch (err) {
        res.send(err).status(400);
    }
}
async function updateToy(req, res) {
    try {
        const toy = await toyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(toy).status(200)
    }
    catch (err) {
        res.send(err).status(400);
    }
}
async function getToysByPrice(minPrice, maxPrice, res) {
    try {
        const toys = await toyModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
        res.json(toys);

    } catch (error) {
        console.error('Error fetching toys by price:', error);
        throw error;
    }
}
async function getToysbyName(nameSubstring, res) {
    try {
        const toys = await Toy.find({ name: { $regex: nameSubstring, $options: 'i' } });
        res.json(toys);
    } catch (error) {
        console.error('Error fetching toys by name:', error);
        throw error;
    }
}

module.exports = { getAllToys, getToyById, addToy, deleteToy, deleteAllToys, updateToy, getToysByPrice, getToysbyName }