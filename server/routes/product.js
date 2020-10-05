const router = require("express").Router();
let Product = require("../Models/product.model");
let pageFilter = require("./PageFilter/PageFilter");

//Adding product
router.post("/manage/product/add", (req, res) => {
  const product = req.body;
  Product.create(product)
    .then((product) => {
      res.send({ status: 0, data: product });
    })
    .catch((error) => {
      console.error("Adding Product Error", error);
      res.send({ status: 1, msg: "Adding Product Error, Please try again" });
    });
});

//Deleting product by Id
router.post("/manage/product/delete", (req, res) => {
  const { _id } = req.body;
  Product.deleteOne({ _id })
    .then((product) => {
      res.send({ status: 0, data: product });
    })
    .catch((error) => {
      console.error("Deleting Product Error", error);
      res.send({ status: 1, msg: "Deleting Product Error, Please Try Again!" });
    });
});

//Getting the product page list
router.get("/manage/product/list", (req, res) => {
  const { pageNum, pageSize } = req.query;
  Product.find()
    .sort({ _id: -1 })
    .then((products) => {
      res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
    })
    .catch((error) => {
      console.error("Getting Product list Error", error);
      res.send({
        status: 1,
        msg: "Getting Product List Error, Please Try Again!",
      });
    });
});

//search for product
router.get("/manage/product/search", (req, res) => {
  const { pageNum, pageSize, searchName, productName, productDesc } = req.query;
  let condition = {};
  if (productName) {
    condition = { name: new RegExp(`^.*${productName}.*$`) };
  } else if (productDesc) {
    condition = { desc: new RegExp(`^.*${productDesc}.*$`) };
  }
  Product.find(condition)
    .then((products) => {
      res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
    })
    .catch((error) => {
      console.error("Product Search Error", error);
      res.send({ status: 1, msg: "Product Search Error, Please Try Again!" });
    });
});

//Update Product
router.post("/manage/product/update", (req, res) => {
  const product = req.body;
  Product.findOneAndUpdate({ _id: product._id }, product)
    .then((oldProduct) => {
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error("Update Product Error", error);
      res.send({ status: 1, msg: "Update Product Error, Please Try Again!" });
    });
});

//Update Product Status(On shelf/offShelf)
router.post("/manage/product/updateStatus", (req, res) => {
  const { productId, status } = req.body;
  Product.findOneAndUpdate({ _id: productId }, { status })
    .then((oldProduct) => {
      res.send({ status: 0 });
    })
    .catch((error) => {
      console.error("Update Product Status Error", error);
      res.send({
        status: 1,
        msg: "Update Product Status Error, Please Try Again!",
      });
    });
});

require("./imageUpload")(router);
module.exports = router;
