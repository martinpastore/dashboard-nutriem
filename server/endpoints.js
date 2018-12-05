require('dotenv').config(); // read .env files
const { Client } = require('pg');

exports.saveNews = function(req, res) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });

    client.connect();

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, result) => {
        if (err) res.json(err);
        for (let row of res.rows) {
            res.json(JSON.stringify(row));
        }
        client.end();
    });
};