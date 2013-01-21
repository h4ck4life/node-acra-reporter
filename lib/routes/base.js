"use strict";
var mongoose = require('mongoose');
var models = require('../models');
var express = require('express');
var app = module.exports = express();

var index = function(req,res) {
    res.render('base/index.ejs');
};

var reports = function(req,res) {
    models.Report.find({}, function(err, reports) {
        res.render('base/reports.ejs', {
            reports: reports
        });
    });
};


app.get('/', index);
app.get('/reports', reports);
