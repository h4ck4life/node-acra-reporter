(function() {
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

    var mongo = require('mongodb');
    var states = require('../lib/states');
    var myutils = require('../lib/utils');

    exports.index = function(req,res) {
        res.send("Nothing here");
    };
    exports.submit_acra_report = function(req, res) {
        var report = myutils.strObjectToData(req.body);
        report.report_time = new Date();
        report.state = states.STATE_NEW;

        req.mongo.collection('reports').insert(report, {w:1}, function(err, result) {
            if (err) {
                console.error("Error inserting into mongo:", err, result);
                res.send("FAIL",500);
                return;
            }
            res.send("OK");
        });
    };
})();
