const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
//can send any json file
//app.use("/images", express.static(path.join(__dirname, "/images")));

//IMPORT ROUTES
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const itemRoute = require("./routes/ItemRoute");
const categoryRoute = require("./routes/CategoryRoute");

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
app.use("/api/user", userRoute);
app.use("/api/item", itemRoute);
app.use("/api/category", categoryRoute);

//PORT NUMBER
app.listen("8080", () => {
  console.log("Backend is running");
});
