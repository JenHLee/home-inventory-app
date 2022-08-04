const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//SINGUP (REGISTER)
router.post("/signup", async (req, res) => {
  console.log("before try");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //can send username, pw, etc everthing inside of req
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPass,
      //password: req.body.password, <-original version of password that has no bcrpyt
    });

    const user = await newUser.save();
    res.status(200).json(user);
    //when req is working
    console.log("signup successful, user: " + user);
  } catch (err) {
    res.status(500).json(err);
    console.log("error:" + err);
    //when req is not working
  }
});
//create -> post, exi st user -> put, delete user -> delete, not change anything -> get

//SIGNIN (LOGIN)
router.post("/signin", async (req, res) => {
  console.log("signin-backend");
  console.log("req email:" + req.body.email);
  console.log("req password:" + req.body.password);
  try {
    console.log("try");
    const user = await User.findOne({ email: req.body.email });
    //unique user find by email (unique key) in Mongo DB
    console.log("email user found");

    //user status check
    console.log("user status: " + user.status);
    if(user.status == 'inactive'){
      console.log("User account is inactive!");
      return res.status(400).json("User account is inactive!");
    }

    //if there is no user inside our DB, show 400 error code with Wrong Credentials! message.
    if (!user) {
      return res.status(400).json("Wrong user email!");
    }


    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong Password!");
    }
    //!validated && res.status(400).json("Wrong password!");
    //validate is not working -> return -> try console.log line by line

    const userStatus = user.status;
    console.log("userStatus: " + userStatus);

    const { password, ...others } = user._doc;
    return res.status(200).json(others);

  } catch (err) {
    console.log("error is inside catch");
    //res.status(500).json(err);
    console.log("error message:" + err);
    //res.json(err);
  }
});

module.exports = router;
