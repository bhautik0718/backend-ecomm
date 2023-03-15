'use strict';

let mongoose = require("../helpers/setup_information_mongodb");
let Schema = mongoose.Schema;

let schemaDefinition = new Schema({
	email: {type: String},
	address: {type: String},	
	phone: {type: Number},	
	totalPrice:{type: Number},
	userId:{type: String},
    created_at : {type: Date,default: () => Date.now()},
    updated_at : {type: Date,default: () => Date.now()}
},{ versionKey: false,collection: 'order' });

let exportModel = mongoose.model("order", schemaDefinition);

module.exports = exportModel;