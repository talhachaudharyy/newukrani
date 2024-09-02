const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('../models/user'); // Adjust the path if necessary
const fs = require('fs');

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
            html: `
                <html>
                <body>
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f4f4;">
                        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <h2 style="color: #4a90e2;">Registration Successful</h2>
                            <p>Dear ${newUser.firstName},</p>
                            <p>Thank you for registering with us. Your registration has been successfully completed.</p>
                            <p>Best regards,</p>
                            <p>State Migration Service of Ukraine</p>
                            <img src="cid:logoImage" alt="State Migration Service Logo" style="display: block; margin: 20px auto; max-width: 200px;">
                        </div>
                    </div>
                </body>
                </html>
            `,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname,'../../assets/img/logo/logo-dmsu.png'), // Update this path to where your logo is stored
                    cid: 'logoImage' // This CID should match the src in the HTML
                }
            ]
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
