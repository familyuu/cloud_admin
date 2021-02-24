const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/automation.json');

updateAutomation = function(){
  const Automation = [
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
      "title": "Workflow",
      "value": "2",
      "link": ""
    },
    {
      "title": "Templates",
      "value": "27",
      "link": ""
    },
    {
      "title": "Projects",
      "value": "10",
      "link": ""
    }
  ];
  
  fileSave(filePath, Automation);
};
module.exports = updateAutomation;