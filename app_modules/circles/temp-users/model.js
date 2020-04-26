const { Circle } = require('../schema');
const { CircleUser } = require('./schema');

const addNewUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id,
                isDeleted: false
            });
            if (!circle) {
                return reject("Circle does not exist");
            }
            const circleUser = new CircleUser({
                userName: userParams.userName,
                circleId: userParams.circleId || userParams.circle._id
            });
            await circleUser.save();
            return resolve(circleUser);
        } catch (err) {
            return reject(err);
        }
    });
};

const getUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id,
                isDeleted: false
            });
            if (!circle) {
                return reject('Circle does not exist')
            }
            const circleUser = await CircleUser.findOne({
                circleId: circle._id,
                _id: userParams.circleUserId
            });
            if (!circleUser) {
                return reject("Circle does not exist");
            }
            return resolve(circleUser);
        } catch (err) {
            return reject(err);
        }
    });
};

const getAllUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id,
                isDeleted: false
            });
            if(!circle){
                return reject('Circle doesnot exist');
            }
            matchParams = {
                '$match': {
                    'circleId': circle._id
                }
            };
            groupParams = {
                '$group': {
                  '_id': '$circleId', 
                  'users': {
                    '$addToSet': {
                      'circleUserId': '$_id', 
                      'isAdmin': '$isAdmin', 
                      'userName': '$userName', 
                      'circleId': '$circleId'
                    }
                  }
                }
              };
            projectParams = {
                '$project': {
                  '_id': 0, 
                  'circleId': '$_id', 
                  'users': 1
                }
              };
            const allUser = await CircleUser.aggregate([matchParams, groupParams, projectParams]);
            return resolve(allUser[0]);

        } catch (err) {
            return reject(err);
        }
    });
};

const removeUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const circleUser = await CircleUser.findOneAndDelete({
                circleId: userParams.circleId || userParams.circle._id,
                _id: userParams.circleUserId
            });
            // const circleUser = await CircleUser.deleteOne({
            //     circleId: userParams.circleId || userParams.circle._id,
            //     _id: userParams.userId
            // });
            if (!circleUser) {
                return reject("Unable to remove user");
            }
            return resolve(circleUser);
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    addNewUser,
    getUser,
    removeUser,
    getAllUser
};