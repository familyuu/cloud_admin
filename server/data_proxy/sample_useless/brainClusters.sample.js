const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/brainClusters.json');

updateBrainClusters = function() {
	let Clusters = [];
	Clusters = Clusters.concat([
    {
      "name": "sss",
      "hostip": "",
      "status": "up",
      "vm": 5,
      "memory": 19,
      "cpu": 10
    },
    {
      "name": "bbb",
      "hostip": "",
      "status": "up",
      "vm": 5,
      "memory": 19,
      "cpu": 10
    },
    {
      "name": "nnn",
      "hostip": "",
      "status": "up",
      "vm": 5,
      "memory": 22,
      "cpu": 26
    }
  ]);
	fileSave(filePath, Clusters);
};
module.exports = updateBrainClusters;
