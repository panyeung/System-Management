const router = require("express").Router();
let Category = require("../Models/category.model");

//adding category
router.post("/manage/category/add", (req, res) => {
  const { name, parentId } = req.body;
  Category.create({
    name: name,
    parentId: parentId || "0",
  })
    .then((category) => {
      res.send({ status: 0, data: Category });
    })
    .catch((error) => {
      console.log("Category Add Error", error);
      res.send({ status: 1, msg: "Category Add Error, please try again!" });
    });
});

//Delete Category
router.post("/manage/category/delete", (req, res) => {
  const { _id } = req.body;
  Category.deleteMany({ $or: [{ _id: _id }, { parentId: _id }] })
    .then((category) => {
      res.send({ status: 0, data: category });
    })
    .catch((error) => {
      console.error("Delete Category Error", error);
      res.send({ status: 1, msg: "Delete Category Error, please try again!" });
    });
});

//Getting Category list
router.get("/manage/category/list", (req, res) => {
  const parentId = req.query.parentId;
  Category.find({ parentId })
    .sort({ _id: -1 })
    .then((categorys) => {
      res.send({ status: 0, data: categorys });
    })
    .catch((error) => {
      console.error("Getting category list Error ", error);
      res.send({
        status: 1,
        msg: "Getting category list Error please try again",
      });
    });
});

// Update Category
router.post("/manage/category/update", (req, res) => {
  const { categoryId, categoryName } = req.body;
  Category.findOneAndUpdate(
    { _id: categoryId },
    { name: categoryName },
    (useFindAndModify = false)
  )
    .then((oldCategory) => {
      return res.send({
        status: 0,
        newCategoryId: categoryId,
        newCategoryName: categoryName,
      });
    })
    .catch((error) => {
      console.error("Category update error", error);
      return res.send({
        status: 1,
        msg: "Category update error, please try again",
      });
    });
});

// getting category base on ID
router.get("/manage/category/info", (req, res) => {
  const categoryId = req.query.categoryId;
  Category.findOne({ _id: categoryId })
    .then((category) => {
      return res.send({ status: 0, data: category });
    })
    .catch((error) => {
      console.error("Getting Category Error ", error);
      return res.send({
        status: 1,
        msg: "Getting Category Error, please try again",
      });
    });
});

module.exports = router;
