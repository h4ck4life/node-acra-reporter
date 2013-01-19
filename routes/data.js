"use strict";
var async = require('async');

var fields = {
    "Android Version":{"ANDROID_VERSION":1},
    "Application":{"PACKAGE_NAME":1},
    "Application Version": {"PACKAGE_NAME":1,"APP_VERSION_CODE":1,"APP_VERSION_NAME":1}
};
var topLevel = function(req,res) {
    var results = {};
    var cb = function(item, callback) {
        var $keyf = "function(doc) { var daydate = doc.report_time; ";
        $keyf += "daydate.setHours(0); daydate.setMinutes(0); daydate.setSeconds(0); daydate.setMilliseconds(0);"; 
        $keyf += "return { "; 
        Object.keys(fields[item]).forEach(function(item) {
            $keyf += item + ": doc." + item + ",";
        });
        $keyf += "date: Math.floor(daydate.getTime())";
        /* produces GMT date */
        //$keyf += "date: Math.floor(doc.report_time.getTime() / 1000) - Math.floor((doc.report_time.getTime() / 1000) % 86400)";
        $keyf += "}}";

        req.mongo.executeDbCommand({
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

exports.setupRoutes = function(app) {
    app.get('/data/topLevel', topLevel);
};

