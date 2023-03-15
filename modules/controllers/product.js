const upload  = require('../helpers/uploadfile')
'use strict';

/**
 * importing dependencies
 */
let postManager = require('../manager/product'),
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
let updateProduct = (req, res, next) => {
    let user = req.user;
    let id = req.params.id

    return postManager
        .updateProduct( req,id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}
let getAllproduct = (req, res, next) => {
    let user = req.user;
    return postManager
        .getAllproduct(user,req,res)
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
    let id = req.params.id;
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
    console.log(id);
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
    // console.log(req.body.body,"hI")
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
    getAllproduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getAllSearchProduct:getAllSearchProduct
}