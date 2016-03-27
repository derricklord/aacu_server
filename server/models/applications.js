var thinky = require('../lib/rethink');
var User = require('./users');

var r = thinky.r;
var type = thinky.type;

var Application = thinky.createModel('applications', {
    id: type.string(),
    students:[{
        firstName: type.string(),
        middleName: type.string(),
        lastName: type.string(),
        dob: type.date(),
        lineage: type.string(),
        gender: type.string(),
        age: type.number(),
        studentNo: type.string(),
        gradeLevel: type.number(),
        nextGradeLevel: type.number(),
        lastGradeLevel: type.number(),
        preschoolExperience: type.boolean(),
        priorSchool: type.string(),
        priorSchoolAttended: type.date(),
        priorSchoolAddress: type.string(),
        homeSchooled: type.boolean(),
        homeSchooledIntentFiled: type.string(),
        countryOfBirth: type.string(),
        usCitizen: type.boolean(),
        firstLanguage: type.string(),
        spokenLanguage: type.string(),
        hispanic: type.boolean(),
        primaryEthnicity: type.string(),      
    }],
    guardians:[{
       firstName: type.string(),
       lastName: type.string(),
       relationship: type.number(),
       dayTimePhone: type.string(),
       homePhone: type.string(),
       email: type.string(),
       employer: type.string(),
       military: type.boolean(),
       militaryStatus: type.string() 
    }],    
    locations:[{
        address: type.string(),
        loc:{
            lat: type.string(),
            long: type.string()
        },  
        island: type.string()        
    }],
    emergencyContacts: [{
       name: type.string(),
       phone: type.string(),
       relationship: type.string() 
    }],
    accepted: type.boolean(),
    enrolled: type.boolean(),
    createdAt: type.date().default(r.now()),
    modifedAt: type.date(),
    authorId: type.string(),    
});


Application.ensureIndex("createdAt");

module.exports = Application;