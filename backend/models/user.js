const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    cnicPhoto: { type: String, required: true }, // Assuming base64 encoded string or a URL
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    eyeColor: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gmail: { type: String, required: true },
    transportNumber: { type: String }, // New field
    idCardNumber: { type: String },    // New field
    hairColor: { type: String }        // New field
});

module.exports = mongoose.model('User', UserSchema);
