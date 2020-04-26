const { Partner } = require("../partners/schema");
const { DeviceControl } = require("./schema");
const { Device } = require("../circles/schema");
const actionLogInfo = require("../../utils/action-log");

const create = (deviceControlBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deviceControl = await DeviceControl.findOne({
                deviceId: deviceControlBody.deviceId,
                deviceType: deviceControlBody.deviceType,
                isDeleted: false
            });
            if(deviceControl){
                return reject(`${deviceBody.deviceName} already exists in this home`);
            }
            createBody = {
                deviceType: deviceControlBody.deviceType,
                deviceId: deviceControlBody.deviceId,
            };
            switch(deviceControlBody.deviceType){
                case 'TV':
                    createBody.volume = 8;
                    break;
                case 'HEADPHONE':
                    createBody.volume = 5;
                    break;
                case 'LIGHT':
                    createBody.color = '#FFFFFF';
            }
            deviceControl = new DeviceControl(createBody);
            await deviceControl.save();
            return resolve(deviceControl);
        } catch (err) {
            return reject(err);
        }
    });
};

const readById = (deviceParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            let partner = await Partner.findOne({ _id: deviceParams.user._id, isExists: true });
            if (!partner) {
                return reject("Invalid partner");
            }
            const activeDevices = await DeviceControl.findOne({ 
                deviceId: deviceParams.deviceId,
                isDeleted: false 
            });
            return resolve(activeDevices);
        } catch (e) {
            return reject(e);
        }
    });
};

const updateById = (authParams, updateParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const partner = await Partner.findOne({
                _id: authParams.partnerId
            });
            actionLogParams = {
                name: partner.name,
                email: partner.email,
                location: partner.location
            };
            const device = await Device.findOne({
                partnerId: authParams.partnerId,
                _id: authParams.deviceId,
                isDeleted: false 
            });
            actionLogParams.deviceName = device.deviceName;
            if (!device) {
                return reject("Device does not exists");
            }
            let deviceControl = await DeviceControl.findOne({
                deviceId: authParams.deviceId,
                isDeleted: false
            });
            if(!deviceControl){
                return reject('No control found for this device, please contact support');
            }
            for(let key of Object.keys(updateParams)){
                actionLogParams.deviceType = deviceControl.deviceType;
                if(deviceControl.deviceType == 'TV' || deviceControl.deviceType == 'HEADPHONE'){
                    if(key == 'volume'){
                        actionLogParams.action = {
                            'volume': updateParams[key]
                        };
                        deviceControl[key] = updateParams[key];
                    }
                }
                else if(deviceControl.deviceType == 'LIGHT'){
                    if(key == 'color'){
                        actionLogParams.action = {
                            'color': updateParams[key]
                        };
                        deviceControl[key] = updateParams[key];
                    }
                }
                if(key == 'isTurnOn'){
                    actionLogParams.action = {
                        'isTurnOn': updateParams[key]
                    };
                    deviceControl[key] = updateParams[key];
                }
            }
            const updateDeviceControl = await deviceControl.save();
            actionLogInfo.info(actionLogParams);
            resolve(updateDeviceControl);
        } catch(err) {
            return reject(err);
        }
    });
};

const deleteById = (deleteParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            let device = await DeviceControl.findOne({ 
                partnerId: deleteParams.partnerId, 
                _id: deleteParams.deviceId,
                isDeleted: false 
            });
            if (!device) {
                return reject("DeviceControl does not exists");
            }
            device.isDeleted = true;
            const deletedDevice = device.save();
            return resolve(deletedDevice);
        } catch(err) {
            return reject(err);
        }
    });
};

module.exports = {
    create,
    readById,
    updateById,
    deleteById
};