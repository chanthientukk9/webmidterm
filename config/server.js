var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var app = express();
var admin = require("firebase-admin");

var serviceAccount = require('../booking-car-f3860-firebase-adminsdk-kwk0t-4f9c4b52ef.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://booking-car-f3860.firebaseio.com"
});

// Common config
//-------------------------------------------------
require(path.join('..', 'config/common'));

// Config Models
//-------------------------------------------------
require(__BASE + '/apis/models/database');

// Config standard middlewares
//-------------------------------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Config routes
//-------------------------------------------------
var routeApi = require(__BASE + '/apis/routes');

app.use('/api', routeApi);

// Serve client files
//-------------------------------------------------
app.use(express.static(__BASE + '/public/build'));
app.use('/bower_components', express.static(__BASE + '/bower_components'));
app.use('/images', express.static(__BASE + '/public/images'));
app.use('/plugins', express.static(__BASE + '/public/plugins'));

// For route with AngularJs route
app.get('/', (req, res) => {
    res.redirect('index.html');
})

app.get('/product/*', (req, res) => {
    res.sendFile(path.join(__BASE, '/public/build/app/layout/layout.html'));
})

app.get('/booking/*', (req, res) => {
    res.sendFile(path.join(__BASE, '/public/build/app/layout/booking.html'));
})

app.get('/auth/*', (req, res) => {
    res.sendFile(path.join(__BASE, '/public/build/app/authentication/auth.html'));
})

// Exports
//-------------------------------------------------
module.exports = app;