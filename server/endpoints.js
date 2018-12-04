const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

exports.saveNews = function(req, res) {
    const val = JSON.stringify(req.body);
    client.set('news', val, redis.print);
    client.get('news', function (error, result) {
        if (error) {
            res.json(error);
        }
        res.json(result);
    });
};