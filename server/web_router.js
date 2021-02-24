const express = require('express');
const path = require('path');

var router = express.Router();

router.get('/favicon.png', function(req, res, next){
  res.sendFile(path.resolve('./dist', 'favicon.png'));
});

router.get('/', function(req, res, next){
  res.sendFile(path.resolve('./dist', 'index.html'));
});

module.exports = router;