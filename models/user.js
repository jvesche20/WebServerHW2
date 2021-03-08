const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({

  ssn: {
    type: String,
    required: true,
    unique: true,
    min: 9,
    max: 9,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 130,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
