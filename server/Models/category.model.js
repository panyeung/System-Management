const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: String, required: true, default: "0" },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model("categorys", categorySchema);

module.exports = CategoryModel;
