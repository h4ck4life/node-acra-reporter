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
var async = require('async');
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

var fields = {
    "Android Version":"doc.ANDROID_VERSION",
    "Application Version": "doc.PACKAGE_NAME + ' - ' + doc.APP_VERSION_CODE + '(' + doc.APP_VERSION_NAME + ')'"
};

var topLevel = function(req,res) {
    var results = {};
    var cb = function(item, callback) {
        var $keyf = "function(doc) { var daydate = doc.report_time; ";
        $keyf += "daydate.setHours(0); daydate.setMinutes(0); daydate.setSeconds(0); daydate.setMilliseconds(0);"; 
        $keyf += "return { "; 
        $keyf += "value: " + fields[item] + ",";
        $keyf += "date: daydate.getTime()";
        /* produces GMT date */
        //$keyf += "date: Math.floor(doc.report_time.getTime() / 1000) - Math.floor((doc.report_time.getTime() / 1000) % 86400)";
        $keyf += "}}";
        console.log($keyf);

        mongoose.connection.db.executeDbCommand({
            group: {
                ns: 'reports',
                //key: fields[item],
                $keyf: $keyf,
                $reduce: "function ( curr, result ) {"+
                "    result['count']++;" +
                "}",
                initial: { "count": 0 }
            }
        }, function(err, result) {
            result = result.documents[0];
            if (result.errmsg) {
                return callback(result.errmsg);
            }
            results[item] = result;
            callback();
        });
    };
    async.forEach(Object.keys(fields), cb, function(err) {
        if (err) {
            res.send(JSON.stringify({'err':err}), 500);
            return;
        }
        res.send(JSON.stringify(results));
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

app.get('/api/info', function(req,res) {
    res.header('Content-Type',"application/json");
    res.send(JSON.stringify({
        env: process.env,
        config: process.config,
        arch: process.arch,
        platform: process.platform,
        version:process.versions
    }));
});
app.get('/api/', basicAuth, index);
app.get('/api/topLevel', topLevel);
app.post('/api/submit_acra_report', basicAuth, submit_acra_report);
