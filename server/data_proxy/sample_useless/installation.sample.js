const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/installation.json');

updateInstallation = function(){
  const Installation = [
    {
      "title": "Description",
      "value": ""
    },
    {
      "title": "URL",
      "value": "",
      "link": ""
    },
    {
      "title": "Crendential",
      "value": ""
    },
    {
      "title": "Servers",
      "value": "10",
      "link": ""
    }
  ];

  fileSave(filePath, Installation);
};
module.exports = updateInstallation;