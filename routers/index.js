const rootRouter = require("express").Router();
const superheroRouter = require("./superheroRouter");

rootRouter.use("/superheroes", superheroRouter);

module.exports = rootRouter;
