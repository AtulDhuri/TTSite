# 🚀 START HERE - Quick Setup Guide

## ⚠️ IMPORTANT: You MUST run the Node.js server!

This website requires a Node.js server to work. Simply opening `index.html` in your browser won't work because:
- The CSS/JS files need to be served by the server
- The form submission needs the backend API
- Static files are served from the `public/` folder

## 🎯 Quick Start (3 Steps)

### Step 1: Install Node.js
If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install the LTS (Long Term Support) version
- Verify installation: Open terminal and type `node --version`

### Step 2: Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

This will install all required packages (Express, Nodemailer, etc.)

### Step 3: Configure Email (Optional for testing)
```bash
copy .env.example .env
```

Edit `.env` file with your email settings (you can skip this for now to just see the design)

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   TicketManager Marketing Website         ║
╚════════════════════════════════════════════╝

🚀 Server running on: http://localhost:3000
```

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

**Now you'll see the beautiful design! 🎉**

---

## 🎨 To See the Design Without Email Setup

If you just want to see the design and don't care about email functionality yet:

1. Create a `.env` file with dummy values:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=test@gmail.com
EMAIL_PASSWORD=dummypassword
RECIPIENT_EMAIL=test@gmail.com
SEND_CONFIRMATION=false
PORT=3000
```

2. Run `npm start`

3. Visit `http://localhost:3000`

The site will load with full design. Form submission will fail, but you can see everything else!

---

## 🔧 Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/

### "Cannot find module 'express'"
- Dependencies not installed
- Run: `npm install`

### "Port 3000 is already in use"
- Another app is using port 3000
- Change port in `.env`: `PORT=3001`
- Or kill the process using port 3000

### "Email configuration error"
- Email settings in `.env` are wrong
- For testing, use dummy values (form won't work but design will show)
- For production, see DEPLOYMENT.md for proper email setup

### Page shows "Cannot GET /"
- Server is not running
- Run: `npm start`

### CSS not loading / No design
- Make sure you're accessing `http://localhost:3000` (not opening index.html directly)
- Check that server is running
- Check browser console for errors (F12)

---

## 📁 File Structure

```
Your Project/
├── public/              ← Frontend files (HTML, CSS, JS)
│   ├── css/styles.css  ← Your beautiful design!
│   ├── js/script.js    ← Client-side code
│   └── index.html      ← Main page
├── src/                 ← Backend files
├── server.js            ← Main server (runs on Node.js)
├── package.json         ← Dependencies list
└── .env                 ← Your configuration (create this!)
```

---

## ✅ Quick Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env` file created (even with dummy values)
- [ ] Server started (`npm start` running)
- [ ] Browser opened to `http://localhost:3000`
- [ ] Beautiful design visible! 🎉

---

## 🌐 For Production Deployment

Once you're ready to deploy to a real server, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **STRUCTURE.md** - Project structure details
- **README.md** - Full documentation

---

## 💡 Why This Setup?

**Q: Why can't I just open index.html?**
A: Because the paths use `/css/styles.css` which requires a web server to resolve correctly. Also, the form needs the Node.js backend to send emails.

**Q: Do I need to keep the terminal open?**
A: Yes, while developing. The server needs to run. For production, you'll use PM2 or similar (see DEPLOYMENT.md).

**Q: Can I use this without Node.js?**
A: Not with the current setup. You'd need to modify it significantly to work as static HTML only (and lose the email functionality).

---

## 🎉 You're All Set!

Once the server is running and you visit `http://localhost:3000`, you'll see:
- ✨ Beautiful gradient design
- 🎨 Smooth animations
- 📱 Responsive layout
- 🎯 Working navigation
- 📝 Functional form (if email is configured)

**Enjoy your beautiful TicketManager website!**
