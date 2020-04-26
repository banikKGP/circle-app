const partnerManager = require("./manager");
const httpStatus = require("../../utils/http-status-code");
const HTTPResponse = require("../../utils/http_response");

const createNewPartner = async (req, res) =>{
    try {
        const newPartner = await partnerManager.createNewPartner(req.body);
        res.locals.data = newPartner;
        return new HTTPResponse(httpStatus.CREATED)
              .send(req, res);
    } catch (err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const login = async (req, res) => {
    try {
        req.body.user = req.user;
        const successfulPartner = await partnerManager.login(req.body);
        res.set('Authorization', successfulPartner.token);
        // res['headers']['Authorization'] = successfulLoginToken;
        delete successfulPartner.password;
        delete successfulPartner.token;

        res.locals.data = successfulPartner;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
        // console.log(successfulLogin);
        
    } catch(err){
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

module.exports = {
    createNewPartner,
    login
};