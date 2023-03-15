
const upload  = require('../helpers/uploadfile')
const { concat } = require("lodash");

'use strict';

let _ = require('lodash'),
    postModel = require("../models/product"),
    config = process.config.global_config,
    express = require('express');
    PATH = require("path"),
	FS = require("fs"),
	EJS = require("ejs"),
    ObjectId = require('mongoose').Types.ObjectId;
    const multer = require('multer');
    BadRequestError = require('../error/badRequesrError');



let addProduct = async(user, req) => {
    let body =  JSON.parse(req.body.body) ;

    let filename = "";
    try {
        filename = req.file.filename;
    } catch (error) {}
    let createdData = {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
        employee_image:filename,
    };
   
    createdData.employee_image = config.upload_folder + config.upload_entities.collection_folder + createdData.employee_image;

    let categorty = await postModel(createdData).save();
    // console.log(categorty);
    return categorty
}
let updateProduct= async(req,id) => {
  let body =  JSON.parse(req.body.body) ;

  let requiredData = [
    "name",
    "category",
    "price",
    "description",
  ];
  for (let key in requiredData) {
    if (!body[requiredData[key]]) {
      throw new BadRequestError(requiredData[key] + " is missing");
    }
  }
  let updateData = {
    name: body.name,
    category: body.category,
    price: body.price,
    description: body.description,
  };
 
  if (req.file && req.file.path) {
    updateData["employee_image"] = req.file.path;
  }
  return await postModel.updateOne(
    { _id: ObjectId(id) },
    { $set: updateData }
  )
    .exec()
    .then((updateResult) => {
      return updateResult;
    });
}
let getAllproduct = async(id, req,res) => {
  // console.log("req.query.searchText ", req.body)
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
  
  // return  await postModel.find()
}
let getProduct = async(user, id) => {
    if (!id) {
        throw new BadRequestError("id missing");
    }
    return postModel.findOne({ _id: ObjectId(id) })
}
let deleteProduct = async(user, id) => {
    return postModel.deleteOne({ _id: ObjectId(id) }).select().lean().exec();
}
let getAllSearchProduct = async( req) => {
  // console.log("req.query.searchText ", req.body)
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
  
  // return  await postModel.find()
}
module.exports = {
    addProduct,
    getAllproduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getAllSearchProduct
}