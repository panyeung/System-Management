const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
          status: 0,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve) => {
    let promise = cloudinary.v2.uploader.destroy(id);
    promise
      .then((response) => {
        //request success
        resolve(response);
      })
      .catch((err) => {
        //request failure
        message.error("Delete Image fail: " + err.message);
      });
  });
};
