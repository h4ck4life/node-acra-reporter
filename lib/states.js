"use strict";

exports.STATE_NEW = 0;
exports.STATE_FIXED = 1;
exports.STATE_INVALID = 2;
exports.stateName = function(state) {
    switch (state) 
    {
        case exports.STATE_NEW:
            return "new";
        case exports.STATE_FIXED:
            return "fixed";
        case exports.STATE_FIXED:
            return "fixed";
        default:
            return "--unknown-- ("+state +")";
    }
};
