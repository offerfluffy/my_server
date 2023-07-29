const superheroRouter = require("express").Router();
const superpowerRouter = require("./superpowerRouter");
const imageRouter = require("./imageRouter");
const SuperheroController = require("../controllers/superheroController");
const { checkSuperheroExistanceMW } = require("../middlewares/superhero.mv");

superheroRouter
  .route("/")
  .get(SuperheroController.getSuperheroes)
  .post(SuperheroController.createSuperhero);

superheroRouter
  .route("/:superheroId")
  .get(checkSuperheroExistanceMW, SuperheroController.getSuperhero)
  .put(checkSuperheroExistanceMW, SuperheroController.updateSuperhero)
  .delete(checkSuperheroExistanceMW, SuperheroController.deleteSuperhero);

superheroRouter.use(
  "/:superheroId/superpowers",
  checkSuperheroExistanceMW,
  superpowerRouter
);

superheroRouter.use(
  "/:superheroId/images",
  checkSuperheroExistanceMW,
  imageRouter
);

module.exports = superheroRouter;
