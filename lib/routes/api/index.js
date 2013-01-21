"use strict";
var hashFields = {
    'SETTINGS_SECURE':1, // contains sub hash too
    'SETTINGS_SYSTEM':1,
    'CRASH_CONFIGURATION':1,
    'BUILD':1,
    'DISPLAY':1,
    'INITIAL_CONFIGURATION':1,
    'ENVIRONMENT':1
};

var express = require('express');
var mongoose = require('mongoose');
var states = require('../../states');
var myutils = require('../../utils');
var models = require('../../models');

var app = module.exports = express();

var index = function(req,res) {
    res.send("Nothing here");
};
var submit_acra_report = function(req, res) {
    var report = myutils.strObjectToData(req.body);
    report.report_time = new Date();
    report.state = states.STATE_NEW;

    mongoose.connection.collection('reports').insert(report, {w:1}, function(err, result) {
        if (err) {
            console.error("Error inserting into mongo:", err, result);
            res.send("FAIL",500);
            return;
        }
        res.send("OK");
    });
};

var config = { users: {} };
mongoose.connection.once('open', function callback () {
    models.Application.find().exec(function(err, apps) {
        apps.forEach(function(app) {
            app.api_credentials.forEach(function(cred) {
                console.log("Adding credential: " + cred.username);
                config.users[cred.username] = cred.passport;
            });
        });
    });
});

/* Basic Auth Function */
var basicAuth = express.basicAuth(function(username, password) {
    if (!config.users[username]) return false;
    return config.users[username] === password;
}, 'Restrict area, please identify');

app.get('/api/', basicAuth, index);
app.post('/api/submit_acra_report', basicAuth, submit_acra_report);
