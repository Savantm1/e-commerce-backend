const Router = require("express");
const router = new Router();
const FeedbackRouter = require('./FeedbackRouter');
const CommentsRouter = require('./CommentsRouter');
const ProductRouter = require('./ProductRouter');
const CategoriesRouter = require('./CategoriesRouter');
const BlogItemRouter = require('./BlogRouter');
const PicturesRouter = require ('./PicturesRouter');
const UserRouter = require('./UserRouter');

router.use('/comments', CommentsRouter);
router.use('/categories', CategoriesRouter);
router.use('/products', ProductRouter);
router.use('/blog',BlogItemRouter);
router.use('/feedback',FeedbackRouter);
router.use('/pictures', PicturesRouter);
router.use('/user',UserRouter);
module.exports = router;


