/**
 * Email template for admin notification
 */
const getAdminEmailTemplate = (data) => {
    const { name, email, company, teamSize, message } = data;
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
                .info-item { margin: 10px 0; }
                .label { font-weight: bold; color: #6366f1; }
                .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🎉 New Beta Program Interest</h2>
                    <p>TicketManager</p>
                </div>
                <div class="content">
                    <p>A new visitor has expressed interest in the TicketManager beta program!</p>
                    
                    <div class="info-box">
                        <h3>Visitor Information</h3>
                        <div class="info-item">
                            <span class="label">Name:</span> ${name}
                        </div>
                        <div class="info-item">
                            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                        </div>
                        <div class="info-item">
                            <span class="label">Company:</span> ${company || 'Not provided'}
                        </div>
                        <div class="info-item">
                            <span class="label">Team Size:</span> ${teamSize}
                        </div>
                    </div>
                    
                    ${message ? `
                        <div class="info-box">
                            <h3>Additional Message</h3>
                            <p>${message}</p>
                        </div>
                    ` : ''}
                    
                    <div class="footer">
                        <p>Submitted on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

/**
 * Email template for visitor confirmation
 */
const getVisitorConfirmationTemplate = (name) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
                .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .feature-item { margin: 15px 0; padding-left: 25px; position: relative; }
                .feature-item:before { content: "✓"; position: absolute; left: 0; color: #6366f1; font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">TicketManager (TM)</div>
                    <h2>Welcome to the Beta Program! 🎉</h2>
                </div>
                <div class="content">
                    <p>Hi ${name},</p>
                    
                    <p>Thank you for your interest in TicketManager! We're thrilled to have you join our beta program.</p>
                    
                    <p><strong>You're not just a user - you're a partner in building TicketManager!</strong> Your feedback on bugs and feature requests will directly shape the product.</p>
                    
                    <div class="features">
                        <h3>What to Expect:</h3>
                        <div class="feature-item">Early access to all features</div>
                        <div class="feature-item">Report bugs and help us improve</div>
                        <div class="feature-item">Request features that make your life easier</div>
                        <div class="feature-item">Shape the product with your feedback</div>
                        <div class="feature-item">Free forever - no credit card required</div>
                    </div>
                    
                    <p>We'll be in touch soon with your beta access details and next steps.</p>
                    
                    <p>In the meantime, if you have any questions or ideas, feel free to reply to this email.</p>
                    
                    <p>Best regards,<br>
                    <strong>The TicketManager Team</strong></p>
                    
                    <div class="footer">
                        <p>© 2026 TicketManager. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = {
    getAdminEmailTemplate,
    getVisitorConfirmationTemplate
};
