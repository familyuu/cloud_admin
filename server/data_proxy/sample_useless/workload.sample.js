const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/workload.json');

updateWorkload = function(){
  const Workload = [
    {
      "id": 1,
      "title": "Cloud",
      "avatar": "cloud",
      "redirect": "/cloud/basic",
      "clouds": 1
    },
    {
      "id": 2,
      "title": "Container",
      "avatar": "deployment-unit",
      "redirect": "/dashboard"
    },
    {
      "id": 3,
      "title": "Storage",
      "avatar": "hdd",
      "redirect": "/storage/ceph",
      "ceph": 1
    }
  ];

  fileSave(filePath, Workload);
};
module.exports = updateWorkload;