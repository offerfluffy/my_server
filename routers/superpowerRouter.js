const superpowerRouter = require("express").Router();
const SuperpowerController = require("../controllers/superpowerController");

superpowerRouter
  .route("/")
  .get(SuperpowerController.getSuperpowers)
  .post(SuperpowerController.createSuperpower);

superpowerRouter
  .route("/:superpowerId")
  .get(SuperpowerController.getSuperpower)
  .put(SuperpowerController.updateSuperpower)
  .delete(SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
