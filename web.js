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
var express = require("express");

var config = {
    users: {},
    redis: url.parse(process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379/')
};
if (process.env.REPORTING_CREDENTIALS)
{
    process.env.REPORTING_CREDENTIALS.split(',').forEach(function(a) {
        var sp = a.split(':');
        config.users[sp[0]] = sp[1];
    });
}

// The function
var basicAuth = express.basicAuth(function(username, password) {
    if (!config.users[username]) return false;
    return config.users[username] === password;
}, 'Restrict area, please identify');

var app = express();
app.configure(function() {
    app.engine('ejs', require('ejs-locals'));
    app.set('view engine', 'ejs');
    app.set('view options', { 'layout':'layout.ejs'} );
    app.use(express.logger());
    app.use(express['static'](__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ 
        secret: process.env.SESSION_SECRET || 'DemtAimfild9' 
    }));
    // http://www.senchalabs.org/connect/favicon.html
    app.use(express.favicon());
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
var routes = {
    api: require('./routes/api')
};
app.get('/api/', basicAuth, routes.api.index);
app.post('/api/submit_acra_report', basicAuth, routes.api.submit_acra_report);
