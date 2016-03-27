var express = require('express');
var Message = require('../models/messages');
var User = require('../models/users');
var router = express.Router();

var thinky = require('../lib/rethink');

var r = thinky.r;
var type = thinky.type;

var util = require('../lib/util.js');


router.get('/', util.ensureAuthenticated, function(req, res, next){
    Message.orderBy({index: r.desc('createdAt')}).getJoin({author: true}).run().then(function(messages){
        var allMessages = [];
        
        
        messages.forEach(function(message){
             if(message.author){
                 delete message.author.password;
                 delete message.author.role;
                 delete message.author.google;
                 delete message.author.isAdmin;
                 delete message.author.isEnrolled;
                 delete message.author.isSpecialist;
                 delete message.author.locations;
                 delete message.author.references;
                 delete message.author.specialties;
                 delete message.author.rates;
                 delete message.author.international;
                 delete message.author.email;
                 delete message.author.certifications;
                 delete message.author.media;
             }
             if(message.author.id === req.user || message.recepientId === req.user){
                 allMessages.push(message);
             }
        })
        res.json(allMessages);
    }).error(handleError(res));
});

router.post('/', util.ensureAuthenticated, function(req, res, next) {
    console.log(req.body);
    var newMessage = new Message(req.body);
    newMessage.authorId = req.user; 
    newMessage.save().then(function(result) {
        res.json({
            result: result
        });
    }).error(handleError(res));
});
    
router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    Message.get(req.body.id).run().then(function(message) {
        message.title = req.body.title;
        message.body = req.body.body;
        message.authorId = req.user;
        message.recepientId = req.body.recepientId;
        message.read = false;
        message.save().then(function(page) {
            res.json({
                page: page
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Message.get(id).run().then(function(message) {
        message.delete().then(function(result) {
            res.sendStatus(200);
        }).error(handleError(res));
    }).error(handleError(res));    
});


function handleError(res) {
    return function(error) {
        return res.send(500, {error: error.message});
    }
}


module.exports = router;