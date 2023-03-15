'use strict';

let config = process.config.global_config;
let express = require('express');


module.exports = app => {
    //app.use("/uploads", express.static(__dirname + "/uploads"));
    app.use('/api/seller', require('./modules/routes/seller'));
    app.use('/api/user', require('./modules/routes/user'));
    app.use('/api/product', require('./modules/routes/product'));
    app.use('/api/product', require('./modules/routes/addToCart'));
    app.use('/api/product', require('./modules/routes/order'));

};