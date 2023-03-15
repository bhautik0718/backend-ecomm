const upload  = require('../helpers/uploadfile')
'use strict';

/**
 * importing dependencies
 */
let postManager = require('../manager/seller'),
    url = require('url');

    let signIn  = (req, res, next) => {
        return postManager
            .signIn(req.body)
            .then((data) => {
    
                let result = {
                    status: 200,
                    data: data,
                };
                return res.json(result);
            })
            .catch(next);
    };

let addLogin = (req, res,next) => {
    // let user = req.user;
    postManager
        .addLoginUser(req,req.body,res)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}




module.exports = {
   
    signIn,
    addLogin
}