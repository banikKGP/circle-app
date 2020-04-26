
const {secrectConfig} = require("../../../config/app");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//simple schema
const CircleUserSchema = new mongoose.Schema({
  circleId: {
      type: Schema.Types.ObjectId,
      ref: 'Circle',
      required: true
  },
  circleAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Partner"
  },
  userName: {
    type: Schema.Types.String,
    required: false
  },
  isAdmin: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
  }
});

CircleUserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.circleUserId = ret._id;
    if(ret.password){
      delete ret.password;
    }
    delete ret._id;
  }
});

const CircleUser = mongoose.model('CircleUser', CircleUserSchema);


module.exports = {
    CircleUser
};