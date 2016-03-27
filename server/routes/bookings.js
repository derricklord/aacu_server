var express = require('express');
var Booking = require('../models/bookings');
var User = require('../models/users');
var router = express.Router();

var thinky = require('../lib/rethink');

var r = thinky.r;
var type = thinky.type;

var util = require('../lib/util.js');



router.get('/', util.ensureAuthenticated, function(req, res, next){
    Booking.orderBy({index: r.desc('createdAt')}).getJoin({author: true}).filter({specialistId:req.user}).run().then(function(bookings){
        bookings.forEach(function(booking){
             if(booking.author){
                 delete booking.author.password;
                 delete booking.author.role;
                 delete booking.author.google;
                 delete booking.author.isAdmin;
                 delete booking.author.isEnrolled;
                 delete booking.author.isSpecialist;
                 delete booking.author.locations;
                 delete booking.author.references;
                 delete booking.author.specialties;
                 delete booking.author.rates;
                 delete booking.author.international;
                 delete booking.author.email;
                 delete booking.author.certifications;
                 delete booking.author.media;
             }
        })
        res.json(bookings);
    }).error(handleError(res));
});

router.get('/requests', util.ensureAuthenticated, function(req, res, next){
    Booking.orderBy({index: r.desc('createdAt')}).getJoin({specialist: true}).filter({authorId:req.user}).run().then(function(bookings){
        bookings.forEach(function(booking){
             if(booking.specialist){
                 delete booking.specialist.password;
                 delete booking.specialist.role;
                 delete booking.specialist.google;
                 delete booking.specialist.isAdmin;
                 delete booking.specialist.isEnrolled;
                 delete booking.specialist.isSpecialist;
                 delete booking.specialist.locations;
                 delete booking.specialist.references;
                 delete booking.specialist.specialties;
                 delete booking.specialist.rates;
                 delete booking.specialist.international;
                 delete booking.specialist.email;
                 delete booking.specialist.certifications;
                 delete booking.specialist.media;
             }
        })
        res.json(bookings);
    }).error(handleError(res));
});
  
router.post('/', util.ensureAuthenticated, function(req, res, next) {
    var newBooking = new Booking(req.body);
    
    newBooking.authorId = req.user; 
    newBooking.amount = 0;
    newBooking.accepted = false;
    newBooking.secured = false;
    newBooking.save().then(function(result) {
        res.json({
            result: result
        });
    }).error(handleError(res));
});

router.get('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Booking.orderBy({index: r.desc('createdAt')}).getJoin({author: true}).filter({specialistId:id}).run().then(function(bookings){
        bookings.forEach(function(booking){
             if(booking.author){
                 delete booking.author.password;
                 delete booking.author.role;
                 delete booking.author.google;
                 delete booking.author.isAdmin;
                 delete booking.author.isEnrolled;
                 delete booking.author.isSpecialist;
                 delete booking.author.references;
                 delete booking.author.email;
             }
        })
        res.json(bookings);
    }).error(handleError(res));
    
    /*
    Booking.get(id).getJoin({author: true}).run().then(function(booking) {     
        res.json(booking);
    }).error(handleError(res));
    */
});

router.get('/1/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;

    Booking.get(id).getJoin({author: true}).run().then(function(booking) {     
        res.json(booking);
    }).error(handleError(res));

});


router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    Booking.get(req.body.id).run().then(function(booking) {
        booking.description = req.body.description;
        booking.completed = req.body.completed;
        booking.authorId = req.body.authorId;
        booking.specialistId = req.body.specialistId;
        booking.bookingDate = req.body.bookingDate;
        booking.amount = req.body.amount;
        booking.accepted = req.body.accepted;
        
        booking.save().then(function(booking) {
            res.json({
                booking: booking
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Booking.get(id).run().then(function(booking) {
        booking.delete().then(function(result) {
            res.sendStatus(200);
        }).error(handleError(res));
    }).error(handleError(res));    
});


function handleError(res) {
    return function(error) {
        return res.send(500, {error: error.booking});
    }
}


module.exports = router;