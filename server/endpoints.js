require('dotenv').config(); // read .env files
const client = require('redis').createClient(process.env.REDIS_URL);
const async = require('async');
const rand = require("random-key");

exports.saveNews = function(req, res) {
    const data = JSON.stringify(req.body);
    client.incr('id', function(err, id) {
        if (err) res.status(500).json({message: 'Algo falló. Volve a intentar!', class: 'failed'});
        client.set(id, data, function(err, reply) {
            if (err) res.status(500).json({message: 'Algo falló. Volve a intentar!', class: 'failed'});
            res.status(200).json({message: 'Subido con éxito!', class: 'success'});
        });
    });

};