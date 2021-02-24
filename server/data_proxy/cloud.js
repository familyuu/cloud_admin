const _ = require('lodash');
const models = require('../data_models');
const CloudModel = models.Cloud;
const updateDashboard = require('./dashboard').updateDashboard;

const updateCloudById = function(cloud_id, docs, options, callback) {
	let query = { cloud_id: cloud_id };
	CloudModel.updateOne(query, docs, options, callback);
};

/**
   * 
   * @param {cloud_id, name, credential, description, ssh_credential} cloud 
   * @param {Function} callback 
   */
exports.newAndSave = function(cloud, callback) {
	const cloud = new CloudModel(cloud);
	// cloud.cloud_id = cloud_id;
	// cloud.name = name;
	// cloud.credential = credential;
	// cloud.description = description;
	// cloud.ssh_credential = ssh_credential;
	cloud.save(callback);
};

exports.getClouds = function(callback) {
	CloudModel.find({}, 'cloud_id name horizon health deployment', callback);
};

exports.getCloudById = function(cloudId, callback) {
	CloudModel.findOne({ cloud_id: cloudId }, null, callback);
};

/**
 * Use model
 */
exports.initClouds = function() {
  CloudModel.deleteMany({}, function(err){
    if (err) {
      throw new Error(err);
    }
    updateCloudsByHour();
  });
};

const updateCloudsByHour = function(){
  let cloudsId = [0, 1];
  for (let id in cloudsId) {
    let cloud = {
      name: `cloud_${id}`,
      deployment: 'deployed',
      horizon: '',
			credential: '',
			description: 'Red Hat Openstack Platform',
			director_ip: '',
			ssh_credential: '',
			network: [
				{
					name: 'ETSI-tunnel-VPN',
					type: '1Gb',
					mode: 'Access',
					vlanid: '1002',
					subnet: '172.22.25.128/25'
        },
        {
					name: 'Storage',
					type: '10Gb',
					mode: 'Trunk',
					vlanid: '305',
					subnet: '192.168.80.0/24'
				}
      ],
      configuration: [
        {
					key: '0',
					title: 'cloud-config.yml'
				},
				{
					key: '1',
					title: 'inventory-request.yml'
				},
				{
					key: '2',
					title: 'heat-templates',
					children: [
						{
							key: '2-0',
							title: 'some.yml'
						},
						{
							key: '2-1',
							title: 'some-others.yml'
						}
					]
				},
				{
					key: '0',
					title: 'vm-request.yml'
				}
      ]
    };

    const options = {
      upsert: true,
    };
    updateCloudById(id, cloud, options, function(err){
      if(err) throw new Error(err);
    });
  }

  updateDashboard({cloud_number: cloudsId.length}, function(err){
    if(err) throw new Error(err);
  });
};

exports.updateCloudsBySec = function() {
	CloudModel.find({}).select('cloud_id').exec(function(err, result) {
		if (err) {
      throw new Error(err);
    }
		for (let id of result) {
      let health = "healthy";
      let infrastructure = [
        {
          name: 'ECC-Controller-1',
          type: 'VM',
          bmcip: 'None',
          status: 'up',
          'memory_total': 16,
          'memory_usage': 10,
          cpu: 8
        },
        {
          name: 'ECC-Controller-2',
          type: 'VM',
          bmcip: 'None',
          status: 'up',
          'memory_total': 16,
          'memory_usage': 10,
          cpu: 8
        },
        {
          name: 'ECC-Controller-3',
          type: 'VM',
          bmcip: 'None',
          status: 'up',
          'memory_total': 16,
          'memory_usage': 10,
          cpu: 8
        },
        {
          name: 'dpdk-Compute-1',
          type: 'SR650',
          bmcip: '10.240.43.40',
          status: 'up',
          'memory_total': 328,
          'memory_usage': 10,
          cpu: 112
        },
        {
          name: 'sriov-Compute-1',
          type: 'SR650',
          bmcip: '10.240.43.39s',
          status: 'up',
          'memory_total': 328,
          'memory_usage': 10,
          cpu: 112
        }
      ];
      let storage = { total: 5820, used: 2943 };
      let memory = { total: 768, used: 0 };
      let vcpu = { total: 128, used: 0 };
			updateCloudById(
				id.cloud_id,
        { health, infrastructure, storage, memory, vcpu },
        null,
				function(err) {
					if (err) {
						throw new Error(err);
					}
				}
			);
		}
	});
};

exports.updateCloudById = updateCloudById;
exports.updateCloudsByHour = updateCloudsByHour;
