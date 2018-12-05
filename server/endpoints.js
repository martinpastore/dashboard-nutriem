require('dotenv').config(); // read .env files
const client = require('redis').createClient(process.env.REDIS_URL);
const async = require('async');
const rand = require("random-key");

exports.saveNews = function(req, res) {
    let data = JSON.stringify(req.body);
    client.set(rand.generate(), data);
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
                res.json({data:results});
            });
        }
    });
};