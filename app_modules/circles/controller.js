const manager = require("./manager");
const httpStatus = require("../../utils/http-status-code");
const HTTPResponse = require("../../utils/http_response");

const createNewCircle = async (req, res) =>{
    try {
        const newCircle = await manager.createNewCircle(req.body);
        res.locals.data = newCircle;
        return new HTTPResponse(httpStatus.CREATED)
              .send(req, res);
    } catch (err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const login = async (req, res) => {
    try {
        req.body.user = req.circle;
        const circle = await manager.login(req.body);
        res.set('Authorization', circle.token);
        // res['headers']['Authorization'] = successfulLoginToken;
        delete circle.password;
        delete circle.token;

        res.locals.data = circle;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
        // console.log(successfulLogin);
        
    } catch(err){
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const createInvitationLink = async (req, res) => {
    try {
        req.body.circle = req.circle;
        const successfulPartner = await manager.createInvitationLink(req.body);

        res.locals.data = successfulPartner;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
        // console.log(successfulLogin);
        
    } catch(err){
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

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

module.exports = {
    createNewCircle,
    login,
    createInvitationLink,
    addUser,
    getUser
};