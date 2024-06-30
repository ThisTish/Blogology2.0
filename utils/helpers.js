const express = require('express')
const app = express()

// Logging middleware
const reqLog = (req, res, next) => {
console.log(`${new Date().toISOString()} - ${req.method} ${req.url} w/ ${req.body}`.magenta);
next();
}

const format_date = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric'}
    return date.toLocaleDateString('en-US', options).replace(/\//g,'.')
}


    
module.exports = {reqLog, format_date}