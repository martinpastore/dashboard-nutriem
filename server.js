require('dotenv').config(); // read .env files
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3009;

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// Set public folder as root
app.use(express.static('dist'));

app.use(bodyParser.json());

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

//app.use('/', router);

// Listen for HTTP requests on port 3000
app.listen(port, () => {
    console.log('listening on %d', port);
});
