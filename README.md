# TicketManager Marketing Website

A beautiful, SEO-optimized marketing website for TicketManager with email notification functionality.

## 📁 Project Structure

```
ticketmanager-website/
├── public/                 # Frontend files
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   └── script.js      # Client-side JavaScript
│   ├── assets/            # Images, icons, etc.
│   ├── index.html         # Main HTML file
│   ├── robots.txt         # SEO robots file
│   ├── sitemap.xml        # SEO sitemap
│   └── .htaccess          # Apache configuration
├── src/                   # Backend files
│   ├── config/
│   │   └── email.config.js      # Email configuration
│   ├── controllers/
│   │   └── formController.js    # Form handling logic
│   ├── routes/
│   │   └── api.routes.js        # API routes
│   └── utils/
│       ├── emailTemplates.js    # Email HTML templates
│       └── validation.js        # Input validation
├── .env                   # Environment variables (create this)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore file
├── package.json          # Node.js dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## Features

- 🎨 Modern, responsive design
- 📧 Email notifications for form submissions
- 🔒 Rate limiting to prevent spam
- 📊 SEO optimized with meta tags and structured data
- 🚀 Fast and lightweight
- ♿ Accessibility compliant

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your email credentials:

#### For Gmail:
- Go to https://myaccount.google.com/apppasswords
- Generate an App Password (you need 2-factor authentication enabled)
- Use your Gmail address and the generated App Password in `.env`

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
RECIPIENT_EMAIL=your-email@gmail.com
SEND_CONFIRMATION=true
```

#### For Other Email Services:
- Outlook: Use `outlook` as EMAIL_SERVICE
- Yahoo: Use `yahoo` as EMAIL_SERVICE
- Custom SMTP: Modify `server.js` to use custom SMTP settings

### 3. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## How It Works

1. Visitor fills out the beta interest form
2. Form data is sent to `/api/submit-interest` endpoint
3. Server validates the data
4. Email is sent to you with visitor information
5. Optional: Confirmation email sent to the visitor
6. Success message displayed to the visitor

## Email Notifications

You'll receive an email with:
- Visitor's name
- Email address
- Company name (if provided)
- Team size
- Additional message (if provided)
- Submission timestamp

## Security Features

- Rate limiting (5 requests per 15 minutes per IP)
- Input validation
- Email format validation
- CORS protection
- Environment variable protection

## SEO Features

- Meta tags for search engines
- Open Graph tags for social media
- Twitter Card tags
- Structured data (Schema.org)
- Sitemap.xml
- Robots.txt
- Semantic HTML
- Accessibility labels

## Deployment

For production deployment to a server, see the comprehensive [DEPLOYMENT.md](DEPLOYMENT.md) guide.

**Quick deployment options:**
- VPS (DigitalOcean, AWS, Linode) - Full control, recommended
- Heroku - Easy, free tier available
- Railway - Modern, simple
- Render - Free tier available

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions for each platform.

## Support

- Edit `styles.css` to change colors and design
- Modify `index.html` for content changes
- Update `server.js` to customize email templates
- Add more form fields as needed

## Support

For deployment help, see [DEPLOYMENT.md](DEPLOYMENT.md)

For project structure details, see [STRUCTURE.md](STRUCTURE.md)

## Customization

## License

MIT
