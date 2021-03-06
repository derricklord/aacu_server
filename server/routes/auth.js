var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var path = require('path');
var qs = require('querystring');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var moment = require('moment');

var config = require('../config');
var util = require('../lib/util.js');
var User = require('../models/users');


var router = express.Router();


router.get('/test', util.ensureAuthenticated, function(req, res){
    console.log(req.user);
    res.send({user: req.user});
});

router.post('/test', util.ensureAuthenticated, function(req, res){
    console.log(req.user);
   User.filter({email: req.body.email}).run().then(function(results){
       if(results.length>0){
           res.send(results);
       }else{
           res.send({message: 'No records found'});
       }
   }) 
});


//Login with Email & Password
router.post('/login', function(req, res){
  User.filter({ email: req.body.email }).run().then(function(results) {
    console.log(results);
    
    var user = results[0];   
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }


    User.comparePassword(req.body.password, user, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      res.send({ token: util.createToken(user)});
    });

  });
});


//Signup with Email & Password
router.post('/signup', function(req, res){
  User.filter({ email: req.body.email }).run().then(function(existingUser) {    
    var user = existingUser[0];
    if (user) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    
    var newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        role: 'User',
        isAdmin: false,
        isEnrolled: false,
        isSpecialist: false,
        international: false,
        description: '',                                
        google: '',
        password: req.body.password,
        media: [],
        rates: [],
        specialties: [],
        certifications: [],
        references: [],
        locations: []                                              
    });

    newUser.save(function() {
      res.send({ token: util.createToken(newUser)});
    });
  });
});


//Authenticate with Google
router.post('/google', function(req, res){
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };
    
    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
        if (req.headers.authorization) {
                    //Step 3a. Looking for existing google user...
                    console.log(profile);
                    User.filter({ google: profile.sub }).run().then( function( existingUser) { 
                        var user = existingUser[0]; 
                        
                        if (user) {
                            var token = req.headers.authorization.split(' ')[1];
                            var payload = jwt.decode(token, config.TOKEN_SECRET);

                            if(payload.sub !== user.id){
                                return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                            }
                        }
                        //var token = req.headers.authorization.split(' ')[1];
                        //var payload = jwt.decode(token, config.TOKEN_SECRET);

                        User.get(payload.sub).then(function(user) {    
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }

                            var newUser = new User({
                                displayName: profile.name,
                                email: profile.email,
                                picture: profile.picture.replace('sz=50', 'sz=200'),
                                role: 'User',
                                isAdmin: false,
                                isEnrolled: false,
                                isSpecialist: false,
                                international: false,
                                description: '',                                
                                google: profile.sub,
                                password:'password',
                                media: [],
                                rates: [],
                                specialties: [],
                                certifications: [],
                                references: [],
                                locations: []                                              
                            });
                            
                            if(profile.hd === 'ethompson.org'){
                                newUser.isEnrolled = true;
                            }
                            

                            if(profile.email === 'derrick.lord@gmail.com'){
                                newUser.isAdmin = true;
                                newUser.isSpecialist = true;
                                newUser.role='Admin';
                            }


                            if(profile.email === 'admin@aacuniverse.com'){
                                newUser.isAdmin = true;
                                newUser.isSpecialist = true;
                                newUser.role='Admin';
                            }                            
                            
                            newUser.save(function() {
                                var token = util.createToken(newUser);
                                res.send({ token: token });
                            });
                        });
                    });
        }else{
                // Step 3b. Create a new user account or return an existing one.
                //Step 3b. Looking for existing google user...

                User.filter({ email: profile.email }).run().then( function( existingUser) { 
                    
                    var user = existingUser[0];

                    if (user) {
                        return res.send({ token: util.createToken(user)});
                    }              

                    //Creating new user...
                    var newUser = new User({
                        displayName: profile.name,
                        email: profile.email,
                        picture: profile.picture.replace('sz=50', 'sz=200'),
                        role: 'User',
                        isAdmin: false,
                        isEnrolled: false,
                        isSpecialist: false,
                        international: false,
                        description: '',
                        google: profile.sub,
                        password:'password',
                        media: [],
                        rates: [],
                        specialties: [],
                        certifications: [],
                        references: [],
                        locations: []                                       
                    });

                    
                    if(profile.hd == 'ethompson.org'){
                        newUser.isEnrolled = true;
                    } 
                           

                    if(profile.email === 'dlord@ethompson.org'){
                        newUser.isAdmin = true;
                        newUser.role = 'Admin';
                    }

                    if(profile.email === 'derrick.lord@gmail.com'){
                        newUser.isAdmin = true;
                        newUser.role='Admin';
                    }
                            
                    
                    newUser.save(function(err) {
                        var token = util.createToken(newUser);
                        res.send({ token: token}); 
                    });
                    
                });           
        }
     });
  });
});

router.get('/unlink/:provider', util.ensureAuthenticated, function(req, res){
  var provider = req.params.provider;

  User.get(req.user).then(function( user) {     
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user[provider] = undefined;
    user.save(function() {
      res.status(200).end();
    });
  });
});


module.exports = router;