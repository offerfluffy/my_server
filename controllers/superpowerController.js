const { Superpower } = require("../models");
const createHttpError = require("http-errors");

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body, superhero } = req;

    const newSuperpower = await superhero.createSuperpower(body);

    res.status(201).send({ data: newSuperpower });
  } catch (error) {
    next(error);
  }
};

module.exports.getSuperpowers = async (req, res, next) => {
  try {
    const { superhero } = req;

    const superpowers = await superhero.getSuperpowers();

    res.status(200).send({ data: superpowers });
  } catch (error) {
    next(error);
  }
};

module.exports.getSuperpower = async (req, res, next) => {
  try {
    const {
      superhero,
      params: { superpowerId },
    } = req;

    const superpower = await Superpower.findByPk(superpowerId);

    const superheroHasSuperpower = await superhero.hasSuperpower(superpower);
    if (!superheroHasSuperpower) {
      return next(createHttpError(404, "Superhero don`t have this superpower"));
    }

    res.status(200).send({ data: superpower });
  } catch (error) {
    next(error);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      body,
      superhero,
      params: { superpowerId },
    } = req;

    const [updateCount, [updatedSuperpower]] = await Superpower.update(body, {
      where: {
        id: superpowerId,
        superheroId: superhero.id,
      },
      fields: ["superpower", "superheroId", "updatedAt", "deadline"],
      returning: true,
    });

    if (updateCount !== 1) {
      return next(createHttpError(404, "Superpower not found"));
    }

    res.status(200).send({ data: updatedSuperpower });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      superhero,
      params: { superpowerId },
    } = req;

    const superpower = await Superpower.findOne({
      where: {
        id: superpowerId,
        superheroId: superhero.id,
      },
    });

    if (!superpower) {
      return next(createHttpError(404, "Superpower not found"));
    }

    await superpower.destroy();

    res.status(200).send({ data: superpower });
  } catch (error) {
    next(error);
  }
};
