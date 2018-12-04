const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

exports.saveNews = function(req, res) {
    client.set('news', req.body, redis.print);
    client.get('news', function (error, result) {
        if (error) {
            error = JSON.stringify(error);
            error = JSON.parse(error);
            res.json({error: error});
        }
        result = JSON.stringify(result);
        result = JSON.parse(result);
        res.json(result);
    });
};