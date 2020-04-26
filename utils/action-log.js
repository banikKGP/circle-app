(function () {
    "use strict";
    var Logger = function () { },
        winstonLogger,
        winston = require("winston"),
        fs = require("fs"),
        customLevels = {},
        logDir = "../logs/home-automation-action-logs";

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    customLevels.levels = {
        info: 0,
    };

    customLevels.colors = {
        info: "green",
    };

    winston.addColors(customLevels.colors);

    winstonLogger = winston.createLogger({
        transports: [

            new (winston.transports.Console)({
                colorize: true,
                level: "info",
                prettyPrint: true
            }),

            new (require("winston-daily-rotate-file"))({
                filename: logDir + "/HA-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                prepend: true,
                maxSize: "20m",
                level: "info"
            })
        ],
        levels: customLevels.levels
    });

    /**
     *
     * @param obj logging object
     * @return {*}
     */
    Logger.info = function (obj) {
        var messageArr = [];

        if (typeof obj !== "object" || !Object.keys(obj).length) {
            return winstonLogger.info("no action logged: missing logger object");
        }

        messageArr.push(new Date().getHours() + ':' + new Date().getMinutes());

        if(obj.name){
            messageArr.push(obj.name + ' performed action on ');
        }
        if(obj.deviceName){
            messageArr.push(obj.deviceName);
        }
        if(String(obj.action.isTurnOn) === "true"){
            messageArr.push(` and turn on the ${obj.deviceType}`);
        }
        if(String(obj.action.isTurnOn) === "false"){
            messageArr.push(` and turn off the ${obj.deviceType}`);
        }
        if(isFinite(obj.action.volume)){
            messageArr.push(` and set the volume ${obj.action.volume} on the ${obj.deviceType}`);
        }
        if(obj.action.color){
            messageArr.push(` and set the color ${obj.action.color} on the ${obj.deviceType}`);

        }

        messageArr.push("");

        messageArr.push("");

        winstonLogger.info(messageArr.join(" "));
    };




    module.exports = Logger;
})();
