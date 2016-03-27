var thinky = require('../lib/rethink');
var User = require('./users');

var r = thinky.r;
var type = thinky.type;

var Booking = thinky.createModel('bookings', {
    id: type.string(),
    description: type.string(),
    completed: type.boolean(),
    bookingDate: type.date(),
    endDate: type.date(),
    createdAt: type.date().default(r.now()),
    authorId: type.string(),
    specialistID: type.string(),
    accepted: type.boolean(),
    secured: type.boolean(),
    amount: type.number(),
    transactions:[type.string()]
});


Booking.ensureIndex("createdAt");

module.exports = Booking;