const express = require('express');
const eventproxy = require('eventproxy');
const fileRead = require('../../../utils/file').fileRead;

function getProvince(req, res, next){
  const ep = eventproxy.create('province', function(result){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
  ep.fail(next);
  fileRead('../data_proxy/static/province.json', function (jsonData) {
    if (Object.keys(jsonData).length > 0) {
      ep.emit('province', jsonData);
    } else {
      ep.throw('No Province');
    }
  });
}
function getCity(req, res, next) {
  const params = req.params;
  const ep = eventproxy.create('city', function(result){
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
  });
  ep.fail(next);
  
  fileRead('../data_proxy/static/city.json', function (jsonData) {
    if (Object.keys(jsonData).length > 0 && Object.keys(jsonData).includes(params.id)) {
      ep.emit('city', jsonData[params.id]);
    } else {
      ep.throw('No City');
    }
  });

}

const router = express.Router();
router.get('/province', getProvince);
router.get('/city/:id', getCity);
module.exports = router;