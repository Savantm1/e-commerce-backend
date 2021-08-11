const Router = require("express");
const router = new Router();
const FeedbackController = require("../controllers/FeedbackController");

router.get("/", FeedbackController.getAll);
router.post("/", FeedbackController.create);

module.exports = router;
