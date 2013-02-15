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
exports.Application = mongoose.model('Application',Application);

var CronSettings = new Schema({
    "lastrun": Date,
    "started_run":Date
});
exports.CronSettings = mongoose.model('CronSettings',CronSettings);

var Report = new Schema({
    "report_time": Date
},{strict:false}); // TODO - capped?
exports.Report = mongoose.model('Report',Report);


