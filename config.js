// Configuration file for environment variables
const config = {
    // Application Configuration
    appName: 'Empowering Farmers with AI',
    version: '1.0.0',
    
    // Server Configuration
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Database Configuration
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/farmers_ai_db',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    
    // JWT Configuration
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    
    // API Keys
    apiKeys: {
        mapbox: process.env.MAPBOX_API_KEY || 'your_mapbox_api_key',
        openai: process.env.OPENAI_API_KEY || 'your_openai_api_key'
    },
    
    // Email Configuration
    email: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        user: process.env.SMTP_USER || 'your_email@gmail.com',
        pass: process.env.SMTP_PASS || 'your_email_app_password'
    },
    
    // File Upload Configuration
    upload: {
        dir: process.env.UPLOAD_DIR || 'uploads',
        maxFileSize: process.env.MAX_FILE_SIZE || 5242880, // 5MB in bytes
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
    },
    
    // API URLs
    apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://empowering-farmers-ai-backend.onrender.com' 
        : `http://localhost:${process.env.PORT || 5000}`,
    
    // Frontend URLs
    frontendUrl: process.env.NODE_ENV === 'production'
        ? 'https://empowering-farmers-ai.netlify.app'
        : `http://localhost:${process.env.PORT || 5000}`
};

// Export the configuration
module.exports = config; 