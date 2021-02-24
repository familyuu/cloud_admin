const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Define Schema
 */
const NetworkSchema = new Schema({
	name: String,
	type: String,
	mode: String,
	vlanid: String,
	subnet: String
});
const InfrastructureSchema = new Schema({
	name: String,
	type: String,
	bmcip: String,
	status: String,
	memory_total: Number,
	memory_usage: Number,
	cpu: Number
});
const ConfigurationSchema = new Schema({
	key: Number,
	title: String,
	children: Array
});
const UsageSchema = new Schema({
  total: Number,
  used: Number
});
const CloudSchema = new Schema({
	cloud_id: Number,
  name: String,
  deployment: String,
  horizon: String,
	credential: String,
  description: String,
  director_ip: String,
  ssh_credential: String,
  network: [ NetworkSchema ],
  configuration: [ ConfigurationSchema ],
	health: {
    type: String,
    default: 'Warning'
  },
  infrastructure: [ InfrastructureSchema ],
  storage: UsageSchema,
  memory: UsageSchema,
  vcpu: UsageSchema
});
CloudSchema.index({ cloud_id: 1 }, { unique: true });
CloudSchema.index({ name: 1 }, { unique: true });

/**
 * Define model
 */
module.exports = mongoose.model('Clouds', CloudSchema);