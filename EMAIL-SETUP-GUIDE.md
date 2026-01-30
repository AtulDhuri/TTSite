# 📧 Email Setup Guide for Custom Domain

## For GoDaddy Domain Email

If you purchased your domain from GoDaddy and have email hosting with them, follow these steps:

### Step 1: Get Your Email Credentials

You should have:
- Email address: `info@yourdomain.com` (or whatever you created)
- Password: Your email password

### Step 2: Find Your SMTP Settings

**For GoDaddy Email:**
- **SMTP Server:** `smtp.secureserver.net` or `smtpout.secureserver.net`
- **Port:** `465` (SSL) or `587` (TLS)
- **Secure:** `true` for port 465, `false` for port 587

**For GoDaddy Workspace (Office 365):**
- **SMTP Server:** `smtp.office365.com`
- **Port:** `587`
- **Secure:** `false`

**For cPanel Email (if using cPanel hosting):**
- **SMTP Server:** `mail.yourdomain.com`
- **Port:** `465` or `587`
- **Secure:** `true` for 465, `false` for 587

### Step 3: Update Your .env File

Open `.env` file and update with your settings:

```env
# For GoDaddy Email
EMAIL_HOST=smtp.secureserver.net
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=your-email-password

# Where to receive form submissions
RECIPIENT_EMAIL=info@yourdomain.com

# Send confirmation to visitors
SEND_CONFIRMATION=true

# Server port
PORT=3000
```

### Step 4: Test Your Configuration

1. Save the `.env` file
2. Restart your server (stop and run `npm start` again)
3. Look for this message:
   ```
   ✅ Email server is ready to send messages
   ```
4. Submit a test form on your website

---

## How to Find Your Email Settings

### Method 1: Check GoDaddy Email Settings
1. Login to GoDaddy
2. Go to "Email & Office" or "Workspace Email"
3. Click on your email account
4. Look for "Settings" or "Email Setup"
5. Find SMTP settings

### Method 2: Check Your Email Client
If you already have your email set up in Outlook, Thunderbird, or another email client:
1. Open email client settings
2. Look for "Outgoing Server" or "SMTP Settings"
3. Copy those settings to your `.env` file

### Method 3: Contact GoDaddy Support
If you can't find the settings:
1. Contact GoDaddy support
2. Ask for "SMTP settings for sending email"
3. They'll provide the exact settings you need

---

## Common SMTP Settings by Provider

### GoDaddy Email (Workspace Email)
```env
EMAIL_HOST=smtp.secureserver.net
EMAIL_PORT=465
EMAIL_SECURE=true
```

### GoDaddy with Office 365
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### cPanel Hosting
```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=465
EMAIL_SECURE=true
```

### Gmail (for comparison)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
# OR use: EMAIL_SERVICE=gmail
```

---

## Troubleshooting

### Error: "Invalid login"
- ✅ Check email address is correct
- ✅ Check password is correct
- ✅ Make sure email account is active

### Error: "Connection timeout"
- ✅ Check SMTP server address
- ✅ Check port number
- ✅ Try alternate port (465 vs 587)
- ✅ Check if your hosting blocks outgoing SMTP

### Error: "Self-signed certificate"
- ✅ Already handled in code with `rejectUnauthorized: false`
- ✅ This is normal for some hosting providers

### Error: "Authentication failed"
- ✅ Some providers require "Allow less secure apps"
- ✅ Check if 2FA is enabled (may need app password)
- ✅ Contact your email provider

### Emails not arriving
- ✅ Check spam folder
- ✅ Verify RECIPIENT_EMAIL is correct
- ✅ Check server logs: `pm2 logs` or console output
- ✅ Try sending to different email address

---

## Testing Your Email Setup

### Test 1: Check Server Logs
When you start the server, you should see:
```
✅ Email server is ready to send messages
```

If you see an error, the configuration is wrong.

### Test 2: Submit Test Form
1. Go to your website
2. Fill out the beta interest form
3. Submit it
4. Check your email inbox (and spam folder)

### Test 3: Check Server Response
Look at the server console after submitting:
- Success: `✅ Admin notification sent for: [name]`
- Error: `❌ Error processing form submission: [error message]`

---

## Security Notes

### Keep .env File Private
- ✅ Never commit `.env` to Git (already in .gitignore)
- ✅ Never share your email password
- ✅ Use strong passwords

### For Production
- ✅ Use environment variables on your server
- ✅ Don't store passwords in plain text files
- ✅ Consider using email API services (SendGrid, Mailgun)

---

## Alternative: Use Email API Services

If SMTP is too complicated or not working, consider these services:

### SendGrid (Recommended)
- Free tier: 100 emails/day
- Easy setup
- Better deliverability
- https://sendgrid.com/

### Mailgun
- Free tier: 5,000 emails/month
- Simple API
- https://www.mailgun.com/

### AWS SES
- Very cheap
- Requires AWS account
- https://aws.amazon.com/ses/

These services provide better deliverability and are easier to set up than SMTP.

---

## Quick Reference

**Your .env file should look like this:**

```env
# Replace with YOUR actual values
EMAIL_HOST=smtp.secureserver.net
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=info@yourdomain.com
EMAIL_PASSWORD=YourActualPassword123
RECIPIENT_EMAIL=info@yourdomain.com
SEND_CONFIRMATION=true
PORT=3000
```

**Then:**
1. Save the file
2. Restart server: `npm start`
3. Test the form
4. Check your email!

---

## Need Help?

1. Check server console for error messages
2. Verify all settings are correct
3. Try alternate port (465 vs 587)
4. Contact your email provider for SMTP settings
5. Consider using an email API service instead

**Good luck! 🚀**
