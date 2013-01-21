"use strict";
var mongoose = require('mongoose');
var models = require('../lib/models');

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

exports.setupRoutes = function(app) {
    app.get('/', index);
    app.get('/reports', reports);
};
