const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/repository.json');

updateRepository = function(){
  const Repository = [
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
      "title": "",
      "value": "/"
    },
    {
      "title": "  ",
      "value": "",
      "link": ""
    },
    {
      "title": "  ",
      "value": "",
      "link": ""
    },
    {
      "title": "",
      "value": "",
      "link": ""
    }
  ];

  fileSave(filePath, Repository);
};
module.exports = updateRepository;