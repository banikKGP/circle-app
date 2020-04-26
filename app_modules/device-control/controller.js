const manager = require("./manager");
const httpStatus = require("../../utils/http-status-code");
const HTTPResponse = require("../../utils/http_response");

// const create = async (req, res) =>{
//     try {
//         req.body.user = req.user;
//         const newDevice = await manager.create(req.body);
//         res.locals.data = newDevice;
//         return new HTTPResponse(httpStatus.CREATED)
//               .send(req, res);
//     } catch (err) {
//         return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
//     }
// };

const readById = async (req, res) =>{
    try {
        req.query.user = req.user;
        req.query.deviceId = req.params.id;
        const devices = await manager.readById(req.query);
        res.locals.data = devices;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch (err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const updateById = async (req, res) => {
    try {
        req.body.user = req.user;
        req.body.deviceId = req.params.id;
        const updatedDevice = await manager.updateById(req.body);
        res.locals.data = updatedDevice;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch(err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};

const deleteById = async (req, res) => {
    try {
        req.body.user = req.user;
        req.body.deviceId = req.params.id;
        await manager.deleteById(req.body);
        // res.locals.data = updatedDevice;
        return new HTTPResponse(httpStatus.OK)
              .send(req, res);
    } catch(err) {
        return new HTTPResponse(httpStatus.BAD_REQUEST, err).send(req, res);
    }
};
module.exports = {
    // create,
    readById,
    updateById,
    deleteById
};