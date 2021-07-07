const { BlogItem, Categories,Comments } = require ("../models/models");

class BlogItemController  {

    async getItem (req,res) {
        const blog_id = req.params["id"];
        let blog = await BlogItem.findOne({
            where: {id : blog_id},
            include: [{model: Comments}]
        });
        res.json(blog);
    }

    async getAll(req, res) { 
        let { categoryId, blogId, limit, page} = req.query;
        console.log(req.query);
        page = page || 1;
        limit = limit || 9;  
        let offset = page * limit - limit;
        let blogs;

        if(!categoryId && !blogId) {
            blogs = await BlogItem.findAll({
                include: [{model: Categories}],
                limit,offset});
        }
        
        if(categoryId) {
            blogs = await BlogItem.findAll({
                where:{categoryId:categoryId},
                include: [{model: Categories}],
                limit,
                offset});
        }
     
        res.json(blogs);
    }

}

module.exports = new BlogItemController();