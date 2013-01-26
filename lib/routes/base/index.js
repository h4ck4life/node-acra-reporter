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
app.get('/', index);

var login = function(req,res) {
    res.render('login.ejs');
};
app.get('/login', login);

var reports = function(req,res) {
    models.Report.find({}, function(err, reports) {
        res.render('reports.ejs', {
            reports: reports
        });
    });
};
app.get('/reports', reports);

var showStackTrace = function(req,res) {
    models.Report.findOne({_id: mongoose.Types.ObjectId(req.params.id) }, function(err, report) {
        res.render('show_stack_trace.ejs', {
            report: report
        });
    });
};
app.get('/api/report/show_stack_trace/:id', showStackTrace);

