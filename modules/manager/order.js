
const { concat } = require("lodash");

'use strict';

let _ = require('lodash'),
    postModel = require("../models/order"),
    config = process.config.global_config,
    express = require('express');
    PATH = require("path"),
	FS = require("fs"),
	EJS = require("ejs"),
    ObjectId = require('mongoose').Types.ObjectId;
    const multer = require('multer');
    BadRequestError = require('../error/badRequesrError');



let addProduct = async(user, req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    let filename = "";
    try {
        filename = req.body.employee_image;

    } catch (error) {}
    let createdData = {
        email: body.email,
        phone: body.phone,
        address: body.address,
        userId:body.userId,
        totalPrice:body.totalPrice,
    };
   

    let categorty = await postModel(createdData).save();
    return categorty
}
let getProduct = async(user, id) => {
    if (!id) {
        throw new BadRequestError("id missing");
    }
    return await postModel.find()
}
let deleteProduct = async(user, id) => {
    return await postModel.deleteOne({ _id: ObjectId(id) }).select().lean().exec();
}
let getAllSearchProduct = async( req) => {
  let body = req.body.body ? JSON.parse(req.body.body) : req.body;
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let page = req.query.page || 1;
  let sort = body ? body : { created_at: -1 };
  let skip = (page - 1) * limit;
  let filters = req.query.searchText;
  let findData = {};
  let _result = { data: [], total_record_count: 0 };
  if (filters) {
    findData["category"] = { $regex: new RegExp(filters, "ig") };
  }
  return postModel
    .find(findData)
    .select()
    .collation({ locale: "en" })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
    .then(searchData => {
      _result["data"] = searchData;
      return postModel.countDocuments(findData);
    })
    .then((count) => {
      _result["total_record_count"] = count;
      return _result;
    });
  
}
module.exports = {
    addProduct,
    deleteProduct,
    getProduct,
    getAllSearchProduct
}