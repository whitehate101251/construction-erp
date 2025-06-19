const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create log file with current date
const getLogFileName = () => {
    const date = new Date();
    return `error-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.log`;
};

// Format error message
const formatError = (err) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${err.status || 'ERROR'} - ${err.message}\n`;
};

// Log error to file
const logError = (err) => {
    const logFile = path.join(logsDir, getLogFileName());
    const errorMessage = formatError(err);

    fs.appendFile(logFile, errorMessage, (error) => {
        if (error) {
            console.error('Error writing to log file:', error);
        }
    });
};

module.exports = logError; 