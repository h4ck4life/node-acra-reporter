"use strict";

var mongoose = require('mongoose');
var models = require('../../models');
var path = require('path');

var express = require('express');
var app = module.exports = express();
app.set('views', __dirname + path.sep + 'views');

var index = function(req,res) {
    res.render('index.ejs');
};

var reports = function(req,res) {
    models.Report.find({}, function(err, reports) {
        res.render('reports.ejs', {
            reports: reports
        });
    });
};


app.get('/', index);
app.get('/reports', reports);
