const ApiError = require('./../error/ApiError');
const {Comments} = require('../models/models');
class CommentsController {

    async getAll(req,res) {
        const allComments = await Comments.findAll();
        res.json({
            allComments
        })
    }

    async create(req,res,next) {
        const {name,role,message,blogItemId,email} = req.body;
        const comment = await Comments.create({name,role,message,blogItemId,email});
        if(!comment) {
            console.log('bad')
            return next(ApiError.badRequest('Не задан параметр'))
        }
        return res.json("ok")
    }
}

module.exports = new CommentsController();