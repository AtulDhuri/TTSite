const { transporter, isEmailConfigured } = require('../config/email.config');
const { validateFormData } = require('../utils/validation');
const { getAdminEmailTemplate, getVisitorConfirmationTemplate } = require('../utils/emailTemplates');

/**
 * Handle form submission
 */
const submitInterestForm = async (req, res) => {
    try {
        // Validate form data
        const validation = validateFormData(req.body);
        
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.errors.join(', ')
            });
        }
        
        const { name, email, company, teamSize, message } = validation.data;
        
        // Log submission to console
        console.log('\n📝 New Beta Interest Form Submission:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`👤 Name: ${name}`);
        console.log(`📧 Email: ${email}`);
        console.log(`🏢 Company: ${company || 'Not provided'}`);
        console.log(`👥 Team Size: ${teamSize}`);
        if (message) console.log(`💬 Message: ${message}`);
        console.log(`🕐 Time: ${new Date().toLocaleString()}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // If email is configured, send emails
        if (isEmailConfigured && transporter) {
            try {
                // Prepare admin notification email
                const adminMailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
                    subject: `🎯 New Beta Interest: ${name} - TicketManager`,
                    html: getAdminEmailTemplate({ name, email, company, teamSize, message }),
                    replyTo: email
                };
                
                // Send admin notification
                await transporter.sendMail(adminMailOptions);
                console.log(`✅ Admin notification sent for: ${name} (${email})`);
                
                // Send confirmation email to visitor (if enabled)
                if (process.env.SEND_CONFIRMATION === 'true') {
                    const confirmationMailOptions = {
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: 'Welcome to TicketManager Beta Program! 🎉',
                        html: getVisitorConfirmationTemplate(name)
                    };
                    
                    await transporter.sendMail(confirmationMailOptions);
                    console.log(`✅ Confirmation email sent to: ${email}`);
                }
            } catch (emailError) {
                console.error('⚠️  Email sending failed:', emailError.message);
                console.log('📝 Form data saved to console log above');
            }
        } else {
            console.log('💡 Email not configured - submission logged above');
            console.log('💡 Configure email in .env to receive notifications');
        }
        
        // Success response (always return success even if email fails)
        res.json({
            success: true,
            message: 'Thank you! We\'ve received your interest and will be in touch soon.'
        });
        
    } catch (error) {
        console.error('❌ Error processing form submission:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.'
        });
    }
};

module.exports = {
    submitInterestForm
};
