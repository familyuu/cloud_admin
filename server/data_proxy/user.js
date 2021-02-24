const UserModel = require('../data_models').User;

const updateUserByName = function(userName, doc, options, callback){
  UserModel.updateOne({name: userName}, doc, options, callback)
};
exports.updateUserByName = updateUserByName;

exports.initUsers = function() {
  const options = {
    upsert: true
  };
  UserModel.find({}, function(err, result) {
    if (err) {
      throw new Error(err);
    }
    if(result.length === 0) {
      const user = {
        user_id: 1,
        name: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        email: 'Example@familyuu.com',
        group: 'Open Cloud',
        identity: 'Administrator',
        password: 'admin',
        active: false,
        // address: '',
        // country: '',
        // geographic: { province: { label: 'Shang Hai', key: '310000' }, city: { label: '', key: '' } },
      };
      updateUserByName(user.name, user,  options, function(err, result){
        if (err) throw new Error(err);
        // console.log(result);
      });
    }
    
  });
};

exports.getUserByName = function(userName, callback) {
  UserModel.findOne({name: userName}, callback);
};
