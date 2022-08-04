const router = require("express").Router();
const User = require("../models/User");
const Item = require("../models/Item");

//CREATE ITEM
router.post("/", async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE ITEM  
router.put("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item.email === req.body.email)
            try {
                const updatedItem = await Item.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedItem);
                //success -> show the updatedPost
            } catch (err) {
                res.status(500).json(err);
            } else {
            res.status(401).json("You can update only your Item!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//DELETE ITEM
router.delete("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item.email === req.body.email)
            try {
                await item.delete();
                res.status(200).json("Item has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            } else {
            res.status(401).json("You can delete only your item!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//GET ITEM
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//어드민에서 구현할 기능
//GET ALL POSTS 
router.get("/", async (req, res) => {
    const email = req.query.user;
    const catName = req.query.cat;
    try {
        let items; //It can changable
        if (email) {
            items = await Item.find({ email });//Same as username:username 
        } else if (catName) {
            items = await Item.find({
                categories: {
                    $in: [catName],//check if the catName is existed inside of categories array. 
                },
            });
        } else {
            items = await Item.find();
        }
        console.log("items: " + items);
        res.status(200).json(items);
    }
    catch (err) {
        console.log("error: " + err);
        res.status(500).json(err);
    }
});
module.exports = router;