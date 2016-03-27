var express = require('express');
var User = require('../models/users');
var router = express.Router();

var util = require('../lib/util.js');

router.get('/listings', function(req, res, next) {
    User.filter({isSpecialist:true}).removePassword().run().then(function(users) {
        res.send(users);
    }).error(handleError(res));   
});

router.get('/', util.ensureAuthenticated, function(req, res, next){
    User.orderBy({index: "createdAt"}).viewData().run().then(function(result) {
        res.send(result);
    }).error(handleError(res));
});

router.get('/profile', util.ensureAuthenticated, function(req, res, next) {
    if(req.user){
        User.get(req.user).removePassword().run().then(function(user) {
            res.send(user);
        }).error(handleError(res));           
    }
});

router.get('/profile/:id', util.ensureAuthenticated, function(req, res, next) {
    if(req.params.id){
        User.get(req.params.id).removePassword().run().then(function(user) {
            
            res.send(user);
        }).error(handleError(res));           
    }
});

router.put('/:id/specialist', util.ensureAuthenticated, function(req, res, next){
   User.get(req.params.id).run().then(function(user){
       user.isSpecialist = !user.isSpecialist;
        user.save().then(function(result) {
            res.send({message: 'Listing Updated', result: result});
        }).error(handleError(res));
   }); 
});

router.put('/:id/admin', util.ensureAuthenticated, function(req, res, next){
   User.get(req.params.id).run().then(function(user){
       user.isAdmin = !user.isAdmin;
        user.save().then(function(result) {
            res.send({message: 'Listing Updated', result: result});
        }).error(handleError(res));
   }); 
});

router.put('/profile', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.user).run().then(function(user) {

       user.description = req.body.description;
       user.isSpecialist =  req.body.isSpecialist;
       user.international =  req.body.international;
       user.role =  req.body.role;
       
       if(req.body.media){
           user.media = [];
           req.body.media.forEach(function(media){
              user.media.push(media) 
           });
       }

       if(req.body.references){
           user.references = [];
           req.body.references.forEach(function(reference){
              user.references.push(reference); 
           });
       }
       
       if(req.body.specialties){
           user.specialties = [];
           req.body.specialties.forEach(function(specialty){
              user.specialties.push(specialty) 
           });
       }
       
       if(req.body.rates){
           user.rates = [];
           req.body.rates.forEach(function(rate){
              user.rates.push(rate) 
           });
       }
       
       if(req.body.locations){
            user.locations = [];
            req.body.locations.forEach(function(location){
                user.locations.push({ 
                    url: location.url,
                    place_id: location.place_id,
                    address: location.address,
                    loc: {
                        lat: location.loc.lat.toString(),
                        long: location.loc.long.toString()
                    }

                });
            });       
        }


       if(req.body.certifications){
           user.certifications = [];
           req.body.certifications.forEach(function(certification){
              user.certifications.push(certification) 
           });
       }

        user.save().then(function(result) {
            res.send(result);
        }).error(handleError(res));
    });
});

function handleError(res) {
    return function(error) {
        //return res.send(500, {error: error.message});
        return res.sendStatus(500).send({error: error.message});
    }
}


module.exports = router;


/*
router.get('/:id', function(req, res, next) {
    User.get(req.params.id).removePassword().run().then(function(user) {
        res.send(user);
    }).error(handleError(res));   
});
    
router.post('/',util.ensureAuthenticated, function(req, res, next) {
    var user = new User(req.body);
    user.save().then(function(result) {
        res.send(result);
    }).error(handleError(res));
});

router.put('/media', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.user).run().then(function(user) {
        user.media.push(req.body.url);
        
        user.save().then(function(result) {
            res.send(result);
        }).error(handleError(res));
    });
});

router.put('/certification', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.user).run().then(function(user) {
        user.certifications.push(req.body.certification);
        
        user.save().then(function(result) {
            res.send(result);
        }).error(handleError(res));
    });
});
    
router.put('/reference', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.user).run().then(function(profile) {
        
        
        profile.save().then(function(result) {
            res.send(result);
        }).error(handleError(res));
    });
});
*/


/*  
router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.params.id).update({
       email: req.body.email,
       displayName: req.body.displayName,
       description: req.body.description,
       isSpecialist: req.body.isSpecialist,
       international: req.body.international,
       picture: req.body.picture,
       facebook: req.body.facebook,
       google: req.body.google,
       isAdmin: req.body.isAdmin,
       isEnrolled: req.body.isEnrolled,
       role: req.body.role,
       media: req.body.media,
       references: req.body.references,
       specialties: req.body.specialties,
       rates: req.body.rates,
       certifications: req.body.certifications
    }).run().then(function(user) {
        res.send(user);
    }).error(handleError(res));

});


router.put('/:id/role/:role', util.ensureAuthenticated, function(req, res, next) {
    var newRole = req.params.role;
    var isAdmin = false;
    
    if(newRole === 'Admin'){
        isAdmin = true;
    }
    
    User.get(req.params.id).update({
       isAdmin: isAdmin,
       role: newRole,
    }).run().then(function(user) {
        res.sendStatus(200);
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    User.get(req.params.id).run().then(function(user) {
        user.delete().then(function(result) {
            res.sendStatus(200);
        }).error(handleError(res));
    }).error(handleError(res));    
});
*/

