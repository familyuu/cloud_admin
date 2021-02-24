import pathToRegexp from 'path-to-regexp';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {

  const authorityString = typeof str === 'undefined' ? sessionStorage.getItem('loc-authority') : str;
  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function getRouteAuthority(path, routes) {
  let routeAuthorities;
  routes.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      routeAuthorities = route.authority || routeAuthorities;

      // get children authority recursively
      if (route.routes) {
        routeAuthorities = getRouteAuthority(path, route.routes) || routeAuthorities;
      }
    }
  });
  return routeAuthorities;
};