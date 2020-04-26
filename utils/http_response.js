

const _ = require("lodash"),

    changeCaseObject = require("change-case-object"),
    Utils = require("./common"),
    Logger = require("./logger");

(function () {
    "use strict";

    function initOut() {
        return {
            http_status_code: -1, // HTTP Status Code
            status: "", // Status of the response: success / error
            api_version: "1.0", // version of the API
            message: "", // message to be sent to the client
            //  { 
            //     dev: "", // message for dev - developer oriented message with errors
            //     user: "" // message for user - more intuitive from the usability perspective
            // },
            request: {
                method: "", // HTTP Method used to make this request
                params: {}, // query params passed - useful to see if data requested is understood by server
            },
            data: null // final data to be sent as output
        };
    }

    /**
     * @private
     * @type {{http_status_code: number, app_status_code: number, status: string, api_version: string,
     * message: {dev: string, user: string}, request: {method: string, params: object}, page: number,
     * limit: number, total_data: number, data: null}}
     * @description The out variable is a private variable used to define the HTTPResponse output
     */
    var out = initOut();

    /**
     * @description Create a new Response object
     * @param {object} respConstant - Response respConstant which is use as a key for response constants
     * @param {object} [errorConstant] - Error constant to be merged with respConstant
     * @param {object} [msgVars] - Dynamic values can be inserted inside a message by passing
     * it as a key-value pair in the msgVars object
     * @class
     */
    function Response(respConstant, errorConstant, msgVars) {

        out = initOut();

        // if respConstant param is not present..
        if (!respConstant) {

            // ..throw an exception saying param not found
            throw new ReferenceError("respConstant not found");
        }

        respConstant = JSON.parse(JSON.stringify(respConstant));

        // set the out object params with the response values defined by respConstant from response constants
        out.http_status_code = respConstant.http_status_code;

        // out.app_status_code = errorConstant ? errorConstant.app_status_code : -1;

        out.status = respConstant.status;

        if (errorConstant) {
            errorConstant = JSON.parse(JSON.stringify(errorConstant));

            out.message = errorConstant.message || errorConstant;

            out.message = out.message ? out.message : {};

            // log message is not to be sent to the client but to the log server, hence deleted
            delete out.message.log;

            if (errorConstant.msgVars) {
                msgVars = _.merge(msgVars, errorConstant.msgVars);
            }

            // out.message.dev = Utils.templateToString(out.message.dev, msgVars);
            // out.message.user = Utils.templateToString(out.message.user, msgVars);
        } else {
            out.message = { dev: respConstant.message, user: "" };
        }
    }

    /**
     * @method send method to send an HTTP response for the request
     * @param {object} req - ExpressJS req object
     * @param {object} res - ExpressJS res object
     * @param {object} res.locals.totalData - total data present in the server for the given query
     * @param {object} res.locals.data - the actual data
     */
    Response.prototype.send = function (req, res) {

        // if the Express req object is not present, throw exception
        if (!req) {
            throw new ReferenceError("req param not found");
        }

        // if the Express res object is not present, throw exception
        if (!res) {
            throw new ReferenceError("res param not found");
        }

        // if req object does not have both query and body, throw exception
        if (!req.query && !req.body) {
            throw new ReferenceError("either req.query or req.body should be present");
        }

        delete req.body.fileData;

        // set the request object with the request http method and request params
        out.request = {
            method: req.method,
            params: res.locals.requestParams
        };

        // if data is present, add total data, page and limit along with the actual data
        if (res.locals.data) {

            out.data = res.locals.data;

            if (req.method === "GET") {
                // if page is present in request query, set that else default it to 1
                out.request.page = req.query.page || 1;

                // if limit is set on request query, set that else default it to default page
                // limit from config
                out.request.limit = req.query.limit || 20;
            }
        }

        out = changeCaseObject.camelCase(JSON.parse(JSON.stringify(out)));

        if (out.httpStatusCode >= 200 && out.httpStatusCode < 400) {
            Logger.info({
                req: req,
                res: out,
                ticket: res.locals.ticket,
                startTime: res.locals.startTime
            });
        } else if (out.httpStatusCode >= 400 && out.httpStatusCode < 500) {
            Logger.error({
                req: req,
                res: out,
                ticket: res.locals.ticket,
                startTime: res.locals.startTime
            });
        } else if (out.httpStatusCode >= 500) {
            Logger.critical({
                req: req,
                res: out,
                ticket: res.locals.ticket,
                startTime: res.locals.startTime
            });
        }

        // request the ExpressJS response object to send the response
        res

            // override x-powered-by header for security purposes
            // .set("X-Powered-By", "Streamin-go")

            // define CORS control
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
            .set("Access-Control-Allow-Headers", "Authorization, Content-Type")
            .set("Access-Control-Allow-Credentials", false)
            .set("access-control-expose-headers", "Authorization")

            // sets the HTTP Status Code
            .status(out.httpStatusCode)

            // sets the response Content-Type to application/json and sends the json data
            .send(out);

    };

    Response.prototype.sendStatus = function (req, res) {
        res

            // override x-powered-by header for security purposes
            // .set("X-Powered-By", "Streamin-go")

            // define CORS control
            .set("Access-Control-Allow-Origin", "*")
            .set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
            .set("Access-Control-Allow-Headers", "Authorization, Content-Type")
            .set("Access-Control-Allow-Credentials", false)
            .set("X-XSS-Protection", "1; mode=block")

            // equivalent to res.status(status_code).send(status_code_specific_text)
            .sendStatus(out.http_status_code);
    };

    // return the Response class
    module.exports = Response;
})();
