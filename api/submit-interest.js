// Vercel Serverless Function for form submission
const nodemailer = require('nodemailer');

// Email transporter configuration
let transporter;

if (process.env.EMAIL_HOST) {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 465,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
} else if (process.env.EMAIL_SERVICE) {
    transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { name, email, company, teamSize, message } = req.body;

        // Validation
        if (!name || !email || !teamSize) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Admin email
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            subject: `🎯 New Beta Interest: ${name} - TicketManager`,
            html: `
                <h2>🎉 New Beta Program Interest</h2>
                <p>A new visitor has expressed interest in TicketManager!</p>
                <h3>Visitor Information:</h3>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Company:</strong> ${company || 'Not provided'}</li>
                    <li><strong>Team Size:</strong> ${teamSize}</li>
                </ul>
                ${message ? `<h3>Message:</h3><p>${message}</p>` : ''}
                <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
            `,
            replyTo: email
        };

        await transporter.sendMail(adminMailOptions);

        // Confirmation email
        if (process.env.SEND_CONFIRMATION === 'true') {
            const confirmationMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to TicketManager Beta Program! 🎉',
                html: `
                    <h2>Welcome to TicketManager Beta!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for your interest! We'll be in touch soon.</p>
                    <p>Best regards,<br>The TicketManager Team</p>
                `
            };
            await transporter.sendMail(confirmationMailOptions);
        }

        res.status(200).json({
            success: true,
            message: 'Thank you! We\'ve received your interest and will be in touch soon.'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.'
        });
    }
};
