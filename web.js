"use strict";

/* Nodefly has to be the first item loaded */
if (process.env.NODEFLY_KEY)
{
    require('nodefly').profile(
            process.env.NODEFLY_KEY,
            ['acra-reporting']
    );
}
var express = require('express');
var util    = require('util');
var url     = require("url");
var fs      = require('fs');
var models = require('./lib/models');
var mongoose = require('mongoose');

/* Config */

var config = {
    users: {},
    mongodb: process.env.MONGO_URL || 'mongodb://localhost/node-acra-reporting'
};

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
    startExpress();
});
mongoose.connect(config.mongodb);

var routes = {};
fs.readdir(__dirname + '/routes/', function(err, files) {
    files.forEach(function(file) {
        if (file.substr(-3) === '.js') {
            console.log("Now loading route file: ", file.trim());
            var basename = file.substr(0,file.length-3);
            routes[basename] = require('./routes/'+basename);
        }
    });
});

/* Callback after everything else is connected  to start express */
var startExpress = function(db) {

    var app = express();
    models.Application.find().exec(function(err, apps) {
        apps.forEach(function(app) {
            app.api_credentials.forEach(function(cred) {
                console.log("Adding credential: " + cred.username);
                config.users[cred.username] = cred.passport;
            });
        });
    });

    /* Basic Auth Function */
    app.basicAuth = express.basicAuth(function(username, password) {
        if (!config.users[username]) return false;
        return config.users[username] === password;
    }, 'Restrict area, please identify');

    app.configure(function() {
        app.engine('ejs', require('ejs-locals'));
        app.use(express.logger());
        app.use(express['static'](__dirname + '/public'));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({ 
            secret: process.env.SESSION_SECRET || 'DemtAimfild9' 
        }));
        // http://www.senchalabs.org/connect/favicon.html
        app.use(express.favicon());
        app.use(function(req,res,next) {
            res.locals.user = null;
            next();
        });
        app.use(app.router);

    });

    app.configure('development', function(){
        app.use(express.errorHandler());
    });

    // listen to the PORT given to us in the environment
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });

    app.locals.title = "ACRA Reporter";

    // http://stackoverflow.com/questions/9213707/express-resources-with-authentication-middleware
    Object.keys(routes).forEach(function(r) {
        routes[r].setupRoutes(app);
    });

};
