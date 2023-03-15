'use strict';

/**
 * importing dependencies
 */
let postManager = require('../manager/order'),
    url = require('url');

let addProduct = (req, res, next) => {
    let user = req.user;
    return postManager
        .addProduct(user,req, req.body)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}

let getProduct = (req, res, next) => {
    let user = req.user;
    let id = req.params.userId;
    return postManager
        .getProduct(user, id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}
let deleteProduct = (req, res, next) => {
    let user = req.user;
    let id = req.params.id
    return postManager
        .deleteProduct(user, id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}
let getAllSearchProduct = (req, res, next) => {
    postManager
        .getAllSearchProduct(req,res)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}

module.exports = {
    addProduct,
    deleteProduct,
    getProduct,
    getAllSearchProduct:getAllSearchProduct
}