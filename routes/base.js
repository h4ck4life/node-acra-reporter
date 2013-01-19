"use strict";

var index = function(req,res) {
    res.render('base/index.ejs');
};

exports.setupRoutes = function(app) {
    app.get('/', index);
};
