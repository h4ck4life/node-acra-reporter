"use strict";

exports.strObjectToData = function(data) {
    var ret = {};
    Object.keys(data).forEach(function(key) {
        var value = data[key];
        if (key.match(/date/i)) {
            value = new Date(value.trim());
        }
        else if (value.indexOf("\n") !== -1)
        {
            var arr = value.trim().split("\n");
            if (arr[0] && arr[0].match(/^\S+=\S+/))
            {
                value = {};
                arr.forEach(function(row) {
                    var sp = row.split('=');
                    var key = sp[0].replace('.','_');
                    value[key] = sp.slice(1).join('=');
                });
            }
            else 
            {
                value = arr;
            }
        }
        ret[key] = value;
    });
    return ret;
};
