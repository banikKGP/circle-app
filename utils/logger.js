(function () {
    "use strict";
    var Logger = function () { },
        winstonLogger,
        winston = require("winston"),
        fs = require("fs"),
        customLevels = {},
        logDir = "../logs/home-automation-logs";

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    customLevels.levels = {
        critical: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        silly: 5
    };

    customLevels.colors = {
        critical: "redBG",
        error: "red",
        warn: "yellow",
        info: "green",
        debug: "cyan",
        silly: "gray"
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
        var messageArr = [],
            req = {},
            res = {},
            ticket;

        if (typeof obj !== "object" || !Object.keys(obj).length) {
            return winstonLogger.info("no info logged: missing logger object");
        }

        if (typeof obj.req === "object") {
            req = obj.req;
        }

        if (typeof obj.res === "object") {
            res = obj.res;
        }

        if (typeof obj.ticket === "object") {
            ticket = obj.ticket;
        }

        // #3 environment
        messageArr.push(process.env.NODE_ENV);

        // #4 ip
        messageArr.push(req ? (req.headers['x-forwarded-for'] || (req.connection ? req.connection.remoteAddress : "")) : "");

        // #5 verb
        messageArr.push(req ? req.method : (obj.method ? obj.method : ""));

        // #6 endpoint
        messageArr.push(req ? req.originalUrl.split("?")[0] : "");

        // #7 email if present
        messageArr.push(ticket && ticket.client && ticket.client.email ? ticket.client.email.value : "");

        // #8 response status code if present
        messageArr.push(res ? res.httpStatusCode : "");

        // #9 response time of request
        messageArr.push(obj.startTime ? (new Date().getTime() - obj.startTime) : -1);

        // #10 headers
        messageArr.push(req ? JSON.stringify(req.headers) : JSON.stringify({}));

        // #11 req data
        messageArr.push(JSON.stringify(
            req && (typeof req.query === "object" || typeof req.body === "object") ?
                (req.body && Object.keys(req.body).length ? req.body : req.query) : {}
        ));

        // #12 res data
        messageArr.push("");

        // #13 extra space for delimiting
        messageArr.push("");

        winstonLogger.info(messageArr.join(" "));
    };

    Logger.debug = function (obj) {
        var messageArr = [],
            req = {},
            res = {},
            ticket;

        if (typeof obj !== "object" || !Object.keys(obj).length) {
            return winstonLogger.info("no info logged: missing logger object");
        }

        if (typeof obj.req === "object") {
            req = obj.req;
        }

        if (typeof obj.res === "object") {
            res = obj.res;
        }

        if (typeof obj.ticket === "object") {
            ticket = obj.ticket;
        }

        // #3 environment
        messageArr.push(process.env.NODE_ENV);

        // #4 ip
        messageArr.push(req ? (req.headers['x-forwarded-for'] || (req.connection ? req.connection.remoteAddress : "")) : "");

        // #5 verb
        messageArr.push(req ? req.method : (obj.method ? obj.method : ""));

        // #6 endpoint
        messageArr.push(
            req ? req.originalUrl.split("?")[0] : (
                typeof obj.originalUrl === "string" ? obj.originalUrl.split("?")[0] : (
                    typeof obj.endpoint === "string" ? obj.endpoint.split("?")[0] : ""
                )
            )
        );

        // #7 email if present
        messageArr.push(ticket && ticket.client && ticket.client.email ? ticket.client.email.value : "");

        // #8 response status code if present
        messageArr.push(res ? res.httpStatusCode : "");

        // #9 response time of request
        messageArr.push(obj.startTime ? (new Date().getTime() - obj.startTime) : -1);

        // #10 headers
        messageArr.push(req ? JSON.stringify(req.headers) : JSON.stringify({}));

        // #11 req data
        messageArr.push(JSON.stringify(
            req && (typeof req.query === "object" || typeof req.body === "object") ?
                (req.body && Object.keys(req.body).length ? req.body : req.query) : {}
        ));

        // #12 res data
        if (res) {
            delete res.data;
            messageArr.push(JSON.stringify(res));
        } else {
            messageArr.push("");
        }

        // #13 extra space for delimiting
        messageArr.push("");


        winstonLogger.debug(messageArr.join(" "));
    };

    Logger.error = function (obj) {
        var messageArr = [],
            req = {},
            res = {},
            ticket;

        if (typeof obj !== "object" || !Object.keys(obj).length) {
            return winstonLogger.info("no info logged: missing logger object");
        }

        if (typeof obj.req === "object") {
            req = obj.req;
        }

        if (typeof obj.res === "object") {
            res = JSON.parse(JSON.stringify(obj.res));
        }

        if (typeof obj.ticket === "object") {
            ticket = obj.ticket;
        }

        // #3 environment
        messageArr.push(process.env.NODE_ENV);

        // #4 ip
        messageArr.push(req ? (req.headers['x-forwarded-for'] || (req.connection ? req.connection.remoteAddress : "")) : "");

        // #5 verb
        messageArr.push(req ? req.method : (obj.method ? obj.method : ""));

        // #6 endpoint
        messageArr.push(req ? req.originalUrl.split("?")[0] : "");

        // #7 email if present
        messageArr.push(ticket && ticket.client && ticket.client.email ? ticket.client.email.value : "");

        // #8 response status code if present
        messageArr.push(res ? res.httpStatusCode : "");

        // #9 response time of request
        messageArr.push(obj.startTime ? (new Date().getTime() - obj.startTime) : -1);

        // #10 headers
        messageArr.push(req ? JSON.stringify(req.headers) : JSON.stringify({}));

        // #11 req data
        messageArr.push(JSON.stringify(
            req && (typeof req.query === "object" || typeof req.body === "object") ?
                (req.body && Object.keys(req.body).length ? req.body : req.query) : {}
        ));

        // #12 res data
        if (res) {
            delete res.data;
            messageArr.push(JSON.stringify(res));
        } else {
            messageArr.push("");
        }

        // #13 extra space for delimiting
        messageArr.push("");

        winstonLogger.error(messageArr.join(" "));
    };

    Logger.critical = function (obj) {
        var messageArr = [],
            req = {},
            res = {},
            ticket;

        if (typeof obj !== "object" || !Object.keys(obj).length) {
            return winstonLogger.info("no info logged: missing logger object");
        }

        if (typeof obj.req === "object") {
            req = obj.req;
        }

        if (typeof obj.res === "object") {
            res = obj.res;
        }

        if (typeof obj.ticket === "object") {
            ticket = obj.ticket;
        }

        // #3 environment
        messageArr.push(process.env.NODE_ENV);

        // #4 ip
        messageArr.push(req ? (req.headers['x-forwarded-for'] || (req.connection ? req.connection.remoteAddress : "")) : "");

        // #5 verb
        messageArr.push(req ? req.method : (obj.method ? obj.method : ""));

        // #6 endpoint
        messageArr.push(req ? req.originalUrl.split("?")[0] : "");

        // #7 email if present
        messageArr.push(ticket && ticket.client && ticket.client.email ? ticket.client.email.value : "");

        // #8 response status code if present
        messageArr.push(res ? res.httpStatusCode : "");

        // #9 response time of request
        messageArr.push(obj.startTime ? (new Date().getTime() - obj.startTime) : -1);

        // #10 headers
        messageArr.push(req ? JSON.stringify(req.headers) : JSON.stringify({}));

        // #11 req data
        messageArr.push(JSON.stringify(
            req && (typeof req.query === "object" || typeof req.body === "object") ?
                (req.body && Object.keys(req.body).length ? req.body : req.query) : {}
        ));

        // #12 res data
        if (res) {
            delete res.data;
            messageArr.push(JSON.stringify(res));
        } else {
            messageArr.push("");
        }

        // #13 extra space for delimiting
        messageArr.push("");

        winstonLogger.log("critical", messageArr.join(" "));
    };

    module.exports = Logger;
})();
