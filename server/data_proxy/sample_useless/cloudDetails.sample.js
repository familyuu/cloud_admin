const path = require('path');
const config = require('../../config.default');
const fileSave = require('../../utils/file').fileSave;

const filePath = path.join(config.DBPath, '/cloudDetails.json');

updateCloudDetails = function() {
	let CloudDetails = [];
	CloudDetails = CloudDetails.concat([
		{
			summary: {
				list: [
					{
						title: 'Description',
						value: 'Red Hat Openstack Platform'
					},
					{
						title: 'Deployment status',
						value: 'Deployed'
					},
					{
						title: 'Director IP',
						value: ''
					},
					{
						title: 'SSHCredential',
						value: '',
						hide: true
					},
					{
						title: 'Horizon URL',
						value: '',
						link: ''
					},
					{
						title: 'Credential',
						value: '',
						hide: true
					},
					{
						title: 'Cloud status',
						value: 'healthy'
					}
				],
				utilization: {
					storage: {
						total: 5820,
						used: 2943
					},
					memory: {
						total: 768,
						used: 0
					},
					vcpu: {
						total: 128,
						used: 0
					}
				}
			},
			network: [
				{
					name: 'ETSI-tunnel-VPN',
					type: '1Gb',
					mode: 'Access',
					vlanid: '1002',
					subnet: ''
				},
				{
					name: 'InternalApi',
					type: '10G',
					mode: 'Trunk',
					vlanid: '202',
					subnet: ''
				},
				{
					name: 'Storage',
					type: '10Gb',
					mode: 'Trunk',
					vlanid: '305',
					subnet: ''
				},
				{
					name: 'Tenant',
					type: '10GB',
					mode: 'Trunk',
					vlanid: '505',
					subnet: ''
				},
				{
					name: 'Provisioning',
					type: '1GB',
					mode: 'Access',
					vlanid: '11',
					subnet: ''
				},
				{
					name: 'DPDK0',
					type: '25GB',
					mode: 'Trunk',
					vlanid: '701-709',
					subnet: ''
				},
				{
					name: 'DPDK1',
					type: '25GB',
					mode: 'Trunk',
					vlanid: '701-709',
					subnet: ''
				}
			],
			infrastructure: [
				{
					name: 'ECC-Controller-1',
					type: 'VM',
					bmcip: 'None',
					status: 'up',
					'memory-total': 16,
					'memory-usage': 10,
					cpu: 8
				},
				{
					name: 'ECC-Controller-2',
					type: 'VM',
					bmcip: 'None',
					status: 'up',
					'memory-total': 16,
					'memory-usage': 10,
					cpu: 8
				},
				{
					name: 'ECC-Controller-3',
					type: 'VM',
					bmcip: 'None',
					status: 'up',
					'memory-total': 16,
					'memory-usage': 10,
					cpu: 8
				},
				{
					name: 'dpdk-Compute-1',
					type: 'SR650',
					bmcip: '',
					status: 'up',
					'memory-total': 328,
					'memory-usage': 10,
					cpu: 112
				},
				{
					name: 'sriov-Compute-1',
					type: 'SR650',
					bmcip: '',
					status: 'up',
					'memory-total': 328,
					'memory-usage': 10,
					cpu: 112
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
							title: 'XXX-XXX-XXX.yml'
						},
						{
							key: '2-1',
							title: 'YYY-YYY-YYY.yml'
						}
					]
				},
				{
					key: '0',
					title: 'vm-request.yml'
				}
			]
		}
	]);
	fileSave(filePath, CloudDetails);
};
module.exports = updateCloudDetails;
