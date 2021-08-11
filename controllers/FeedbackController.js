const { Feedback } = require("./../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class FeedbackController {
  async getAll(req, res) {
    const feedbackList = await Feedback.findAll();
    res.json(feedbackList);
  }

  async create(req, res, next) {
    try {
      const { id, personName, feedbackText } = req.body;
      const { avatar } = req.files;
      let fileName = uuid.v4() + ".jpg"; //uuid - генерирует уникальное случайное имя для файла
      avatar.mv(path.resolve(__dirname, "..", "static", fileName)); // встроенная функция в node,  dirname- имя текущей папки, далее через запятую указыкаем путь. fileName - что именно перекидываем
      await Feedback.create({ id, personName, feedbackText, avatar: fileName });
      return res.status(200);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new FeedbackController();
