const Router = require("express");
const router = new Router();
const BlogController = require("../controllers/BlogController");

router.get("/", BlogController.getAll);
router.get("/:id", BlogController.getItem);

module.exports = router;
