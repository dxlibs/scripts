var MongoClient = require('mongodb');
var servers = [
    //敏感信息已经删除
];
var db = 'db';
var collection = 'coll';

exports.init = function(){
    var length = servers.length;
    var server = servers[Math.floor(Math.random()*length)];
    MongoClient.connect(server, function(err, db){
        if(err) console.error(err);
        var collection = db.collection(collection);
        return collection;
    });
}

exports.findOne = function(query,callback){
    var length = servers.length;
    var server = servers[Math.floor(Math.random()*length)];
    MongoClient.connect(server, function(err, db){
        if(err) console.error(err);
        var collection = db.collection(collection);
        collection.findOne(query,function(err,cursor){
            callback(cursor);
        });
    });
}

//test
var db = require('./lib/mongodb');
db.findOne({"deviceid":"test"},function(results){
    console.log(results);
});
