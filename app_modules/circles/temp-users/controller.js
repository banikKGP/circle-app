const manager = require("./manager");
const httpStatus = require("../../../utils/http-status-code");
const HTTPResponse = require("../../../utils/http_response");

const addUser = async (req, res) => {
    try {
        req.body.circle = req.circle;
        const successfulUser = await manager.addNewUser(req.body);

        res.locals.data = successfulUser;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch(err){
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const getUser = async (req, res) => {
    try {
        req.query.circle = req.circle;
        const curUser = await manager.getUser(req.query);
        res.locals.data = curUser;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch(err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};
const getAllUser = async (req, res) => {
    try {
        req.query.circle = req.circle;
        const curUser = await manager.getAllUser(req.query);
        res.locals.data = curUser;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch(err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

module.exports = {
    addUser,
    getUser,
    getAllUser
};