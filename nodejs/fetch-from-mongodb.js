var mongodb = require('./lib/mongodb');
var memcached = require('memcached');
var querystring = require('querystring');
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.time('QueryStart');
    var path = url.parse(req.url).pathname;
    if( path=='get_user_by_deviceid' ){
    }
    var str = url.parse(req.url).query;
    var params = querystring.parse(str);
    var deviceid = params['deviceid'];
    if( !deviceid || deviceid===undefined ){
        res.end('Parameter Error');
    } else {
        var user = false;
        memcache = new memcached("127.0.0.1:11211");
        memcache.get(deviceid, function(err, result){
            if(err) console.error(err);
            //console.log('Get Memcache: ' + result);
            result = false;
            if( result ){
                user = result;
                res.end(user);
                memcache.end();
            } else {
                MongoClient.connect('mongodb://10.81.51.235:8000/user', function(err, db){
                    if(err) console.error(err);
                    var collection = db.collection('dev');
                    //var cursor = collection.find({"deviceid":deviceid}).limit(1);
                    collection.findOne({"deviceid":deviceid}, function(err,cursor){
                        console.log(cursor);
                    });
                    //console.log(JSON.stringify(ret));
                    console.timeEnd('QueryStart');
                    res.end();
                    /**
                    cursor.each(function(err, doc) {
                        if(doc){
                            console.log('Query From MongoDB');
                            user = JSON.stringify(doc);
                            memcache.set(deviceid,user,7200,function(err,result){
                                if(err) console.error(err);
                                //console.dir("save to cache: "+result);
                                res.end(user);
                                memcache.end();
                            });
                        }
                    });
                    */
                });
            }
        });
    }
}).listen(8081, "10.46.188.55");
