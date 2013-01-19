(function() {
    "use strict";
    var myutils = require('../lib/utils');

    exports.strObjectToData = function(test) {
        test.expect(1);

        var results = require('./utils.strObjectResults.json');
        var body = {
            "other": "fake.step=1\n",
            "DEVICE_FEATURES": "android.hardware.wifi\nandroid.hardware.location.network\nandroid.hardware.nfc\ncom.google.android.feature.GOOGLE_BUILD\nandroid.hardware.location\nandroid.hardware.sensor.gyroscope\nandroid.hardware.screen.landscape\nandroid.hardware.screen.portrait\nandroid.hardware.wifi.direct\nandroid.hardware.usb.accessory\nandroid.hardware.camera.any\nandroid.hardware.bluetooth\nandroid.hardware.touchscreen.multitouch.distinct\nandroid.hardware.microphone\nandroid.hardware.sensor.light\nandroid.hardware.camera.autofocus\nandroid.software.live_wallpaper\nandroid.hardware.camera.flash\nandroid.hardware.telephony\nandroid.software.sip\nandroid.hardware.touchscreen.multitouch.jazzhand\nandroid.hardware.sensor.barometer\nandroid.hardware.usb.host\nandroid.hardware.touchscreen.multitouch\nandroid.hardware.sensor.compass\nandroid.hardware.faketouch\nandroid.hardware.audio.low_latency\nandroid.hardware.camera\nandroid.software.sip.voip\nandroid.hardware.sensor.proximity\nandroid.hardware.location.gps\nandroid.hardware.telephony.gsm\nandroid.hardware.camera.front\nandroid.hardware.sensor.accelerometer\ncom.nxp.mifare\nandroid.hardware.touchscreen\nglEsVersion = 2.0\n",
            "SETTINGS_SECURE": "ACCESSIBILITY_DISPLAY_MAGNIFICATION_AUTO_UPDATE=1\nACCESSIBILITY_DISPLAY_MAGNIFICATION_ENABLED=0\nACCESSIBILITY_DISPLAY_MAGNIFICATION_SCALE=2.0\nACCESSIBILITY_SCREEN_READER_URL=https:\/\/ssl.gstatic.com\/accessibility\/javascript\/android\/AndroidVox_v1.js\nACCESSIBILITY_SCRIPT_INJECTION=0\nACCESSIBILITY_SPEAK_PASSWORD=0\nACCESSIBILITY_WEB_CONTENT_KEY_BINDINGS=0x13=0x01000100; 0x14=0x01010100; 0x15=0x02000001; 0x16=0x02010001; 0x200000013=0x02000601; 0x200000014=0x02010601; 0x200000015=0x03020101; 0x200000016=0x03010201; 0x200000023=0x02000301; 0x200000024=0x02010301; 0x200000037=0x03070201; 0x200000038=0x03000701:0x03010701:0x03020701;\nALLOWED_GEOLOCATION_ORIGINS=http:\/\/www.google.co.uk http:\/\/www.google.com\nALLOW_MOCK_LOCATION=0\nANDROID_ID=d7d117294bb12b51\nBACKUP_ENABLED=1\nBACKUP_TRANSPORT=com.google.android.backup\/.BackupTransportService\nBUGREPORT_IN_POWER_MENU=0\nDEFAULT_INPUT_METHOD=com.touchtype.swiftkey\/com.touchtype.KeyboardService\nENABLED_INPUT_METHODS=com.touchtype.swiftkey\/com.touchtype.KeyboardService:com.google.android.inputmethod.latin\/com.android.inputmethod.latin.LatinIME:com.google.android.googlequicksearchbox\/com.google.android.voicesearch.ime.VoiceInputMethodService:org.pocketworkstation.pckeyboard\/.LatinIME\nINPUT_METHODS_SUBTYPE_HISTORY=com.google.android.inputmethod.latin\/com.android.inputmethod.latin.LatinIME;-921088104:com.touchtype.swiftkey\/com.touchtype.KeyboardService;-921088104:org.pocketworkstation.pckeyboard\/.LatinIME;-1\nLAST_SETUP_SHOWN=eclair_1\nLOCATION_PROVIDERS_ALLOWED=gps,network\nLOCK_PATTERN_ENABLED=1\nLOCK_PATTERN_VISIBLE=1\nLOCK_SCREEN_APPWIDGET_IDS=13,12\nLOCK_SCREEN_LOCK_AFTER_TIMEOUT=60000\nLOCK_SCREEN_OWNER_INFO=phone@halkeye.net\nLONG_PRESS_TIMEOUT=500\nMOUNT_PLAY_NOTIFICATION_SND=1\nMOUNT_UMS_AUTOSTART=0\nMOUNT_UMS_NOTIFY_ENABLED=1\nMOUNT_UMS_PROMPT=1\nSCREENSAVER_ACTIVATE_ON_DOCK=0\nSCREENSAVER_ACTIVATE_ON_SLEEP=1\nSCREENSAVER_COMPONENTS=com.google.android.deskclock\/com.android.deskclock.Screensaver\nSCREENSAVER_DEFAULT_COMPONENT=com.google.android.deskclock\/com.android.deskclock.Screensaver\nSCREENSAVER_ENABLED=1\nSELECTED_INPUT_METHOD_SUBTYPE=-1\nSELECTED_SPELL_CHECKER=com.google.android.inputmethod.latin\/com.android.inputmethod.latin.spellcheck.AndroidSpellCheckerService\nSELECTED_SPELL_CHECKER_SUBTYPE=0\nTOUCH_EXPLORATION_ENABLED=0\nUSER_SETUP_COMPLETE=1\nVOICE_RECOGNITION_SERVICE=com.google.android.googlequicksearchbox\/com.google.android.voicesearch.serviceapi.GoogleRecognitionService\n",
        };

        test.deepEqual(
            myutils.strObjectToData(body),
            results
        );
        test.done();
    };
})();
