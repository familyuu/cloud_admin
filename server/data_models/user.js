const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  province: {},
  city: {},
});
const UserSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  group: String,
  identity: String,
  password: String,
  // address: String,
  // country: String,
  // geographic: GeoSchema

});
UserSchema.index({name: 1}, {unique: true});
/**
 * Define model
 */
module.exports = mongoose.model('User', UserSchema);
