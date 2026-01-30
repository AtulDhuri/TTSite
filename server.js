const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./src/routes/api.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   TicketManager Marketing Website         ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log(`\n🚀 Server running on: http://localhost:${PORT}`);
    console.log(`\n✨ Open your browser and visit:`);
    console.log(`   👉 http://localhost:${PORT}\n`);
    
    // Email status
    if (process.env.EMAIL_HOST || process.env.EMAIL_SERVICE) {
        console.log(`📧 Email: Configured`);
    } else {
        console.log(`📧 Email: Not configured (website will still work!)`);
        console.log(`💡 To enable email: See EMAIL-SETUP-GUIDE.md`);
    }
    console.log('');
});
