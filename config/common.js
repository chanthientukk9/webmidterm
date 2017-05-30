var path = require('path');

// Global variables
//-----------------------------------------------
global.__PORT = 3000;
global.__BASE = path.join(__dirname, '..');
// global.__CONNECTIONSTRING = 'mongodb://localhost/web_midterm';
global.__CONNECTIONSTRING = 'mongodb://admin:12345@ds151461.mlab.com:51461/webmidterm';

// Production environment config
//-----------------------------------------------
if (process.env.NODE_ENV === 'production') {
    global.__PORT = process.env.PORT,
        global.__CONNECTIONSTRING = process.env.CONNECTIONSTRING
};