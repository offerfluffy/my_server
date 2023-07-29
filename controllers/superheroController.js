const { Superhero, Superpower, Image } = require("../models");
const createHttpError = require("http-errors");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {
      body: { superhero },
    } = req;

    const superheroD = await Superhero.create(
      {
        nickname: superhero.nickname,
        realName: superhero.realName,
        birthday: superhero.birthday,
        originDescription: superhero.originDescription,
        catchPhrase: superhero.catchPhrase,
        Superpowers: [{ superpowers: superhero.superpowers }],
      },
      {
        include: [Superpower],
      }
    );

    res.status(201).send({ data: superheroD });
  } catch (error) {
    next(error);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const { superhero } = req;

    const superheroData = await Superhero.findByPk(superhero.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        { model: Superpower, exclude: ["createdAt", "updatedAt"] },
        { model: Image, exclude: ["createdAt", "updatedAt"] },
      ],
      returning: true,
    });

    res.status(200).send({ data: superheroData });
  } catch (error) {
    next(error);
  }
};

module.exports.getSuperheroes = async (req, res, next) => {
  try {
    const superheroes = await Superhero.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        { model: Superpower, exclude: ["createdAt", "updatedAt"] },
        { model: Image, exclude: ["createdAt", "updatedAt"] },
      ],
    });

    if (superheroes === 0) {
      return next(createHttpError(404, "Superheroes not found"));
    }

    res.status(200).send({ data: superheroes });
  } catch (error) {
    next(error);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const { body, superhero } = req;

    const [superheroesUpdated, [updatedSuperHeroes]] = await Superhero.update(
      body,
      {
        where: {
          id: superhero.id,
        },
        returning: true,
      }
    );

    if (superheroesUpdated !== 1) {
      return next(createHttpError(404, "Superhero not found"));
    }

    res.status(200).send({ data: updatedSuperHeroes });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const { superhero } = req;

    const deletedSuperhero = await Superhero.destroy({
      where: {
        id: superhero.id,
      },
    });

    if (!deletedSuperhero) {
      return next(createHttpError(404, "Superhero not delted"));
    }

    res.status(200).send({ data: deletedSuperhero });
  } catch (error) {
    next(error);
  }
};
