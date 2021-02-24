const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/inventory.json');

updateInventory = function(){
  const Inventory = [
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
      "title": "Racks",
      "value": "8",
      "link": ""
    },
    {
      "title": "Devices",
      "value": "26",
      "link": ""
    },
    {
      "title": "Roles",
      "value": "17",
      "link": ""
    }
  ];
  fileSave(filePath, Inventory);
};
module.exports = updateInventory;