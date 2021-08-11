const Router = require("express");
const router = new Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAll);
router.post("/", ProductController.create);
router.get("/:id", ProductController.getOne);

module.exports = router;
