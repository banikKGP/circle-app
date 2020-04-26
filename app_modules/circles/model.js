const { Circle } = require("./schema");
const bcrypt = require("bcrypt");

const createNewCircle = (circleBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            circle = new Circle({
                circleName: circleBody.circleName,
                password: circleBody.password
            });
            circle.password = await bcrypt.hash(circle.password, 10);
            await circle.save();
            return resolve(circle);
            // const token = partner.generateAuthToken();
            // console.log(token);
        } catch (err) {
            return reject(err);
        }
    });
};

const validateLogin = (loginParams) => {
    return new Promise(async (resolve, reject) => {
        try {
            const savedCircle = await Circle.findOne({ _id: loginParams.circleId });
            if (!savedCircle) {
                return reject('Circle id is not valid');
            }
            const encryptedPassword = savedCircle.password;
            isValidPassword = await bcrypt.compare(loginParams.password, encryptedPassword);
            if (String(isValidPassword) === "true") {
                const token = savedCircle.generateAuthToken();
                savedCircle.token = token;
                // console.log(token);
                //create a circle in socket
                return resolve(savedCircle);
            } else {
                return reject('please check Email Id or Password');
            }
        } catch (err) {
            return reject(err);
        }
    });
};

const addNewUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try{
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id ,
                isDeleted: false
            });
            if(!circle){
                return reject("Circle does not exist");
            }
            circle.users.push({
                userName: userParams.userName
            });
            await circle.save();
            return resolve(userParams);
        } catch(err) {
            return reject(err);
        }
    });
};

const getUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try{
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id ,
                ["users.userName"]: userParams.userName,
                isDeleted: false
            });
            if(!circle){
                return reject("Circle does not exist");
            }
            return resolve(circle);
        } catch(err) {
            return reject(err);
        }
    });
};

const removeUser = (userParams) => {
    return new Promise(async (resolve, reject) => {
        try{
            const circle = await Circle.findOne({
                _id: userParams.circleId || userParams.circle._id ,
                ["users.userName"]: userParams.userName,
                isDeleted: false
            });
            if(!circle){
                return reject("Circle does not exist");
            }
            
            exisitingUsers = circle.users.filter(user => {
                if(user.userName != userParams.userName){
                    return user;
                }
            });
            circle.users = exisitingUsers;
            circle.save();
            return resolve(circle);
        } catch(err) {
            return reject(err);
        }
    });
};

module.exports = {
    createNewCircle,
    validateLogin,
    addNewUser,
    getUser,
    removeUser
};