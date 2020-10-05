const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const md5 = require("blueimp-md5");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  email: String,
  create_time: { type: Number, default: Date.now },
  role_id: String,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

User.findOne({ username: "admin" }).then((user) => {
  if (!user) {
    User.create({ username: "admin", password: md5("admin") }).then((user) => {
      console.log("InitializeUser: userName: admin PassWord: admin");
    });
  }
});

module.exports = User;
