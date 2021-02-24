/**Core module */
const express = require('express');
const eventproxy = require('eventproxy');
const PlatformProxy = require('../../../data_proxy').Platform;
const getServiceByName = PlatformProxy.getServiceByName;

/**Custome module */
const fileRead = require('../../../utils/file').fileRead;

/**function controller */
function getAutomation(req, res, next) {
	var ep = new eventproxy();
	ep.all('automation', function(data) {
		res.status(200).json(data);
	});
	ep.fail(next);

	getServiceByName('Automation', function(err, automation){
    if(err) {
      ep.throw(new Error(err));
    }
    ep.emit('automation', generateList(automation._doc));
  });
}
function getRegistration(req, res, next) {
	const ep = eventproxy.create('registration', function(data) {
		res.status(200).json(data);
	});

	ep.fail(next);

	getServiceByName('Registration', function(err, registration){
    if(err) {
      ep.throw(new Error(err));
    }
    ep.emit('registration', generateList(registration._doc));
  });
}
function getRepository(req, res, next) {
	const ep = eventproxy.create('repository', function(data) {
		res.status(200).json(data);
	});

	ep.fail(next);

	getServiceByName('Repository', function(err, repository){
    if(err) {
      ep.throw(new Error(err));
    }
    ep.emit('repository', generateList(repository._doc));
  });
}
function getInstallation(req, res, next) {
	const ep = eventproxy.create('installation', function(data) {
		res.status(200).json(data);
	});

	ep.fail(next);

	getServiceByName('Installation', function(err, installation){
    if(err) {
      ep.throw(new Error(err));
    }
    ep.emit('installation', generateList(installation._doc));
  });
}
function getInventory(req, res, next) {
	const ep = eventproxy.create('inventory', function(data) {
		res.status(200).json(data);
	});

	ep.fail(next);

  getServiceByName('Inventory', function(err, inventory){
    if(err) {
      ep.throw(new Error(err));
    }
    ep.emit('inventory', generateList(inventory._doc));
  });

	// fileRead(pathJoin(DBPath, '/inventory.json'), function(result) {
	// 	if (result) {
	// 		ep.emit('inventory', result);
	// 	} else {
	// 		ep.throw(new Error('No json data'));
	// 	}
	// });
}

function generateList(service) {
	const list = [];
  const filterKey = ['_id', '__v', 'service_value_data', 'service_id', 'name'];
  
  Object.keys(service)
  .filter(function(key){
    return filterKey.indexOf(key) === -1;
  })
  .forEach(function(key) {
		if (key === 'url') {
			list.push({
				title: 'url',
				value: service.url,
				link: service.url
			});
    } else if(key === 'credential') {
      list.push({
        title: 'credential',
				value: service.credential,
				hide: true
      });
    } else if (key === 'service_link_data'){
      Object.keys(service[key]).forEach(function(k){
        list.push({
          title: k,
          value: service.service_value_data[k],
          link: service.service_link_data[k]
        });
      });
		} else {
      list.push({
        title: key,
				value: service[key]
      });
    }
  });
  return list;
}

const router = express.Router();
router.get('/automation', getAutomation);
router.get('/registration', getRegistration);
router.get('/repository', getRepository);
router.get('/installation', getInstallation);
router.get('/inventory', getInventory);

module.exports = router;
