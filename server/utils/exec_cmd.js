const { exec, execFile } = require('child_process');
const util = require('util');
const execFileUtil = util.promisify(execFile);

exports.local_exec = function(cmd, options, callback){
  const defaultOptions = {
    ...options,
    shell: true,
  };
  exec(cmd, defaultOptions, callback);
};

/**
 * 
 * return Promise{stdout, stderr}
 */
exports.remote_exec = function(file, args, options){
  const defaultOptions = {
    ...options,
    shell: true,
  };
  return execFileUtil(file, args, defaultOptions);
};
;