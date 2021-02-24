const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/brainUtil.json');

updateBrianUtil = function(){
  const Utilization = {
    "cpu": {
      "total": 100,
      "percent": 13
    },
    "memory": {
      "total": 1536,
      "partation": [
        {
          "x": "Used",
          "y": 302
        },
        {
          "x": "Remain",
          "y": 1234
        }
      ]
    },
    "storage": {
      "total": 17695,
      "partation": [
        {
          "x": "Used",
          "y": 819.5
        },
        {
          "x": "Remain",
          "y": 16875.5
        }
      ]
    }
  };

  fileSave(filePath, Utilization);
};
module.exports = updateBrianUtil;