const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, //role
  auth_name: String, // who authorize it
  auth_time: Number,
  create_time: { type: Number, default: Date.now },
  menus: Array,
});

const RoleModel = mongoose.model("roles", roleSchema);

module.exports = RoleModel;
