var thinky = require('../lib/rethink');
var User = require('./users');

var r = thinky.r;
var type = thinky.type;

var Message = thinky.createModel('messages', {
    id: type.string(),
    title: type.string(),
    body: type.string(),
    read: type.boolean(),
    createdAt: type.date().default(r.now()),
    authorId: type.string(),
    recepientId: type.string()
});


Message.ensureIndex("createdAt");

module.exports = Message;