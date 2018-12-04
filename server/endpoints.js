const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

exports.saveNews = function(req, res) {
    client.set('news', req.body, redis.print);
    client.get('news', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        res.json(result);
    });
    res.json();
};