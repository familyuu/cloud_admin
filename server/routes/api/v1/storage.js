const express = require('express');
const eventproxy = require('eventproxy');
const CephProxy = require('../../../data_proxy').Ceph;
const getClustersProxy = CephProxy.getClusters;
const getClusterByIdProxy = CephProxy.getClusterById;

function getClusters(req, res, next) {
	const ep = eventproxy.create('clusters', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
	ep.fail(next);

	getClustersProxy(ep.done('clusters'));
}

function getCluster(req, res, next) {
	const clusterId = req.params.id;
	const ep = eventproxy.create('cluster', function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	});
	ep.fail(next);
	getClusterByIdProxy(clusterId, function(err, cluster) {
		if (err) {
			ep.emit('ceph', {});
			throw new Error(err);
		} else {
			ep.emit('cluster', abstractCluster(cluster._doc));
		}
	});
}

function abstractCluster(cluster) {
  const capacity = [
    {
      "x": "Used",
      "y": cluster.capacity_used
    },
    {
      "x": "Remain",
      "y": cluster.capacity_remain
    }
  ];

  return { ...cluster, capacity };
}

const router = express.Router();
router.get('/cephs', getClusters);
router.get('/cephs/:id', getCluster);
module.exports = router;