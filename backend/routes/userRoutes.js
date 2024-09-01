const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); // Adjust the path if necessary

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to handle form submission
router.post('/ipo', upload.single('cnicPhoto'), async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            cnicPhoto: req.file ? req.file.path : null,
            height: req.body.height,
            weight: req.body.weight,
            eyeColor: req.body.eyeColor,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gmail: req.body.gmail,
            transportNumber: req.body.transportNumber, // New field
            idCardNumber: req.body.idCardNumber,       // New field
            hairColor: req.body.hairColor              // New field
        });

        await newUser.save();
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to submit form' });
    }
});

module.exports = router;
