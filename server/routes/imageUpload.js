/*
    handle picture upload
 */
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");

const dirPath = path.join(__dirname, "..", "public/upload");

const storage = multer.diskStorage({
  // destination: 'upload',
  destination: function (req, file, cb) {
    //Created directory
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err);
        } else {
          cb(null, dirPath);
        }
      });
    } else {
      cb(null, dirPath);
    }
  },
  filename: function (req, file, cb) {
    console.log("filename()", file);
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage });
const uploadSingle = upload.single("image");

module.exports = function fileUpload(router) {
  // upload picture
  router.post("/manage/img/upload", (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, "Images");

    uploadSingle(req, res, async function (err) {
      //handle error
      if (err) {
        return res.send({
          status: 1,
          msg: "Fail to upload picture",
        });
      }
      //console.log(req.file);
      let file = req.file;
      console.log("Insied image Upload: ", file.path);
      const { path } = file;
      const newPath = await uploader(path);
      console.log(file);
      if (newPath.status === 0) {
        fs.unlinkSync(file.path);
      }

      res.send({
        status: 0,
        data: {
          name: file.filename,
          //url: "http://localhost:5000/upload/" + file.filename,
          url: newPath,
        },
      });
    });
  });

  // delete
  router.post("/manage/img/delete", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const response = await cloudinary.delete(id);
    if (response.result === "ok") {
      res.send({
        status: 0,
      });
    } else {
      res.send({
        status: 1,
        msg: "fail to delete picture",
      });
    }
  });
};
