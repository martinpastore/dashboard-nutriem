const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

exports.saveNews = function(req, res) {
    client.set('news', req.body, redis.print);
    client.get('news', function (error, result) {
        if (error) {
            res.json(JSON.parse(error));
        }
        res.json(JSON.parse(result));
    });
};