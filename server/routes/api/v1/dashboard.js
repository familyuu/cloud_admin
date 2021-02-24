const express = require('express');
const eventproxy = require('eventproxy');
const DashboardProxy = require('../../../data_proxy').Dashboard;
const getDashboard = DashboardProxy.getDashboard;


function getInfo(req, res, next) {
  const ep = eventproxy.create('dashboard', function(dashboard){
    res.status(200).json(dashboard);
  });

  ep.fail(next);

  getDashboard(function(err, result){
    if(err) {
      throw new Error(err);
    } else {
      ep.emit('dashboard', result._doc)
    }
  });

}

const router = express.Router();
router.get('/', getInfo);

module.exports = router;
