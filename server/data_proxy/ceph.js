const path = require('path');
const ClusterModel = require('../data_models').Cluster;
const updateDashboard = require('./dashboard').updateDashboard;
const request = require('../utils/request');
const { remote_exec } = require('../utils/exec_cmd');

const ceph = {
  dashboard_url: '',
  credential: '',
  _baseUri: '',
  host: '',
  token: '',
};
const clusters = [];

const parseYamlFile = function() {
  // ######A real ceph need here#######################################
  ceph.dashboard_url = '';
  ceph.credential = '';
  ceph._baseUri = '';
  ceph.host = '';
};

const fetchCephToken = async function() {
  let auth = {
      OS_USERNAME: '',
      OS_PASSWORD: '',
      OS_TENANT_NAME: '',
      OS_AUTH_URL: '',
      OS_REGION_NAME: '',
    },
    key,
    value;
  let { stdout, stderr } = await remote_exec(
    path.resolve(__dirname, 'shell/getCephStorageOAuthInfo.sh'),
    ['root', ceph.host]
  );
  if (!!stdout) {
    stdout = stdout.trim();
    stdout = stdout.replace(/export\s|'/g, '');
    const lines = stdout.split('\n');
    for (let line of lines) {
      if (!!line) {
        const keyValue = line.split('=');
        key = keyValue[0];
        value = keyValue[1];
        auth[key] = value;
      }
    }
  } else {
    console.log(stderr);
    return;
  }

  const response = await request(
    // `${auth.OS_AUTH_URL}tokens`,
    'http://localhost:5000/v2.0/tokens',
    {
      method: 'POST',
      body: {
        auth: {
          tenantName: auth.OS_TENANT_NAME,
          passwordCredentials: {
            username: auth.OS_USERNAME,
            password: auth.OS_PASSWORD,
          },
        },
      },
      responseType: 'json',
    },
    (result) => {
      ceph.token = result['access']['token']['id'];
    }
  );
  return response;
};

const fetchClusterList = async function() {
  clusters.splice(0, clusters.length);
  const options = {
    hooks: {
      afterResponse: [
        (response) => {
          if (response.statusCode === 401) {
            // Unauthorized
            fetchCephToken();
            return response;
          } else {
            return response;
          }
        },
      ],
    },
    headers: {
      'X-Auth-Token': `${ceph.token}`,
    },
    host: '10.240.40.219',
  };
  return request(`${ceph._baseUri}clusters`, options, (result) => {
    for (let item of result) {
      clusters.push(item);
    }
  });
};

const fetchClusterDetail = async function(options) {
  const newClusters = await Promise.all(
    clusters.map(async (cluster) => {
      const nodes = await request(`${ceph._baseUri}clusters/${cluster.id}/servers`, options);
      const summary = await request(`${ceph._baseUri}clusters/${cluster.id}/summary`, options);
      return {
        nodes: nodes.body.items,
        capacity_used: summary.body.rawUsed,
        capacity_remain: summary.body.rawTotal - summary.body.rawUsed,
        id: cluster.id,
      };
    })
  );
  return newClusters;
};

const fetchServerDetail = async function(cluster, requestOptions) {
  const newNodes = await Promise.all(
    cluster.nodes.map(async (node) => {
      const osds = await request(
        `${ceph._baseUri}clusters/${cluster.id}/servers/${node.id}/osds_capacity`,
        requestOptions
      );
      const mons = await request(
        `${ceph._baseUri}clusters/${cluster.id}/servers/${node.id}/mons`,
        requestOptions
      );
      return {
        public_ip: node.publicip,
        manage_ip: node.mgmtip,
        name: node.servername,
        osd: osds.body.osds.length,
        monitor: mons.body[0].role,
      };
    })
  );

  return {
    ...cluster,
    nodes: newNodes
  };
};

const updateClusterById = function(clusterId, docs, options, callback) {
  let query = { cluster_id: clusterId };
  ClusterModel.updateOne(query, docs, options, callback);
};

const updateClusterByHour = async function() {
  await fetchCephToken();
  await fetchClusterList();
  /**
   * cluster: {id, name, created_at, status, state, addr, version, cluster_type}
   */
  for (let cluster of clusters) {
    const doc = {
      name: cluster.name,
      cluster_id: cluster.id,
      url: `${ceph.dashboard_url}/#/sytemReaource/clusters`,
      credential: ceph.credential,
    };
    updateClusterById(cluster['id'], doc, { upsert: true }, function(err) {
      if (err) throw new Error(err);
    });
  }

  updateDashboard({ ceph_number: clusters.length }, function(err) {
    if (err) throw new Error(err);
  });
};

exports.initCephs = function() {
  parseYamlFile();
  ClusterModel.deleteMany({}, function(err) {
    if (err) {
      throw new Error(err);
    }
    updateClusterByHour();
  });
};


exports.updateClusterBySec = function() {
  const requestOptions = {
    hooks: {
      afterResponse: [
        (response) => {
          if (response.statusCode === 401) {
            // Unauthorized
            fetchCephToken();
            return response;
          } else {
            return response;
          }
        },
      ],
    },
    headers: {
      'X-Auth-Token': `${ceph.token}`,
    },
    host: '10.240.40.219',
  };
  fetchClusterDetail(requestOptions).then((newClusters) => {
    for (let cluster of newClusters) {
      fetchServerDetail(cluster, requestOptions).then((newCluster) => {
        /**
         * newCluster.nodes: [{name, public_ip, manage_ip, osd, monitor}]
         */
        updateClusterById(newCluster.id, newCluster, null, function(err) {
          if (err) {
            throw new Error(err);
          }
        });
      });
    }
  });
};

exports.getClusters = function(callback) {
  ClusterModel.find({}, 'cluster_id name url credential', callback);
};

exports.getClusterById = function(clusterId, callback) {
  ClusterModel.findOne({ cluster_id: clusterId }, null, callback);
};

exports.updateClusterById = updateClusterById;
exports.updateClusterByHour = updateClusterByHour;
