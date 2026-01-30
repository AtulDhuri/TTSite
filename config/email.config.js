const nodemailer = require('nodemailer');
require('dotenv').config();

// Check if email is properly configured
const isEmailConfigured = () => {
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        // Check if it's not dummy/placeholder values
        if (process.env.EMAIL_HOST.includes('yourdomain.com') || 
            process.env.EMAIL_USER.includes('yourdomain.com') ||
            process.env.EMAIL_PASSWORD.includes('password-here')) {
            return false;
        }
        return true;
    }
    if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        return true;
    }
    return false;
};

// Email transporter configuration
// Supports both service-based (Gmail, Outlook) and custom SMTP
let transportConfig;
let transporter = null;

if (isEmailConfigured()) {
    if (process.env.EMAIL_HOST) {
        // Custom SMTP configuration (for custom domains like GoDaddy)
        transportConfig = {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT) || 465,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false // For self-signed certificates
            }
        };
        console.log(`📧 Using custom SMTP: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
    } else if (process.env.EMAIL_SERVICE) {
        // Service-based configuration (Gmail, Outlook, etc.)
        transportConfig = {
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        };
        console.log(`📧 Using email service: ${process.env.EMAIL_SERVICE}`);
    }

    transporter = nodemailer.createTransport(transportConfig);

    // Verify email configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Email configuration error:', error.message);
            console.log('💡 Please check your .env file and email credentials');
            console.log('💡 For GoDaddy: Use smtp.secureserver.net, Port 465');
            console.log('💡 For cPanel: Use mail.yourdomain.com, Port 465 or 587');
        } else {
            console.log('✅ Email server is ready to send messages');
        }
    });
} else {
    console.log('📧 Email not configured - form submissions will be logged only');
    console.log('💡 See EMAIL-SETUP-GUIDE.md to configure email');
}

module.exports = {
    transporter,
    isEmailConfigured: isEmailConfigured()
};
