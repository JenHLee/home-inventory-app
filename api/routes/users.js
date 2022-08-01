const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATE
//to update, use put method
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //params is :id
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      //const hashedPass = await bcrypt.hash(req.body.password, salt); totally same
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      //{new:true} -> makes updatedUser -> sent as a new User
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("errors: " + err);
      res.status(500).json(err);
      //when req is not working
    }
  } else {
    res.status(401).json("You can update only your account!");
    //not allow
  }
});

/* 어드민에서 구현할 기능
//DELETE

after delete user -> sent a message
we need to delete all post of user (b/c even though we delete the user, we can still see the post of user) 
1. find user
2. find all post of user
3. delete all post of user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        //check the condition username is same as a user.username, after it's true, delete it inside DB
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      //if(user){
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
    //not allow
  }
});
*/
//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
