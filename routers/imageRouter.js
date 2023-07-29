const imageRouter = require("express").Router();
const ImageController = require("../controllers/imageContoroller");
const imageUpload = require("../utils/imageUpload");

imageRouter
  .route("/")
  .post(imageUpload.single("image"), ImageController.createImage)
  .get(ImageController.getImages);

imageRouter
  .route("/:imageId")
  .get(ImageController.getImage)
  .put(imageUpload.single("image"), ImageController.updateImage)
  .delete(ImageController.deleteImage);

module.exports = imageRouter;
