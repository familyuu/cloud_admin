const express = require('express');
const eventproxy = require('eventproxy');
const UserProxy = require('../../../data_proxy').User;
const updateUserByNameProxy = UserProxy.updateUserByName;
const getUserByNameProxy = UserProxy.getUserByName;

function userLogin(req, res, next) {
  const {userName, password} = req.body;
  let status;

  const ep = eventproxy.create('userLogin', function(status){
    res.status(200).json({
      "status": status,
      "type": "account",
      "loggedAuthority": "user",
    });
  });

  getUserByNameProxy(userName, function(err, result){
    if(!err && result && (result.password === password)) {
      status = 'ok';
      ep.emit('userLogin', status);
    } else {
      status = 'error';
      ep.emit('userLogin', status);
    }
  })

}

function userList(req, res, next){

}
function userCurrent(req, res, next) {
  const currentUser = req.params.name;
  const ep = eventproxy.create('userCurrent', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
	ep.fail(next);
	getUserByNameProxy(currentUser, ep.done('userCurrent'));
}

function userSetting(req, res, next){
  const params = req.body;

  const ep = eventproxy.create('userSetting', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
  ep.fail(next);
	updateUserByNameProxy(params.oldname, params, {}, function(err, result){
    if (err) {
      return ep.emit('error', err);
    } else {
      ep.emit('userSetting', result);
    }
  });

}

const router = express.Router();
router.post('/login', userLogin);
router.post('/setting', userSetting)
router.get('/:name', userCurrent);
router.get('/', userList)
module.exports = router;