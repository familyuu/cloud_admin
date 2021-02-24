const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
	name: String,
	monitor: String,
	osd: Number,
	public_ip: String,
	manage_ip: String
});
const ClusterSchema = new Schema({
	cluster_id: Number,
	name: String,
	url: String,
  credential: String,
  capacity_used: Number,
  capacity_remain: Number,
  nodes: [ServerSchema]
});
ClusterSchema.index({ cluster_id: 1 }, { unique: true });
ClusterSchema.index({ name: 1 }, { unique: true });

/**
 * Define model
 */
module.exports = mongoose.model('Clusters', ClusterSchema);
