var mongoose = require('mongoose');

// Config Mongoose
//-----------------------------------------------
mongoose.Promise = global.Promise;

// Open a connection to the database
//-----------------------------------------------
mongoose.connect(__CONNECTIONSTRING);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${__CONNECTIONSTRING}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

// Close connection
//-----------------------------------------------
var mongoShutdown = function(message, callback) {
    mongoose.connection.close(function() {
        console.log(`Mongoose disconnected through ${message}`);
        callback();
    });
};

// Nodemon
process.once('SIGUSR2', () => {
    mongoShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// App termination
process.once('SIGINT', () => {
    mongoShutdown('app termination', () => {
        process.exit(0);
    });
});

// Heroku termination
process.once('SIGTERM', () => {
    mongoShutdown('Heroku termination', () => {
        process.exit(0);
    });
});

// Database models
//-----------------------------------------------
require('./product');
require('./member');