const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
//can send any json file
app.use("/images", express.static(path.join(__dirname, "/images")));

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const itemRoute = require("./routes/items");
const categoryRoute = require("./routes/categories");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: " + err));


//CREATE STORAGE TO UPLOAD ITEM IMAGE 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //Callback, images(destination)
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//UPLOAD ITEM IMAGE
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded"); //upload only one file -> single
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/categories", categoryRoute);

//PORT NUMBER
app.listen("5000", () => {
  console.log("Backend is running");
});
