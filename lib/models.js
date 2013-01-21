"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Application = new Schema({
    "name": String,
    "package": String,
    "api_credentials": [
        { "username": String, "password": String }
    ]
});
var Report = new Schema({
},{strict:false}); // TODO - capped?

exports.mongoose = mongoose;
exports.Application = mongoose.model('Application',Application);
exports.Report = mongoose.model('Report',Report);
