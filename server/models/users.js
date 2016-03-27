
var thinky = require('../lib/rethink');
var auth = require('../lib/auth');
var bcrypt = require('bcrypt');

var r = thinky.r;
var type = thinky.type;

var Booking = require('./bookings');
var Message = require('./messages');
//var Application = require('./applications');

var User = thinky.createModel('users', {
    id: type.string(),
    email: type.string().email().lowercase(),
    password: type.string(),
    displayName: type.string(),
    picture: type.string(),
    facebook: type.string(),
    google: type.string(),
    isAdmin: type.boolean(),
    isSpecialist: type.boolean(),
    international: type.boolean(),
    role: type.string(), 
    description: type.string(),
    media: [type.string()],
    references: [{
        name: type.string(),
        address: type.string(),
        phone: type.string(),
        email: type.string()
    }],
    rates:[{
        rateType: type.string(), //Hourly, Routine, Group, Private
        rateAmt:  type.number()
    }],
    locations: [{
            url: type.string(),
            place_id: type.string(),
            address: type.string(),
            loc:{
                lat: type.string(),
                long: type.string()
            }  
    }],   
    specialties: [type.string()],
    certifications: [type.string()],
    roleVerified: type.boolean(),
    createdAt: type.date().default(r.now())
});




User.pre('save', function(next) {

  var self = this;

  bcrypt.genSalt(10, function (err, salt) {

    if(err) return next(err);
    bcrypt.hash(self.password, salt, function (err, hash) {

      if(err) return next(err);
      self.password = hash;
      next();

    });
  });
});


User.comparePassword = function(password, user, callback) {
  console.log(password);
  console.log(user.password);

  bcrypt.compare(password, user.password, function(err, match) {

    if (err) callback(err);

    if (match) {
      callback(null, true);
    } else {
      callback(err);
    }
  });
}

User.defineStatic('removePassword', function(){
   return this.without('password'); 
});

User.defineStatic('removeRole', function(){
   return this.without('role'); 
});

User.defineStatic('viewData', function(){
    return this.without('role', 'password');
});


User.ensureIndex("createdAt");
User.ensureIndex("displayName");

User.hasMany(Booking, "posts", "id", "authorId");
User.hasMany(Message, "messages", "id", "authorId");
//User.hasMany(Application, "applications", "id", "authorId");


Booking.belongsTo( User, 'author', 'authorId', 'id');
Booking.belongsTo( User, 'specialist', 'specialistId', 'id');
Message.belongsTo( User, 'author', 'authorId', 'id');
//Application.belongsTo( User, 'author', 'authorId', 'id');

module.exports = User;

