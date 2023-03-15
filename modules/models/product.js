'use strict';

let mongoose = require("../helpers/setup_information_mongodb");
let Schema = mongoose.Schema;

let schemaDefinition = new Schema({
	name: {type: String},
	category: {type: String},	
	price: {type: Number},	
	description: {type: String},	
	employee_image: {type: String},	
    created_at : {type: Date,default: () => Date.now()},
    updated_at : {type: Date,default: () => Date.now()}
},{ versionKey: false,collection: 'product' });

let exportModel = mongoose.model("product", schemaDefinition);

module.exports = exportModel;