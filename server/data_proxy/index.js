const mongoose = require('mongoose');
const schedule = require('node-schedule');

const io = require('../app').io;
const notification = require('../routes/api/v1/notification').notification;

const Cloud = require('./cloud');
const Ceph = require('./ceph');
const Platform = require('./platform');
const Dashboard = require('./dashboard');
const User = require('./user');

const rule = new schedule.RecurrenceRule();
rule.second = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];

function initDB() {
  Cloud.initClouds();
  Ceph.initCephs();
  Platform.initServices();
  User.initUsers();
};

function updateCronJob() {
  Cloud.updateCloudsBySec();
  Ceph.updateClusterBySec();
  Platform.updateServiceBySec();
  Dashboard.updateDashboardBySec();
};
mongoose
	.connect('mongodb://10.240.217.157:27017/local', {
		useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
	})
	.then(function() {
    console.log('connect to mongoDB');
    initDB();

    schedule.scheduleJob('*/4 * * *', function(){
      console.log('Hour job');
      Cloud.updateCloudsByHour();
      Ceph.updateClusterByHour();
      Platform.updateServiceByHour();
    });

    schedule.scheduleJob(rule, function(){
      console.log('Second job');
      updateCronJob();
      // notification(io);
    });
	})
	.catch(function(err) {
		if (err) {
			console.error('connect error: ', err);
			process.exit(1);
		}
	});


exports.Cloud = Cloud;
exports.Ceph = Ceph;
exports.Platform = Platform;
exports.Dashboard = Dashboard;
exports.User = User;