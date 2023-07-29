const createHttpError = require("http-errors");
const { Superhero } = require("../models");

module.exports.checkSuperheroExistanceMW = async (req, rex, next) => {
  try {
    const {
      params: { superheroId },
    } = req;

    const superhero = await Superhero.findByPk(superheroId);

    if (!superhero) {
      return next(createHttpError(404, "User doesn`t exist"));
    }

    req.superhero = superhero;

    next();
  } catch (error) {
    next(error);
  }
};
