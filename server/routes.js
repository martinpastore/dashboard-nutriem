const express = require('express');
const endpoints = require('./endpoints');
const router = express.Router();

router.post('/news', endpoints.saveNews);

module.exports = router;
