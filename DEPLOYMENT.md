# 🚀 Deployment Guide - TicketManager Website

## Quick Start (Local Testing)

### 1. Install Node.js
Download and install Node.js from https://nodejs.org/ (LTS version recommended)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Email
```bash
copy .env.example .env
```
Edit `.env` file with your email credentials (see Email Setup section below)

### 4. Run the Server
```bash
npm start
```

Visit: `http://localhost:3000`

---

## 📧 Email Setup (Gmail Example)

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or Other)
3. Click "Generate"
4. Copy the 16-character password

### Step 3: Update .env File
```env
EMAIL_SERVICE=gmail
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=youremail@gmail.com
SEND_CONFIRMATION=true
PORT=3000
```

---

## 🌐 Production Deployment Options

## Option 1: VPS/Cloud Server (Recommended for Full Control)

### Platforms: DigitalOcean, AWS EC2, Linode, Vultr, etc.

### Step-by-Step:

#### 1. Upload Files to Server
```bash
# Using SCP
scp -r * user@your-server-ip:/var/www/ticketmanager/

# Or use FTP/SFTP client like FileZilla
```

#### 2. SSH into Server
```bash
ssh user@your-server-ip
cd /var/www/ticketmanager
```

#### 3. Install Node.js on Server
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### 4. Install Dependencies
```bash
npm install --production
```

#### 5. Configure Environment
```bash
nano .env
# Add your email credentials
# Press Ctrl+X, then Y, then Enter to save
```

#### 6. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

#### 7. Start Application with PM2
```bash
pm2 start server.js --name ticketmanager
pm2 save
pm2 startup
```

#### 8. Configure Nginx (Reverse Proxy)
```bash
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ticketmanager
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ticketmanager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. Setup SSL (HTTPS) with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 10. Configure Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### ✅ Your site is now live at https://yourdomain.com

---

## Option 2: Heroku (Easy, Free Tier Available)

### Step 1: Install Heroku CLI
Download from https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login and Create App
```bash
heroku login
heroku create ticketmanager-app
```

### Step 3: Set Environment Variables
```bash
heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=youremail@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set RECIPIENT_EMAIL=youremail@gmail.com
heroku config:set SEND_CONFIRMATION=true
```

### Step 4: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Step 5: Open Your Site
```bash
heroku open
```

---

## Option 3: Railway (Modern, Simple)

### Step 1: Visit https://railway.app
1. Sign up with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository

### Step 2: Add Environment Variables
In Railway dashboard:
- Go to Variables tab
- Add all variables from `.env.example`

### Step 3: Deploy
Railway automatically deploys your app!

---

## Option 4: Render (Free Tier Available)

### Step 1: Visit https://render.com
1. Sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

### Step 3: Add Environment Variables
Add all variables from `.env.example` in the Environment section

### Step 4: Deploy
Click "Create Web Service"

---

## Option 5: DigitalOcean App Platform

### Step 1: Visit https://cloud.digitalocean.com/apps
1. Click "Create App"
2. Connect GitHub repository

### Step 2: Configure
- Detected as Node.js automatically
- Add environment variables

### Step 3: Deploy
Click "Create Resources"

---

## 🔧 Server Management Commands

### PM2 Commands (for VPS)
```bash
# View running apps
pm2 list

# View logs
pm2 logs ticketmanager

# Restart app
pm2 restart ticketmanager

# Stop app
pm2 stop ticketmanager

# Delete app
pm2 delete ticketmanager

# Monitor
pm2 monit
```

### Check if Server is Running
```bash
# Check Node process
ps aux | grep node

# Check port 3000
netstat -tulpn | grep 3000

# Test locally
curl http://localhost:3000
```

---

## 🔍 Troubleshooting

### Site Not Loading?

1. **Check if server is running:**
   ```bash
   pm2 status
   ```

2. **Check logs:**
   ```bash
   pm2 logs ticketmanager
   ```

3. **Check Nginx:**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   ```

4. **Check firewall:**
   ```bash
   sudo ufw status
   ```

### Email Not Sending?

1. **Verify email config:**
   ```bash
   cat .env
   ```

2. **Check server logs:**
   ```bash
   pm2 logs ticketmanager
   ```

3. **Test email credentials:**
   - Make sure App Password is correct
   - Check if 2FA is enabled
   - Try sending a test email

### Port Already in Use?

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=3001
```

---

## 📊 Monitoring & Maintenance

### Setup Monitoring
```bash
# Install monitoring tools
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Regular Maintenance
```bash
# Update dependencies
npm update

# Restart app
pm2 restart ticketmanager

# Clear logs
pm2 flush
```

---

## 🎯 Recommended Setup for Production

**Best Choice:** VPS with Nginx + PM2 + SSL

**Why?**
- ✅ Full control
- ✅ Better performance
- ✅ Custom domain support
- ✅ SSL/HTTPS included
- ✅ Professional setup

**Cost:** $5-10/month (DigitalOcean, Linode, Vultr)

---

## 📞 Need Help?

Common issues and solutions are in the troubleshooting section above.

For more help:
1. Check server logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Test API: `curl http://localhost:3000/api/health`

---

## ✅ Deployment Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured with email credentials
- [ ] Server running (`npm start` or `pm2 start`)
- [ ] Nginx configured (if using VPS)
- [ ] SSL certificate installed (HTTPS)
- [ ] Firewall configured
- [ ] Domain pointed to server IP
- [ ] Email sending tested
- [ ] Form submission tested

**Your site is ready! 🎉**
