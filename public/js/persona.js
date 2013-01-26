/*global jQuery:false navigator:false user:true alert:false */
jQuery(function() {
    "use strict";
    jQuery('#login').click(function(e){ navigator.id.request(); });
    jQuery('#logout').click(function(e){ navigator.id.logout(); });
    navigator.id.watch({
        loggedInUser: user ? user.email : null,
        onlogin: function(assertion) {
            jQuery.post(
                '/persona/verify',
                {assertion:assertion},
                function(msg) {
                    if (msg.status == "failure")
                    {
                        alert("Fail to login in: " + msg.reason);
                        return;
                    }
                    user = assertion.email;
                }
            );
        },
        onlogout: function() {
            jQuery.post(
                '/persona/verify',
                {logout:1},
                function(msg) { console.log('logout success!'); }
            );
        }
    });
});
