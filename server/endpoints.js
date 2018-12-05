require('dotenv').config(); // read .env files
const client = require('redis').createClient(process.env.REDIS_URL);
const async = require('async');

exports.saveNews = function(req, res) {
    client.set(`key${Math.random(0, 1000)}`, 'bla');
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
                client.get(key, function (error, value) {
                    if (error) return cb(error);
                    cb(null, value)
                });
            }, function (error, results) {
                if (error) return console.log(error);
                console.log(results);
                res.json({data:results});
            });
        }
    });
};