const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/Users");
//const postRoute = require("./routes/posts");
//const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
//can send any json file
//app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: " + err));

const storage = multer.diskStorage({
  //cb(call back) function take care errors
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded"); //upload only one file-> single
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
//app.use("/api/posts", postRoute);
//app.use("/api/categories", categoryRoute);

//portnumber
app.listen("8080", () => {
  console.log("Backend is running");
});
