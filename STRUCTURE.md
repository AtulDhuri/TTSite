# 📁 Project Structure Guide

## Overview

This project follows a clean, organized structure separating frontend and backend concerns.

```
ticketmanager-website/
│
├── 📂 public/                      # Frontend (Client-side)
│   ├── 📂 css/
│   │   └── styles.css             # All styling
│   ├── 📂 js/
│   │   └── script.js              # Client-side JavaScript
│   ├── 📂 assets/                 # Images, icons, fonts
│   ├── index.html                 # Main HTML page
│   ├── robots.txt                 # SEO - Search engine rules
│   ├── sitemap.xml                # SEO - Site structure
│   └── .htaccess                  # Apache server config
│
├── 📂 src/                         # Backend (Server-side)
│   ├── 📂 config/
│   │   └── email.config.js        # Email setup & verification
│   ├── 📂 controllers/
│   │   └── formController.js      # Form submission logic
│   ├── 📂 routes/
│   │   └── api.routes.js          # API endpoints
│   └── 📂 utils/
│       ├── emailTemplates.js      # HTML email templates
│       └── validation.js          # Input validation & sanitization
│
├── 📄 server.js                    # Main server entry point
├── 📄 package.json                 # Dependencies & scripts
├── 📄 .env                         # Environment variables (YOU CREATE THIS)
├── 📄 .env.example                 # Environment template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Setup instructions
└── 📄 STRUCTURE.md                 # This file
```

## 📂 Directory Breakdown

### `/public` - Frontend Files
All files that are served directly to the browser.

- **css/** - Stylesheets
- **js/** - Client-side JavaScript
- **assets/** - Static assets (images, icons, fonts)
- **index.html** - Main landing page
- **robots.txt** - Tells search engines what to crawl
- **sitemap.xml** - Helps search engines index your site
- **.htaccess** - Apache server configuration (caching, redirects)

### `/src` - Backend Files
Server-side code organized by responsibility.

#### `/src/config`
Configuration files for external services.
- **email.config.js** - Nodemailer setup and verification

#### `/src/controllers`
Business logic for handling requests.
- **formController.js** - Processes form submissions, sends emails

#### `/src/routes`
API endpoint definitions.
- **api.routes.js** - Defines all API routes and rate limiting

#### `/src/utils`
Reusable utility functions.
- **validation.js** - Validates and sanitizes user input
- **emailTemplates.js** - HTML templates for emails

## 🔄 Request Flow

```
User fills form → 
  public/index.html → 
    public/js/script.js (sends POST request) → 
      server.js (receives request) → 
        src/routes/api.routes.js (routes to controller) → 
          src/controllers/formController.js (processes) → 
            src/utils/validation.js (validates data) → 
              src/config/email.config.js (sends email) → 
                src/utils/emailTemplates.js (formats email) → 
                  Response sent back to user
```

## 🎯 Benefits of This Structure

✅ **Separation of Concerns** - Frontend and backend are clearly separated
✅ **Maintainability** - Easy to find and update specific functionality
✅ **Scalability** - Simple to add new features in the right place
✅ **Testability** - Each module can be tested independently
✅ **Professional** - Industry-standard organization

## 📝 Where to Add New Features

| Feature Type | Location |
|-------------|----------|
| New page | `public/` |
| New styles | `public/css/` |
| New client script | `public/js/` |
| New API endpoint | `src/routes/api.routes.js` |
| New business logic | `src/controllers/` |
| New utility function | `src/utils/` |
| New configuration | `src/config/` |

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   copy .env.example .env
   # Edit .env with your email credentials
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

4. **Visit:**
   ```
   http://localhost:3000
   ```

That's it! Your organized, professional website is ready to go! 🎉
