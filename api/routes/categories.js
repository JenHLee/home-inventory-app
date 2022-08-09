//ADMIN AUTHORITY !!!

const router = require("express").Router();
const Category = require("../models/Category");
const { route } = require("./auth");

//CREATE CATEGORY
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);

    }catch(err){
        res.status(500).json(err);
    }
});

//FETCH(GET) ALL CATEGORIES
router.get("/", async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);

    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE CATEGORY
router.put("/:id", async (req,res)=> {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, {new: true}
        );
        res.status(200).json(updatedCategory);
    } catch(err) {
        res.status(500).json(err);}
});

//DELETE CATEGORY
router.delete("/:id", async (req,res)=> {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category deleted...")
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;