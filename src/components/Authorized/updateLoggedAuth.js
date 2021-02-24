let LOGGEDINAUTHORITY = 'NULL';

const updateLoggedInAuth = (authority) => {
  if (authority) {
    if (typeof authority === 'function') {
      LOGGEDINAUTHORITY = authority();
    }
    if (
      Object.prototype.toString.call(authority) === '[object String]' ||
      Array.isArray(authority)
    ) {
      LOGGEDINAUTHORITY = authority;
    }
    LOGGEDINAUTHORITY = authority;
  } else {
    LOGGEDINAUTHORITY = 'NULL';
  }
};

export { LOGGEDINAUTHORITY };

export default updateLoggedInAuth;
