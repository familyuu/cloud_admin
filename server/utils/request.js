const got = require('got');

const request = async function(url, options, callback) {
  const defaultOptions = {
    ...options,
    json: true,
    stream: false,
    // responseType: json,
    // resolveBodyOnly: false,
    // form: true,
    // encoding: 'utf-8',
    // throwHttpErrors: true,

    rejectUnauthorized: false,
    requestCert: true,
  };

  try {
    const response = await got(url, defaultOptions);
    if (callback) {
      callback(response.body);
    }
    return response;
  } catch (error) {
    // throw new Error(error);
    return null;
  }
};
module.exports = request;
