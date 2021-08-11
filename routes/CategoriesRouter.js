const Router = require("express");
const router = new Router();
const CategoriesController = require("../controllers/CategoriesController");

router.get("/", CategoriesController.getAll);

module.exports = router;
