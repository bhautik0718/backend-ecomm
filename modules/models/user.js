'use strict';

let mongoose = require("../helpers/setup_information_mongodb");
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let schemaDefinition = new Schema({
	email: {type: String,required: true,unique: true},
	password: {type: String, required: true},	
    created_at : {type: Date,default: () => Date.now()},
    updated_at : {type: Date,default: () => Date.now()}
},{ versionKey: false,collection: 'user' });
schemaDefinition.plugin(uniqueValidator)

let exportModel = mongoose.model("user", schemaDefinition);

module.exports = exportModel;