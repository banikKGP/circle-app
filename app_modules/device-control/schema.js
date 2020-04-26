const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//simple schema
const DeviceControlSchema = new mongoose.Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  deviceType: {
    type: String,
    enum: ["LIGHT", "PLUG", "TV", "HEADPHONE"],
    required: true
  },
  isTurnOn: {
    type: Schema.Types.Boolean,
    required: true,
    default: true
  },
  isDeleted: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  volume: {
    type: Number,
    max: 10,
    min: 0
  },
  color: {
    type: Schema.Types.String
  }
});

DeviceControlSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.deviceControlId = ret._id;
    if(ret.password){
      delete ret.password;
    }
    delete ret._id;
  }
});

const DeviceControl = mongoose.model('DeviceControl', DeviceControlSchema);

module.exports = {
  DeviceControl
};