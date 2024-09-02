const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
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

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle form submission
router.post('/ipo', upload.single('cnicPhoto'), async (req, res) => {
    //try {
        const newUser = new User({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            cnicPhoto: req.file ? req.file.path : null, // Handle optional file
            height: req.body.height,
            weight: req.body.weight,
            eyeColor: req.body.eyeColor,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gmail: req.body.gmail,
            transportNumber: req.body.transportNumber,
            idCardNumber: req.body.idCardNumber,
            hairColor: req.body.hairColor
        });

     const result= await newUser.save();

     console.log(JSON.stringify(result));
    

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.gmail,
            subject: 'Registration Successful',
            text: `Dear ${newUser.firstName},\n\nThank you for registering with us. Your registration has been successfully completed.\n\nBest regards,\nState Migration Service of Ukraine`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send confirmation email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'User registered successfully and confirmation email sent!' });
            }
        });
    // } catch (error) {
    //     console.error('Error:', error.message || error);
    //     res.status(500).json({ error: 'Failed to submit form' });
    // }
});

module.exports = router;
