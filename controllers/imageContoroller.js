const { Image } = require("../models");
const createHttpError = require("http-errors");

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      superhero,
    } = req;

    const newImage = await Image.create({
      imagePath: filename,
      superheroId: superhero.id,
    });

    res.status(201).send({ data: newImage });
  } catch (error) {
    next(error);
    Image;
  }
};

module.exports.getImages = async (req, res, next) => {
  try {
    const { superhero } = req;

    const images = await superhero.getImages();

    res.status(200).send({ data: images });
  } catch (error) {
    next(error);
  }
};

module.exports.getImage = async (req, res, next) => {
  try {
    const {
      superhero,
      params: { imageId },
    } = req;

    const image = await Image.findByPk(imageId);

    const superheroHasImage = await superhero.hasImage(image);
    if (!superheroHasImage) {
      return next(createHttpError(404, "Superhero don`t have this image"));
    }

    res.status(200).send({ data: image });
  } catch (error) {
    next(error);
  }
};

module.exports.updateImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      superhero,
      params: { imageId },
    } = req;

    const [updateCount, [updatedImage]] = await Image.update(
      { imagePath: filename },
      {
        where: {
          id: imageId,
          superheroId: superhero.id,
        },
        fields: ["imagePath", "superheroId", "updatedAt", "deadline"],
        returning: true,
      }
    );

    if (updateCount !== 1) {
      return next(createHttpError(404, "Iamge not found"));
    }

    res.status(200).send({ data: updatedImage });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      superhero,
      params: { imageId },
    } = req;

    const image = await Image.findOne({
      where: {
        id: imageId,
        superheroId: superhero.id,
      },
    });

    if (!image) {
      return next(createHttpError(404, "image not found"));
    }

    await image.destroy();

    res.status(200).send({ data: image });
  } catch (error) {
    next(error);
  }
};
