const ApiError = require('../error/ApiError');
const bcrypt = require("bcrypt");
const { Users,Basket } = require('../models/models');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/AuthMiddleware")
const generateJwt = (id, email, role) => {
    return jwt.sign({id , email, role},process.env.SECRET_KEY, {expiresIn:"24h"})
}

class UserController { 
    async registration(req,res,next) {
        const{ email, password,role} =req.body;
        if(!email || !password ) {
            console.log(email,password)
            return next(ApiError.badRequest("Некорректный email или password"))
        }

        const person = await Users.findOne({where:{email}})
        if (person) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await Users.create({email,role,password:hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.Id, user.email,user.role)
        return  res.json({token})

    }

    async login(req,res, next) {
        const{ email, password } = req.body;
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"))
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJwt(user.Id, user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email,req.user.role)
      return  res.json({token})
    }
}

module.exports = new UserController();