const { Product, Pictures, Categories } = require("./../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ProductController {
  //получение определенного продукта
  async getOne(req, res) {
    const product_id = req.params["id"];
    const product = await Product.findOne({
      where: { id: product_id },
      include: [{ model: Pictures }, { model: Categories }],
    });
    res.json({ product });
  }

  async getAll(req, res) {
    let { categoryId, bestSelling, bestFromFarmers, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let data = {};
    // получение всех продуктов
    if (!categoryId && bestFromFarmers == "false" && bestSelling == "false") {
      let products = await Product.findAll({
        include: [{ model: Pictures }, { model: Categories }],
        limit,
        offset,
      });
      let count = await Product.count({
        raw: true,
      });
      data.count = count;
      data.categoryId = products[0].categoryId;
      data.products = products;
    }
    // получение всех продуктов подкатегорий bestSelling and bestFromFarmers
    else if (
      !categoryId &&
      bestFromFarmers == "true" &&
      bestSelling == "true"
    ) {
      let products = await Product.findAll({
        include: [{ model: Pictures }, { model: Categories }],
        where: {
          [Op.or]: [{ bestSelling: true }, { bestFromFarmers: true }],
        },
        limit,
        offset,
      });
      let count = await Product.count({
        raw: true,
        where: {
          [Op.or]: [{ bestSelling: true }, { bestFromFarmers: true }],
        },
      });
      data.count = count;
      data.categoryId = products[0].categoryId;
      data.products = products;
    }
    // получение всех продуктов определенной категории
    else if (
      categoryId &&
      bestSelling == "false" &&
      bestFromFarmers == "false"
    ) {
      console.log(categoryId, bestSelling, bestFromFarmers, limit, page);
      let products = await Product.findAll({
        where: { categoryId: categoryId },
        include: [{ model: Pictures }, { model: Categories }],
        limit,
        offset,
      });
      console.log("products", products);

      let count = await Product.count({
        raw: true,
        where: { categoryId: categoryId },
      });

      data.count = count;

      data.categoryName = products[0].category.category_name;
      data.categoryId = products[0].categoryId;
      data.products = products;
      console.log(data);
    }
    // получение всех продуктов определенной категории подкатегории bestSelling
    else if (
      categoryId &&
      bestSelling == "true" &&
      bestFromFarmers == "false"
    ) {
      let products = await Product.findAll({
        where: {
          [Op.and]: [{ bestSelling: true }, { categoryId: categoryId }],
        },
        include: [{ model: Pictures }, { model: Categories }],
        limit,
        offset,
      });

      let count = await Product.count({
        raw: true,
        where: {
          [Op.and]: [{ bestSelling: true }, { categoryId: categoryId }],
        },
      });
      data.count = count;
      data.categoryName = products[0].category.category_name;
      data.categoryId = products[0].categoryId;
      data.products = products;
    }
    // получение всех продуктов определенной категории подкатегории bestFromFarmers
    else if (
      categoryId &&
      bestFromFarmers == "true" &&
      bestSelling == "false"
    ) {
      let products = await Product.findAll({
        where: {
          [Op.and]: [{ bestFromFarmers: true }, { categoryId: categoryId }],
        },
        include: [{ model: Pictures }, { model: Categories }],
        limit,
        offset,
      });

      let count = await Product.count({
        raw: true,
        where: {
          [Op.and]: [{ bestFromFarmers: true }, { categoryId: categoryId }],
        },
      });
      data.count = count;
      data.categoryName = products[0].category.category_name;
      data.categoryId = products[0].categoryId;
      data.products = products;
    }
    // получение всех продуктов определенной категории подкатегорий bestSelling и bestFromFarmers
    else if (categoryId && bestSelling == "true" && bestFromFarmers == "true") {
      let products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ bestFromFarmers: true }, { categoryId: categoryId }],
            },
            { [Op.and]: [{ bestSelling: true }, { categoryId: categoryId }] },
          ],
        },
        include: [{ model: Pictures }, { model: Categories }],
        limit,
        offset,
      });

      let count = await Product.count({
        raw: true,
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ bestFromFarmers: true }, { categoryId: categoryId }],
            },
            { [Op.and]: [{ bestSelling: true }, { categoryId: categoryId }] },
          ],
        },
      });
      data.count = count;
      data.products = products;
      data.categoryId = products[0].category.categoryId;
    }

    res.json(data);
  }

  async create(req, res, next) {
    try {
      const { id, productName, rating, price, currency, categoryId } = req.body;
      const product = await Product.create({
        id,
        productName,
        rating,
        price,
        currency,
        categoryId,
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
