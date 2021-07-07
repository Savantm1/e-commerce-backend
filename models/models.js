const sequelize = require('../db');
const {DataTypes} = require('sequelize'); //импорт класса для описания типов поля


const Feedback = sequelize.define('feedback',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    personName: { type: DataTypes.STRING},
    feedbackText: { type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING}
})

const Categories = sequelize.define('categories',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category_name: {type: DataTypes.STRING},
    
})

const Product = sequelize.define('product',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productName: { type: DataTypes.STRING, unique:true},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.INTEGER},
    currency: {type: DataTypes.STRING},
    subtitle: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    subhead: {type: DataTypes.STRING},
    bestSelling: {type: DataTypes.BOOLEAN},
    bestFromFarmers: {type: DataTypes.BOOLEAN},
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id'
        }
    }
})

const BlogItem = sequelize.define('blog_item',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: { type: DataTypes.STRING, unique:true},
    text: {type: DataTypes.STRING},
    images: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    avatar: {type: DataTypes.STRING},
    tag: {type: DataTypes.STRING},
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id'
        }
    }
})


const Comments = sequelize.define('comments',{
    id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement:true },
    name: { type: DataTypes.STRING},
    role:{type: DataTypes.BOOLEAN},
    avatar: {type: DataTypes.STRING},
    message: { type: DataTypes.STRING},
    email: { type: DataTypes.STRING}
})

const Pictures = sequelize.define('pictures',{
    id: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true},
    image_name: {type: DataTypes.STRING},
})

const Users = sequelize.define('users',{
    id:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue:"user"}
})

const Basket = sequelize.define('basket',{
    id:{type: DataTypes.INTEGER,primaryKey:true, autoIncrement:true}
})

const BasketDevice = sequelize.define('basket_device',{
    id:{type: DataTypes.INTEGER,primaryKey:true, autoIncrement:true}
})


Categories.hasMany(Product);
Product.belongsTo(Categories);
Product.hasMany(Pictures);
BlogItem.hasMany(Comments);
Comments.belongsTo(BlogItem);
BlogItem.belongsTo(Categories);
Users.hasOne(Basket);
Basket.belongsTo(Users);
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket)

module.exports = {
    Feedback,
    Product,
    Categories,
    BlogItem,
    Comments,
    Pictures,
    Basket,
    BasketDevice,
    Users
};