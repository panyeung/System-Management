const router = require("express").Router();
let User = require("../Models/user.model");
let Role = require("../Models/role.model");
let passport = require("passport");
const md5 = require("blueimp-md5");

//localhost5000/users/
router.get("/", (req, res) => {
  //Mongodb method for getting all the user from the db
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // search user based on username and password
  User.findOne({ username, password: md5(password) })
    .then((user) => {
      if (user) {
        // login success
        // generate cookies (userid: user._id), save in browser
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        if (user.role_id) {
          Role.findOne({ _id: user.role_id }).then((role) => {
            user._doc.role = role;
            console.log("role user", user);
            res.send({ status: 0, data: user });
          });
        } else {
          user._doc.role = { menus: [] };
          // return login with success
          res.send({ status: 0, data: user });
        }
      } else {
        // login fail
        res.send({ status: 1, msg: "User Name Or password not correct!" });
      }
    })
    .catch((error) => {
      console.error("Login Error", error);
      res.send({ status: 1, msg: "Login fail, please try again!" });
    });
});

// add user
router.post("/manage/user/add", (req, res) => {
  // request
  const { username, password } = req.body;

  //find user
  User.findOne({ username })
    .then((user) => {
      // if user exist
      if (user) {
        // return error
        res.send({ status: 1, msg: "User Already exist!" });
        return new Promise(() => {});
      } else {
        // Not Exsit
        //save
        return User.create({ ...req.body, password: md5(password || "1234") });
      }
    })
    .then((user) => {
      // send back user info
      res.send({ status: 0, data: user });
    })
    .catch((error) => {
      console.error("Register error!", error);
      res.send({ status: 1, msg: "Register Error, Please Try Again!" });
    });
});

//Update User
router.post("/manage/user/update", (req, res) => {
  const newUser = req.body;

  //Find the User
  User.findOneAndUpdate({ _id: newUser._id }, newUser)
    .then((oldUser) => {
      const data = Object.assign(oldUser, newUser);
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.log("UpdateUser Error", error);
      res.send({ status: 1, msg: "Update User Error, please try again" });
    });
});

//Delete User
router.post("/manage/user/delete", (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  User.deleteOne({
    _id,
  }).then((doc) => {
    res.send({ status: 0, data: doc });
  });
});

//Get Users list
router.get("/manage/user/list", (req, res) => {
  User.find({ username: { $ne: "admin" } })
    .then((users) => {
      Role.find().then((roles) => {
        res.send({ status: 0, data: { users, roles } });
      });
    })
    .catch((error) => {
      console.error("Getting UserList Error", error);
      res.send({ status: 1, msg: "Getting UserList Error, Please Try again!" });
    });
});
module.exports = router;
