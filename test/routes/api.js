"use strict";
var request = require('supertest');
var route_api = require('../../lib/routes/api');

exports.index_requires_auth = function(test) {
    request(route_api)
        .get('/api/')
        .expect(401)
        .end(function(err, res) {
            if (err) return test.done(err);
            test.done();
        });
};
/*
exports.toplevel_no_requires_auth = function(test) {
    request(route_api)
        .get('/api/topLevel')
        .expect(200)
        .end(function(err, res) {
            if (err) return test.done(err);
            test.done();
        });
};
*/

exports.submit_acra_report = function(test) {
    test.done();
};
