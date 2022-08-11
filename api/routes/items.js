const router = require("express").Router();
const User = require("../models/User");
const Item = require("../models/Item");

//CREATE ITEM
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  console.log(JSON.stringify(req.body));
  try {
    const savedItem = await newItem.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ITEM
router.put("/:id", async (req, res) => {
  const role = req.body.role;
  //   console.log(req.body);
  //   console.log("role: " + role);
  try {
    const item = await Item.findById(req.params.id);
    console.log("item: " + item);
    console.log("req.body: " + JSON.stringify(req.body));

    // console.log(req.params);
    if (role == 1 || role == 3) {
      try {
        const updatedItem = await Item.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              _id: item._id,
              category: req.body.category,
              title: req.body.title,
              price: req.body.price,
              photo: item.photo,
              email: item.email,
              role: item.role,
            },
          },
          { new: true }
        );
        console.log("req.params.id: " + req.params.id);
        console.log("updatedItem: " + updatedItem);
        res.status(200).json(updatedItem);
        //success -> show the updatedPost
      } catch (err) {
        console.log("catch in");
        console.log(err);
        res.status(500).json(err);
      }
    } else if (item.email === req.body.email)
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
      }
    else {
      res.status(401).json("You can update only your item! except admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ITEM
router.delete("/:id", async (req, res) => {
  const role = req.body.role;
  //   console.log("role: " + role);
  try {
    const item = await Item.findById(req.params.id);
    if (role == 1 || role == 3) {
      await item.delete();
      res.status(200).json("Item has been deleted...");
    } else if (item.email === req.body.email)
      try {
        await item.delete();
        res.status(200).json("Item has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    else {
      res.status(401).json("You can delete only your item!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ITEM
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

//어드민에서 구현할 기능
//GET ALL ITEMS
router.get("/", async (req, res) => {
  const email = req.query.email;
  const catName = req.query.cat;
  const role = req.query.role;
  // console.log(role);
  try {
    let items; //It can changable
    if (email == null) {
      throw "email is empty";
      res.status(500).json();
    }
    if (role == 1 || role == 3) {
      console.log("User is admin, get all items.");
      items = await Item.find();
    } else if (email) {
      items = await Item.find({ email }); //Same as username:username
    } else if (catName) {
      items = await Item.find({
        category: {
          $in: [catName], //check if the catName is existed inside of categories array.
        },
      });
    }
    // console.log("items: " + items);
    res.status(200).json(items);
  } catch (err) {
    console.log("error: " + err);
    res.status(500).json(err);
  }
});
module.exports = router;
