const express = require('express');
const app = express();

// Logging middleware
const reqLog = (req, res, next) => {
console.log(`${new Date().toISOString()} - ${req.method} ${req.url} w/ ${req.body}`.magenta);
next();
}

const format_date = (date) => {
    return date.toLocaleDateString()

}

    
module.exports = {reqLog, format_date}