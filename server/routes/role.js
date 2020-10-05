const router = require("express").Router();
let Role = require("../Models/role.model");

//Adding Role
router.post("/manage/role/add", (req, res) => {
  const { roleName } = req.body;
  Role.create({ name: roleName })
    .then((role) => {
      res.send({ status: 0, data: role });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "Adding Role Error,Please Try Again!" });
    });
});

//Deleting Role
router.post("/manage/role/delete", (req, res) => {
  const { _id } = req.body;
  Role.deleteOne({ _id })
    .then((data) => {
      res.send({ status: 0, data });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "Deleting Role Error, Please Try Again!" });
    });
});

// Getting the role list
router.get("/manage/role/list", (req, res) => {
  Role.find()
    .sort({ _id: -1 })
    .then((roles) => {
      res.send({ status: 0, data: roles });
    })
    .catch((error) => {
      console.error("Getting the role list Error", error);
      res.send({
        status: 1,
        msg: "Getting the role list Error, Please try again!",
      });
    });
});

//Role update
router.post("/manage/role/update", (req, res) => {
  const role = req.body;
  console.log(role);
  role.auth_time = Date.now();
  Role.findOneAndUpdate({ _id: role._id }, role)
    .then((oldRole) => {
      console.log("---", oldRole);
      res.send({ status: 0, data: { ...oldRole._doc, ...role } });
    })
    .catch((error) => {
      console.error("Role Update Error", error);
      res.send({ status: 1, msg: "Role Update Error, Please try Again!" });
    });
});
module.exports = router;
