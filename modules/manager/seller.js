
const upload  = require('../helpers/uploadfile')
const { concat } = require("lodash");

'use strict';

let _ = require('lodash'),
    postModel = require("../models/seller"),
    config = process.config.global_config,
 
    PATH = require("path"),
	FS = require("fs"),
	EJS = require("ejs"),
    ObjectId = require('mongoose').Types.ObjectId;
    const multer = require('multer')
    BadRequestError = require('../error/badRequesrError');


let signIn = async( body) => {
        [
            "email",
            "password",
        ].forEach((x) => {
            if (!body[x]) {
                console.log(x)
                throw new BadRequestError(x + " is required");
            }
        });
        let userEmailExit = await postModel.findOne({
            where: { email: body.email.trim(), userVerified: "Yes" }
        });
    
        if (userEmailExit) {
            throw new BadRequestError("Email already exists");
        }
        let createData = {
            email: body.email.trim(),
            password: md5(body.password.trim()),
        };
        return await postModel.create(createData);
    }


    let addLoginUser =async (req,body,res)=>{

        return await postModel.findOne({email:req.body.email.trim(), password: md5(req.body.password.trim())}).then(user =>{
    
          if (!user) {
            throw new BadRequestError("User is required");
         
          }
          return user
    
        })
    }    





module.exports = {
    signIn,
    addLoginUser
}