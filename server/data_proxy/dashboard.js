const DashboardModel = require('../data_models').Dashboard;

exports.getDashboard = function(callback) {
	DashboardModel.findOne({}).exec(callback);
};

const updateDashboard = function(docs, callback){
  DashboardModel.updateMany({}, docs, {upsert: true}, callback)
};
exports.updateDashboardBySec = function() {
	const cpu_usage = Math.round(Math.random()*100);;
  const memory_usage = {
		total: 1536,
		used: 302,
		remain: 1234
  };
  const storage_usage = {
		total: 17695,
		used: 819.5,
		remain: 16875.5
  };
  const clusters = [
    {
      name: "sss",
      hostip: "",
      status: "up",
      vm: 5,
      memory: 19,
      cpu: 10
    },
    {
      name: "bbb",
      hostip: "",
      status: "up",
      vm: 5,
      memory: 19,
      cpu: 10
    },
    {
      name: "nnn",
      hostip: "",
      status: "up",
      vm: 5,
      memory: 22,
      cpu: 26
    }
  ];

  const docs = { cpu_usage, memory_usage, storage_usage, clusters };
  updateDashboard(docs, function(err){
    if (err) throw new Error(err);
  });
};

exports.updateDashboard = updateDashboard;
