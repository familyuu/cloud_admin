const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  service_id: Number,
  name: String,
  description: String,
  url: String,
  credential: String,
  service_link_data: {},
  service_value_data: {}
});
ServiceSchema.index({ service_id: 1 }, { unique: true });

/**
 * Define model
 */
module.exports = mongoose.model('Platform', ServiceSchema);
