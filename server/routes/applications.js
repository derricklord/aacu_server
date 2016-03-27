var express = require('express');
var Application = require('../models/applications');
var User = require('../models/users');
var router = express.Router();

var thinky = require('../lib/rethink');

var r = thinky.r;
var type = thinky.type;

var util = require('../lib/util.js');



router.get('/', util.ensureAuthenticated, function(req, res, next){
    Application.orderBy({index: r.desc('createdAt')}).getJoin({author: true}).run().then(function(applications) {
        res.json(applications);
    }).error(handleError(res));
});


router.get('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Application.get(id).getJoin({author: true}).run().then(function(application) {
        delete application.author.password;
        delete application.author.role;       
        res.json(application);
    }).error(handleError(res));
});
    
router.post('/', util.ensureAuthenticated, function(req, res, next) {
    var newApplication = new Application(req.body);
    
    newApplication.authorId = req.user; 
    newApplication.save().then(function(result) {
        res.json({
            result: result
        });
    }).error(handleError(res));
});
    
router.put('/:id', util.ensureAuthenticated, function(req, res, next) {
    Application.get(req.body.id).run().then(function(application) {
        application.id = req.body.id;
        application.accepted = req.body.accepted;
        application.enrolled = req.body.enrolled;
        application.guardians = req.body.guardians;
        application.students = req.body.students;
        application.locations = req.body.locations;
        application.modifiedAt = new Date();
        application.authorId = req.user;
        
        application.save().then(function(application) {
            res.json({
                application: application
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.put('/:id/student', util.ensureAuthenticated, function(req, res, next) {
    Application.get(req.body.id).run().then(function(application) {
        application.students.push(req.body.student);
        application.modifiedAt = new Date();
        application.authorId = req.user;
        
        application.save().then(function(application) {
            res.json({
                application: application
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.put('/:id/guardian', util.ensureAuthenticated, function(req, res, next) {
    Application.get(req.body.id).run().then(function(application) {
        application.guardians.push(req.body.guardian);
        application.modifiedAt = new Date();
        application.authorId = req.user;
        
        application.save().then(function(application) {
            res.json({
                application: application
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.put('/:id/location', util.ensureAuthenticated, function(req, res, next) {
    Application.get(req.body.id).run().then(function(application) {
        application.locations.push(req.body.location);
        application.modifiedAt = new Date();
        application.authorId = req.user;
        
        application.save().then(function(application) {
            res.json({
                application: application
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.put('/:id/contact', util.ensureAuthenticated, function(req, res, next) {
    Application.get(req.body.id).run().then(function(application) {
        application.emergencyContacts.push(req.body.contact);
        application.modifiedAt = new Date();
        application.authorId = req.user;
        
        application.save().then(function(application) {
            res.json({
                application: application
            });
        }).error(handleError(res));
    }).error(handleError(res));

});

router.delete('/:id', util.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    Application.get(id).run().then(function(application) {
        application.delete().then(function(result) {
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