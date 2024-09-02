const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use the email from .env file
        pass: process.env.EMAIL_PASS  // Use the password from .env file
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender's email address
        to: to,                        // Recipient's email address
        subject: subject,              // Subject line
        text: text                     // Plain text body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};

module.exports = { sendEmail };
