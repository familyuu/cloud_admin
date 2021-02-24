import { getAuthority } from './authority';

import updateLoggedInAuth from '@/components/Authorized/updateLoggedAuth';
import AuthComponent from '@/components/Authorized';
import AuthorizedRoute from '@/components/Authorized/AuthorizedRoute';
import Secured from '@/components/Authorized/Secured';
import checkPermissions from '@/components/Authorized/checkPermissions';

AuthComponent.Secured = Secured;
AuthComponent.AuthorizedRoute = AuthorizedRoute;
AuthComponent.check = checkPermissions;

const renderAuthorized = (authority) => {
  updateLoggedInAuth(authority);
  return AuthComponent;
};

let Authorized = renderAuthorized(JSON.parse(sessionStorage.getItem('loc-authority')));
// Reload the rights component
const reloadAuthorized = (authority) => {
  Authorized = renderAuthorized(authority);
};

export { reloadAuthorized };
export default Authorized;
