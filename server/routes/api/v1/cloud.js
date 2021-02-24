const express = require('express');
const eventproxy = require('eventproxy');

const CloudProxy = require('../../../data_proxy').Cloud;
const getCloudsProxy = CloudProxy.getClouds;
const getCloudByIdProxy = CloudProxy.getCloudById;

function getClouds(req, res, next) {
	const ep = eventproxy.create('clouds', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
	ep.fail(next);
	getCloudsProxy(ep.done('clouds'));
}
function getCloud(req, res, next) {
	const cloudid = req.params.id;
	const ep = eventproxy.create('cloud', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
	ep.fail(next);
	getCloudByIdProxy(cloudid, function(err, cloud) {
		if (err) {
			ep.emit('cloud', {});
		} else {
			ep.emit('cloud', abstractCloud(cloud._doc) );
		}
	});
}
function abstractCloud(cloud) {
	const list = [
		'description',
		'deployment',
		'director_ip',
		'ssh_credential',
		'horizon',
		'credential',
		'health'
	].map(function(key) {
		if (key === 'horizon') {
			return {
				title: key,
				value: cloud[key],
				link: cloud[key]
			};
		} else if (key.indexOf('credential') != -1) {
			return {
				title: key,
				value: cloud[key],
				hide: true
			};
		} else {
			return {
				title: key,
				value: cloud[key]
			};
		}
	});

	const utilization = {
		storage: cloud.storage,
		memory: cloud.memory,
		vcpu: cloud.vcpu
	};

  const summary = { list, utilization};
	return { ...cloud, summary  };
}

const router = express.Router();
router.get('/list', getClouds);
router.get('/detail/:id', getCloud);
module.exports = router;
