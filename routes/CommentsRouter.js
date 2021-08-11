const Router = require("express");
const router = new Router();
const CommentsController = require("../controllers/CommentsController");

router.get("/", CommentsController.getAll);
router.post("/", CommentsController.create);

module.exports = router;
