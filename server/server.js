//Load Userland npm Modules
var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');
var morgan = require('morgan');
var cors = require('cors');
var helmet = require('helmet');



require('dotenv').load();


//Load Custom Libraries & Config 
var config = require('./config');
var util = require('./lib/util.js');


//Load Custom Routes
var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/users');
var messageRoutes = require('./routes/messages');
var bookingRoutes = require('./routes/bookings');

//Load Express Framework
var app = express();


//Configure Server Environment
var port = process.env.PORT || 3000;
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());





//Authentication Routes
app.use('/auth', authRoutes);


//API Routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/booking', bookingRoutes);


//Static Routes

//app.use('/', express.static('../client/landing'));
app.use('/', express.static('../client/slim/client')); //dev
app.use('/styles', express.static('../client/slim/client/styles')); //dev
//app.use('/', express.static('../client/slim/dist')); //dev


//app.use('/demo', express.static('../client/demo'));
//app.use('/views', express.static('../client/views'));

/*
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root:'../client/slim/client' });
});
*/

//Error Handling 
app.use(function(error, req, res, next){
   res.status(error.status || 500);
   res.json({error: error.message}); 
});


//Launch Server
app.listen(port, launchMsg);

function launchMsg(){
    console.log('AACU Server listening on port: ' + port);
}