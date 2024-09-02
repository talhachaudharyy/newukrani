const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    cnicPhoto: { type: String, default: null },
    height: Number,
    weight: Number,
    eyeColor: String,
    address: String,
    phoneNumber: String,
    gmail: { type: String, required: true },
    transportNumber: String,
    idCardNumber: String,
    hairColor: String
});

module.exports = mongoose.model('User', userSchema);
