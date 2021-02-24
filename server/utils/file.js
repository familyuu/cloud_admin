var fs = require('fs');
var path = require('path');

function makePath(file) {
  return path.resolve(__dirname, file);
}
function readFile(file, callback) {

  const fileAbsPath = makePath(file);
  let fileData = '';

  fs.stat(fileAbsPath, function (err, stats) {
    if (err) {
      if ('ENOENT' == err.code) {
        throw new Error('file not found with: ' + fileAbsPath);
      } else {
        throw new Error('Internal server error');
      }
    } else {
      const stream = fs.createReadStream(fileAbsPath);
      stream
        .on('data', function (chunk) {
          fileData += chunk;
        })
        .on('end', function () {
          if (typeof callback === 'function') {
            const jsonData = JSON.parse(fileData);
            callback(jsonData);
          }
        })
        .on('error', function (err) {
          throw new Error(err.toString());
        });
    }
  });
}

function saveFile(file, data, callback) {
  const fileAbsPath = makePath(file);
  fs.writeFile(fileAbsPath, JSON.stringify(data), 'utf8', function (err) {
    if (err) throw err;
    if (typeof (callback) === 'function') {
      callback();
    }
  });
}

exports.fileRead = readFile;
exports.fileSave = saveFile;