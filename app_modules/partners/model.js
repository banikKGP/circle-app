const { Partner, validatePartner } = require("./schema");
const bcrypt = require("bcrypt");

const createNewPartner = (partnerBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = validatePartner(partnerBody);
            if (error) {
                return reject (error.details[0].message);
            }
            let partner = await Partner.findOne({ email: partnerBody.email });
            if (partner) {
                return reject('Partner already exist');
            }
            partner = new Partner({
                name: partnerBody.name,
                password: partnerBody.password,
                email: partnerBody.email,
                contactNumber: partnerBody.contactNumber
            });
            partner.password = await bcrypt.hash(partner.password, 10);
            await partner.save();
            return resolve(partner);
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
            const partner = await Partner.findOne({ email: loginParams.email });
            if (!partner) {
                return reject('EmailId is not valid');
            }
            const encryptedPassword = partner.password;
            isValidPassword = await bcrypt.compare(loginParams.password, encryptedPassword);
            if (String(isValidPassword) === "true") {
                const token = partner.generateAuthToken();
                partner.token = token;
                // console.log(token);
                return resolve(partner);
            } else {
                return reject('please check Email Id or Password');
            }
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = {
    createNewPartner,
    validateLogin
};