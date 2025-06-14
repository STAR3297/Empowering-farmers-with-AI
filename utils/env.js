const fs = require('fs');
const path = require('path');

// Function to load environment variables from .env file
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        
        // Check if .env file exists
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf-8')
                .split('\n')
                .filter(line => line && !line.startsWith('#'))
                .reduce((acc, line) => {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        acc[key.trim()] = value.trim();
                    }
                    return acc;
                }, {});

            // Set environment variables
            Object.entries(envConfig).forEach(([key, value]) => {
                process.env[key] = value;
            });

            console.log('Environment variables loaded successfully');
        } else {
            console.warn('.env file not found. Using default configuration.');
        }
    } catch (error) {
        console.error('Error loading environment variables:', error);
        process.exit(1);
    }
}

// Function to validate required environment variables
function validateEnv() {
    const required = [
        'DB_HOST',
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD',
        'JWT_SECRET'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing.join(', '));
        process.exit(1);
    }
}

module.exports = {
    loadEnv,
    validateEnv
}; 