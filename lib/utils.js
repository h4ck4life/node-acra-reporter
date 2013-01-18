(function() {
    "use strict";
    exports.strObjectToData = function(data) {
        var ret = {};
        Object.keys(data).forEach(function(key) {
            var value = data[key].trim();
            if (key.match(/date/i)) {
                value = new Date(value);
            }
            else if (value.indexOf("\n") !== -1)
            {
                var arr = value.split("\n");
                if (arr[0] && arr[0].match(/^\w+=\S+/))
                {
                    value = {};
                    arr.forEach(function(row) {
                        var sp = row.split('=');
                        value[sp[0]] = sp.slice(1).join('=');
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
})();
