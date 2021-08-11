const { Pictures } = require("./../models/models");
const ApiError = require("./../error/ApiError");

class PicturesController {
  async create(req, res, next) {
    try {
      const { image_name, productId, id } = req.body;
      const image = await Pictures.create({ image_name, productId, id });
      return res.json(image);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PicturesController();
