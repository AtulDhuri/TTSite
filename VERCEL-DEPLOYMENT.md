# 🚀 Vercel Deployment Guide

## Your site is on Vercel but the API isn't working!

I've created the necessary files. Now follow these steps:

## Step 1: Add Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project (TTSite)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
EMAIL_HOST = smtpout.secureserver.net
EMAIL_PORT = 587
EMAIL_SECURE = false
EMAIL_USER = info@ticketmanager.in
EMAIL_PASSWORD = your-actual-password
RECIPIENT_EMAIL = info@ticketmanager.in
SEND_CONFIRMATION = true
```

## Step 2: Push Changes to GitHub

```bash
git add .
git commit -m "Add Vercel serverless function for email"
git push origin main
```

## Step 3: Vercel Will Auto-Deploy

Vercel will automatically detect the changes and redeploy.

## Step 4: Test Your Form

Go to https://ticketmanager.in and submit the form!

---

## Alternative: Use Gmail (Easier!)

If GoDaddy email still doesn't work, use Gmail:

**In Vercel Environment Variables:**
```
EMAIL_SERVICE = gmail
EMAIL_USER = youremail@gmail.com
EMAIL_PASSWORD = your-16-char-app-password
RECIPIENT_EMAIL = youremail@gmail.com
SEND_CONFIRMATION = true
```

Then redeploy!

---

## Troubleshooting

### Form still not working?

1. Check Vercel logs:
   - Go to your project → Deployments
   - Click latest deployment → Functions
   - Check logs for errors

2. Make sure environment variables are set

3. Try Gmail instead of GoDaddy SMTP

### Need help?

Contact me with the error from Vercel logs!
