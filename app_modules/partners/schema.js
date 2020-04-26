
const {secrectConfig} = require("../../config/app");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//simple schema
const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  contactNumber: {
    type: Number,
    required: true
  },
  isExists: {
    type: Boolean,
    required: true,
    default: true
  }
});

PartnerSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.partner_id = ret._id;
    if(ret.password){
      delete ret.password;
    }
    delete ret._id;
  }
});


//custom method to generate authToken 
PartnerSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, secrectConfig.authPrivatekey); //get the private key from the config file -> environment variable
  return token;
};

const Partner = mongoose.model('Partner', PartnerSchema);

//function to validate partner 
function validatePartner(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    contactNumber: Joi.number().required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
    Partner,
    validatePartner
};