const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    category: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false, //원래 true여야함 지금 테스트
      default: "",
    },
    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } //time (update, create time)
);

module.exports = mongoose.model("Item", ItemSchema);
