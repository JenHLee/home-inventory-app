const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //time (update, create time)
);

module.exports = mongoose.model("Category", CategorySchema);
