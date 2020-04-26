const partnerModel = require("./model");

const createNewPartner = (partnerBody) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!partnerBody.email) {
                return reject('EMAIL is required');
            }
            if(!partnerBody.name) {
                return reject('name is required');
            }
            if(!partnerBody.password){
                return reject('name is required');
            }
            if(!partnerBody.contactNumber){
                return reject('contact number is required');
            }
            const savedPartner = await partnerModel.createNewPartner(partnerBody);
            return resolve(savedPartner);
        } catch(err) {
            return reject(err);
        }
    });
};

const login = (loginParams) => {
    return new Promise(async (resolve, reject) =>{
        try{
            if(!loginParams.email) {
                return reject('EMAIL is required');
            }
            if(!loginParams.password){
                return reject('name is required');
            }
            const savedPartner = await partnerModel.validateLogin(loginParams);
            return resolve(savedPartner);
        } catch(err){
            return reject(err);
        }
    });
};

module.exports = {
    createNewPartner,
    login
};