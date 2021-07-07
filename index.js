require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const PORT = process.env.PORT || 5000;
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname,'static')));
app.use('/api',router);

app.use(errorHandler);

const start = async () => {
    try {
       await sequelize.authenticate(); // установка соединения с БД
       await sequelize.sync(); // данная ф-ция сверяет бд со схемой данных
       app.listen(PORT, ()=> console.log('server started at PORT:', PORT));
        
    } catch (e) { 
        console.log(e);
    }
}
  
start();