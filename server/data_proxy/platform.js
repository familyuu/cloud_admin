const PlatformModel = require('../data_models').Platform;
const request = require('../utils/request');
const serviceArray = [
  {
    id: 0,
    name: 'Automation',
    description: '',
    url: '',
    credential: '', 
    link: {
      workflow: '',
      templates: '',
      projects: '',
    },
    value: {
      workflow: 0,
      templates: 0,
      projects: 0,
    }
  },
  {
    id: 1,
    name: 'Registration',
    description: '',
    url: '',
    credential: '',
    link: {
      subscriptions: '',
      hosts: '',
    },
    value: {
      subscriptions: 0,
      hosts: 0,
    }
  },
  {
    id: 2,
    name: 'Repository',
    description: 'Repository service provides code repositories for automated deployment. It is based on GitLab.',
    url: '',
    credential: '',
    link: {
      cloud_repo: '',
      storage_repo: '',
      configuration_repo: '',
    },
    value: {
      cloud_repo: '',
      storage_repo: '',
      configuration_repo: '',
    },
  },
  {
    id: 3,
    name: 'Installation',
    description: '',
    url: '',
    credential: '',
    link: {
      servers: '',
    },
    value: {
      servers: 0,
    }
  },
  {
    id: 4,
    name: 'Inventory',
    description: '',
    url: '',
    credential: '',
    link: {
      racks: '',
      devices: '',
      roles: '',
    },
    value: {
      racks: 0,
      devices: 0,
      roles: 0,
    }
  },
];
let AnsibleToken = '';
//const parseFile = function(yamlFile){};


const getAnsibleToken = function(){
  const url = serviceArray[0].url + '/api/v2/authtoken/';  //All URIs not ending with "/" receive a 301 redirect.
  request(
    url,
    {
      method: 'POST',
      body: {
        username: '',
        password: '',
      },
      responseType: 'json',
    },
    (result) => {
      AnsibleToken = result.token;
    }
  );
};
const fetchAutomationValue = function(){
  const options = {
    hooks: {
      afterResponse: [
        (response) => {
          // console.log(response.statusCode);
          if (response.statusCode === 401) { // Unauthorized
            getAnsibleToken();
            return response;
          } else {
            return response;
          }
        },
      ],
    },
    headers: {
      'X-Auth-Token': `Token ${AnsibleToken}`,
      'Authorization': `Token ${AnsibleToken}`,
    },
    host: '',
    port: '443'
  };

  const baseUrl = serviceArray[0].url + '/api/v2/';
  request(
     baseUrl + 'projects/',
     options,
     (result) => {
       serviceArray[0].value.projects = result.count;
     }
  );
  request(
    baseUrl + 'unified_job_templates/',
    options,
    (result) => {
      serviceArray[0].value.templates = result.count;
    }
  );
  request(
    baseUrl + 'unified_jobs/',
    options,
    (result) => {
      serviceArray[0].value.workflow = result.count;
    }
  );
};

const fetchRegistration = function(){
  const baseUrl = serviceArray[1].url + '/api/';
  const auth = Buffer.from('').toString('base64');
  const options = {
    hooks: {
      afterResponse: [
        (response) => {
          return response;
        },
      ],
    },
    headers: {
      'Authorization': `Basic ${auth}`
    },
    host: '',
  };
  request(
    `${baseUrl}hosts`,
     options,
     (result) => {
       serviceArray[1].value.hosts = result.total;
     }
  );
  request(
    `https://XXXXXX`,
    options,
    (result) => {
      serviceArray[1].value.subscriptions = result.total;
    }
  );
};

const fetchInventory = function(){
  const baseUrl = serviceArray[4].url + '/api/dcim/';
  const options = {
    hooks: {
      afterResponse: [
        (response) => {
          return response;
        },
      ],
    },
  };
 
  request(
    `${baseUrl}racks/`,
     options,
     (result) => {
       serviceArray[4].value.racks = result.count;
     }
  );
  request(
    `${baseUrl}devices/`,
    options,
    (result) => {
      serviceArray[4].value.devices = result.count;
    }
  );
  request(
    `${baseUrl}device-roles/`,
    options,
    (result) => {
      serviceArray[4].value.roles = result.count;
    }
  );
};

const updateServiceById = function(serviceId, doc, options, callback) {
  PlatformModel.updateOne({ service_id: serviceId }, doc, options, callback);
};

const updateServiceByHour = function() {
  //parseFile(XXXX.yaml.json);

  for (let service of serviceArray) {
    const doc = {
      name: service.name,
      description: service.description,
      url: service.url, 
      credential: service.credential,
      service_link_data: service.link,
    };
    updateServiceById(service.id, doc, { upsert: true }, function(err) {
      if (err) throw new Error(err);
    });
  }
};

exports.initServices = function() {
  PlatformModel.deleteMany({}, function(err) {
    if (err) {
      throw new Error(err);
    }
    updateServiceByHour();
  });
};

exports.updateServiceBySec = function() {
  fetchAutomationValue();
  fetchRegistration();
  fetchInventory();

  for (let service of serviceArray) {
    const service_value_data = service.value;
    updateServiceById(service.id, { service_value_data }, null, function(err) {
      if (err) {
        throw new Error(err);
      }
    });
  }
};
exports.getServiceByName = function(name, callback) {
  PlatformModel.findOne({ name: name }, callback);
};
exports.updateServiceByHour = updateServiceByHour;
exports.updateServiceById = updateServiceById;
