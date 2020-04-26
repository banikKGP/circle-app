const model = require("./model");

const addNewUser = (userParams) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!userParams.userName) {
                return reject('User name is missing');
            }
            const newUser = await model.addNewUser(userParams);
            return resolve(newUser);
        } catch(err) {
            return reject(err.message || err);
        }
    });
};

const getUser = (userParams) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!userParams.circleUserId) {
                return reject('User Id is missing');
            }
            const newUser = await model.getUser(userParams);
            return resolve(newUser);
        } catch(err) {
            return reject(err.message || err);
        }
    });
};

const getAllUser = (userParams) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!userParams.circleId) {
                return reject('circle Id is missing');
            }
            const newUser = await model.getAllUser(userParams);
            return resolve(newUser);
        } catch(err) {
            return reject(err.message || err);
        }
    });
};

const removeUser = (userParams) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!userParams.circleUserId) {
                return reject('User name is missing');
            }
            const circle = await model.removeUser(userParams);
            return resolve(circle);
        } catch(err) {
            return reject(err.message || err);
        }
    });
};

module.exports = {
    addNewUser,
    getUser,
    removeUser,
    getAllUser
};