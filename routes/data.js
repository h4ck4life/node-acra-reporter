"use strict";
var async = require('async');
var _ = require('underscore');

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

