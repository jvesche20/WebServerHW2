const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  ssn: {
    type: String,
    required: true,
    unique: true,
    min: 11,
    max: 11,
    validate: {
      validator(value) {
        return /\d{3}-\d{2}-\d{4}/.test(value);
      },
    },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  age: {
    type: Number,
    required: true,
    min: 0,
  },
  address: { type: String, required: false },
  phone: { type: String, required: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
