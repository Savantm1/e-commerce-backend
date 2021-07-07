const { Sequelize } = require("sequelize");
const { Categories, Product } = require("../models/models");

class ProductCategoriesController {
  async getAll(req, res) {
    let categories = await Categories.findAll({
      raw: true,
      attributes: ["id", "category_name"],
    });

    for (let i = 0; i < categories.length; i++) {
      let count = await Product.count({
        raw: true,
        where: { categoryId: i + 1 },
      });
      categories[i].count = count;
    }

    res.json(categories);
  }
}

module.exports = new ProductCategoriesController();
