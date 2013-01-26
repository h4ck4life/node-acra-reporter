/*global jQuery:false navigator:false user:true alert:false window:false */
jQuery(function() {
    "use strict";
    jQuery('#login').click(function(e){
        navigator.id.request();
        e.preventDefault();
    });
    jQuery('#logout').click(function(e){
        navigator.id.logout();
        e.preventDefault();
    });
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
                    window.location = window.location;
                }
            );
        },
        onlogout: function() {
            jQuery.post(
                '/persona/logout',
                {logout:1},
                function(msg) {
                    if (msg.status == "failure")
                    {
                        alert("Fail to logout in: " + msg.reason);
                        return;
                    }
                    window.location = "/";
                }
            );
        }
    });
});
