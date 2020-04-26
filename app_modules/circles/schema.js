
const {secrectConfig} = require("../../config/app");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//simple schema
const CircleSchema = new mongoose.Schema({
  circleName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  circleAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Partner"
  },
  invitation_link: {
    type: Schema.Types.String
  },
  users: [{
    userName: {
      type: Schema.Types.String,
      required: false
    }
  }],
  isDeleted: {
    type: Schema.Types.Boolean,
    select: false,
    default: false,
    required: true
  }
});

CircleSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.circle_id = ret._id;
    if(ret.password){
      delete ret.password;
    }
    delete ret._id;
  }
});


//custom method to generate authToken 
CircleSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, secrectConfig.authPrivatekey); //get the private key from the config file -> environment variable
  return token;
};

const Circle = mongoose.model('Circle', CircleSchema);


module.exports = {
    Circle
};