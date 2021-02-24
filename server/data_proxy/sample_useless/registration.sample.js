const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/registration.json');

updateRegistration = function(){
  const Registration = [
    {
      "title": "Description",
      "value": "",
    },
    {
      "title": "",
      "value": "",
      "link": ""
    },
    {
      "title": "",
      "value": ""
    },
    {
      "title": "",
      "value": "",
      "link": ""
    },
    {
      "title": "",
      "value": "",
      "link": ""
    }
  ];

  fileSave(filePath, Registration);
};
module.exports = updateRegistration;