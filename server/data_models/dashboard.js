const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Define Schema
 */
const ClusterSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	hostip: String,
	status: String,
	vm: Number,
	memory: Number,
	cpu: Number
});
const UtilizationSchema = new Schema({
	total: Number,
	used: Number,
	remain: Number
});

const DashboardSchema = new Schema({
	cloud_number: Number,
	ceph_number: Number,
	cpu_usage: Number,
	memory_usage: UtilizationSchema,
  storage_usage: UtilizationSchema,
  clusters: [ ClusterSchema ]
});

/**
 * Define model
 */
module.exports = mongoose.model('Dashboard', DashboardSchema);
