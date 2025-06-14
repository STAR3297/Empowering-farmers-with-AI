const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { loadEnv, validateEnv } = require('../utils/env');
const config = require('../config');

// Load environment variables
loadEnv();
validateEnv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Import routes
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmer');
const customerRoutes = require('./routes/customer');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/customers', customerRoutes);

// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/frontend/homepage.html'));
});

app.get('/farmer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/frontend/farmer.html'));
});

app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/frontend/customer.html'));
});

// MongoDB connection
mongoose.connect(config.database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        success: false,
        message,
        error: config.nodeEnv === 'development' ? err : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Empowering Farmers with AI server running in ${config.nodeEnv} mode on port ${PORT}`);
});