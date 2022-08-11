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

router.get("/filter/:categoryName", async (req,res)=> {
    try {
        const filteredItems = await Item.find({"category": req.params.categoryName});
        res.status(200).json(filteredItems);

    } catch(err) {
        res.status(500).json(err);
    }
})

//어드민에서 구현할 기능
//GET ALL ITEMS
router.get("/", async (req, res) => {
    const email = req.query.email;
    const role = req.query.role;
    try {
        let items; //It can changable
        if(email == null) {
            throw "email is empty";
            res.status(500).json();
        }
        else if (email) {
            items = await Item.find({ email });//Same as username:username 
            
        
        } else if(role == 1 || role == 3) {
            console.log("if user is admin.");
            items = await Item.find();
        } 
        res.status(200).json(items);
    }
    catch (err) {
        console.log("error: " + err);
        res.status(500).json(err);
    }
});
module.exports = router;