exports.index = function(req,res) {
    res.send("Nothing here");
};
exports.submit_acra_report = function(req, res) {
    console.log("Body is:", req.body);
    res.send("OK");
};
