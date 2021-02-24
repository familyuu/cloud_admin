// var fileReader = require('./file').fileRead;
// var fileWriter = require('./file').fileSave;

// function disposeFileData(data) {
//   fileWriter('./dist.json', data, function(){
//     console.log('Saved.');
//    });
// }
// fileReader('./src.json', disposeFileData);

const { local_exec, remote_exec } = require('./exec_cmd');
remote_exec('../data_proxy/shell/getCephStorageOAuthInfo.sh', ['root', '10.240.40.219'], null, function(err, stdout, stderr) {
  if (err) {
    throw err;
  } else {
    let auth = {}, key, value;
    stdout = stdout.trim();
    stdout = stdout.replace(/export\s|'/g, '');
    const lines = stdout.split('\n');
    for(let line of lines) {
      if(!!line) {
        const keyValue = line.split('=');
        key = keyValue[0];
        value = keyValue[1];
        auth[key] = value;
      } 
    }
  }
});