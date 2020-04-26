const model = require("./model");
// const socketHandler = require("../../config/socket-handler");

const createNewCircle = (circleBody) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!circleBody.circleName) {
                return reject('name is required');
            }
            if(!circleBody.password){
                return reject('password is required');
            }
            const savedCircle = await model.createNewCircle(circleBody);
            return resolve(savedCircle);
        } catch(err) {
            return reject(err);
        }
    });
};

const login = (loginParams) => {
    return new Promise(async (resolve, reject) =>{
        try{
            if(!loginParams.circleId) {
                return reject('circle Id is required');
            }
            if(!loginParams.password){
                return reject('password is required');
            }
            const savedCircle = await model.validateLogin(loginParams);
            return resolve(savedCircle);
        } catch(err){
            return reject(err.message || err);
        }
    });
};

const createInvitationLink = (req, res) => {

};

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
                return reject('User name is missing');
            }
            const newUser = await model.getUser(userParams);
            return resolve(newUser);
        } catch(err) {
            return reject(err.message || err);
        }
    });
};

const removeUser = (userParams) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!userParams.userName) {
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
    createNewCircle,
    login,
    createInvitationLink,
    addNewUser,
    getUser,
    removeUser
};