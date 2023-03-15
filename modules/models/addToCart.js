'use strict';

let mongoose = require("../helpers/setup_information_mongodb");
let Schema = mongoose.Schema;

let schemaDefinition = new Schema({
	name: {type: String},
	category: {type: String},	
	price: {type: Number},	
	description: {type: String},	
	cart_image: {type: String},	
	quantity: {type: Number},
	productId:{type: String},
	userId:{type: String},
    created_at : {type: Date,default: () => Date.now()},
    updated_at : {type: Date,default: () => Date.now()}
},{ versionKey: false,collection: 'addToCart' });

let exportModel = mongoose.model("addToCart", schemaDefinition);

module.exports = exportModel;