const Router = require("express");
const router = new Router();
const PicturesController = require("../controllers/PicturesController");

router.post("/", PicturesController.create);

module.exports = router;
