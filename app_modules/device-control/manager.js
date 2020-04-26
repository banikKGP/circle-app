const model = require("./model");

const create = (deviceControlBody) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!deviceControlBody.deviceId) {
                return reject('Device Id is required');
            }

            if(!deviceControlBody.deviceType) {
                return reject('Device type is required');
            }

            const savedPartner = await model.create(deviceControlBody);
            
            return resolve(savedPartner);
        } catch(err) {
            return reject(err);
        }
    });
};

const readById = (deviceParams) => {
    return new Promise(async (resolve, reject) =>{
        try{
            if(!deviceParams.deviceId){
                return reject('device id is missing');
            }
            const activeDevices = await model.readById(deviceParams);
            return resolve(activeDevices);
        } catch(err){
            return reject(err);
        }
    });
};

const updateById = (deviceBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!deviceBody.deviceId){
                return reject('device id is missing');
            }
            let authParams = {
                partnerId: deviceBody.user._id,
                deviceId: deviceBody.deviceId
            };
            let updatedParams = {};
            if(typeof(deviceBody.isTurnOn) === 'boolean' && String(deviceBody.isTurnOn)){
                updatedParams.isTurnOn = deviceBody.isTurnOn;
            }
            if(typeof(deviceBody.volume) === 'number'){
                updatedParams.volume = deviceBody.volume;
            }
            if(deviceBody.color){
                updatedParams.color = deviceBody.color;
            }
            const updatedDevice = await model.updateById(authParams, updatedParams);
            return resolve(updatedDevice);
        } catch(err) {
            return reject(err);
        }
    });
};

const deleteById = (deleteBody) => {
    return new Promise(async (resolve, reject) => {
        if(!deleteBody.deviceId){
            return reject('device id is missing');
        }
        let deleteParams = {
            partnerId: deleteBody.user._id,
            deviceId: deleteBody.deviceId
        };
        const deletedDevice = await model.deleteById(deleteParams);
        return resolve(deletedDevice);
    });
};

module.exports = {
    create,
    readById,
    updateById,
    deleteById
};